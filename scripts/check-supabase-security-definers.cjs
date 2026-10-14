const fs = require('node:fs');
const path = require('node:path');

const migrationsDir = 'supabase/migrations';
const files = fs.readdirSync(migrationsDir)
  .filter((name) => name.endsWith('.sql'))
  .sort();
const errors = [];
const effectiveFunctions = new Map();

function normalizeSearchPath(value) {
  const trimmed = String(value ?? '').trim().replace(/;$/, '').trim();
  if (trimmed === "''" || trimmed === '""') return '';
  return trimmed;
}

function addEvent(events, event) {
  events.push(event);
}

for (const file of files) {
  const fullPath = path.join(migrationsDir, file);
  const sql = fs.readFileSync(fullPath, 'utf8');
  const events = [];

  const createPattern = /create\s+(?:or\s+replace\s+)?function\s+((?:public|private)\.[a-z_][\w$]*)\s*\(([^)]*)\)([\s\S]*?)\bas\s+\$([a-z0-9_]*)\$/ig;
  for (const match of sql.matchAll(createPattern)) {
    const header = match[3] || '';
    const isSecurityDefiner = /\bsecurity\s+definer\b/i.test(header);
    const searchPathMatch = header.match(/\bset\s+search_path\s*=\s*([^\n;]+)/i);
    addEvent(events, {
      index: match.index,
      type: 'create',
      name: match[1].toLowerCase(),
      securityDefiner: isSecurityDefiner,
      searchPath: searchPathMatch ? normalizeSearchPath(searchPathMatch[1]) : null,
      file,
    });
  }

  const alterPattern = /alter\s+function\s+((?:public|private)\.[a-z_][\w$]*)\s*\([^)]*\)\s+set\s+search_path\s*=\s*([^;]+);/ig;
  for (const match of sql.matchAll(alterPattern)) {
    addEvent(events, {
      index: match.index,
      type: 'alter',
      name: match[1].toLowerCase(),
      searchPath: normalizeSearchPath(match[2]),
      file,
    });
  }

  const dropPattern = /drop\s+function\s+(?:if\s+exists\s+)?((?:public|private)\.[a-z_][\w$]*)\s*\([^)]*\)\s*;/ig;
  for (const match of sql.matchAll(dropPattern)) {
    addEvent(events, {
      index: match.index,
      type: 'drop',
      name: match[1].toLowerCase(),
      file,
    });
  }

  events.sort((a, b) => a.index - b.index);
  for (const event of events) {
    if (event.type === 'drop') {
      effectiveFunctions.delete(event.name);
    } else if (event.type === 'create') {
      if (event.securityDefiner) {
        effectiveFunctions.set(event.name, {
          searchPath: event.searchPath,
          file: event.file,
          lastChangedBy: 'CREATE FUNCTION',
        });
      } else {
        effectiveFunctions.delete(event.name);
      }
    } else if (event.type === 'alter') {
      const current = effectiveFunctions.get(event.name);
      if (current) {
        current.searchPath = event.searchPath;
        current.file = event.file;
        current.lastChangedBy = 'ALTER FUNCTION';
      }
    }
  }
}

for (const [name, config] of effectiveFunctions.entries()) {
  if (config.searchPath !== '') {
    errors.push(
      name + ' has an unsafe or missing effective search_path (' +
      (config.searchPath === null ? 'not set' : config.searchPath) +
      '), last changed by ' + config.lastChangedBy + ' in ' + config.file
    );
  }
}

if (!effectiveFunctions.has('private.sync_leaderboard_profile')) {
  errors.push('Expected private.sync_leaderboard_profile SECURITY DEFINER trigger was not found.');
}
const hardeningMigration = fs.readFileSync(
  path.join(migrationsDir, '20261014190000_harden_leaderboard_trigger_search_path.sql'),
  'utf8'
);
if (!/alter\s+function\s+private\.sync_leaderboard_profile\(\)\s+set\s+search_path\s*=\s*''\s*;/i.test(hardeningMigration)) {
  errors.push('The new migration must pin private.sync_leaderboard_profile() to an empty search_path.');
}

if (errors.length) {
  for (const error of errors) console.error('SECURITY DEFINER search-path guard failed: ' + error);
  process.exit(1);
}

console.log(
  'SECURITY DEFINER search-path guard passed for ' +
  effectiveFunctions.size + ' active privileged functions across ' + files.length + ' migrations.'
);

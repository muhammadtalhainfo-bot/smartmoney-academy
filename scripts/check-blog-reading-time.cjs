async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const WORDS_PER_MINUTE = 180;
  const MIN_READ_MINUTES = 3;

  function contentText(content) {
    const chunks = [];

    function visit(node) {
      if (typeof node === 'string') {
        chunks.push(node);
        return;
      }
      if (Array.isArray(node)) {
        for (const item of node) visit(item);
        return;
      }
      if (!node || typeof node !== 'object') return;
      if (typeof node.text === 'string') chunks.push(node.text);
      if (Array.isArray(node.items)) visit(node.items);
    }

    if (typeof content === 'string') chunks.push(content);
    else visit(content);
    return chunks.join(' ');
  }

  function countWords(value) {
    return value.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length || 0;
  }

  const errors = [];
  for (const post of POSTS) {
    const slug = String(post?.slug || '(unknown article)');
    const words = countWords(contentText(post?.content));
    const minutes = Math.max(MIN_READ_MINUTES, Math.ceil(words / WORDS_PER_MINUTE));
    const expected = minutes + ' min read';

    if (!words) errors.push(slug + ': no readable article text was available to estimate.');
    if (post?.readTime !== expected) {
      errors.push(slug + ': readTime is "' + post?.readTime + '"; expected "' + expected +
        '" for ' + words + ' words at ' + WORDS_PER_MINUTE + ' words/minute.');
    }
  }

  if (errors.length) {
    for (const error of errors) console.error('Blog reading-time guard failed: ' + error);
    process.exit(1);
  }

  console.log('Blog reading-time guard passed: ' + POSTS.length +
    ' articles use a conservative ' + WORDS_PER_MINUTE +
    '-word/minute estimate with a ' + MIN_READ_MINUTES + '-minute minimum.');
}

main().catch((error) => {
  console.error('Blog reading-time guard could not complete:', error);
  process.exit(1);
});

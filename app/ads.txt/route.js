export const runtime = 'edge';

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const publisherId = client.startsWith('ca-') ? client.slice(3) : client;

  if (!/^pub-\d{16}$/.test(publisherId)) {
    return new Response('# Add NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX to enable ads.txt.\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}

export const runtime = 'edge';

const ADSENSE_PUBLISHER_ID = 'pub-4615893071983318';

export function GET() {
  return new Response(
    `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}

export async function POST(req) {
  const { title, message } = await req.json();

  const response = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Key os_v2_app_oci7h4am6ffpvfmhbqyebnjay5thxsi357yucy4k3ukhv3hh2vymhg26r36oyijw4dbjgdzfbafmq7cfy536n5y4sgnstbc5ppafk6i',
    },
    body: JSON.stringify({
      app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
      included_segments: ['All'],
      headings: { en: title },
      contents: { en: message },
      url: 'https://smartmoney-academy.vercel.app',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return Response.json({ error: data }, { status: 400 });
  }
  return Response.json({ success: true, data });
}

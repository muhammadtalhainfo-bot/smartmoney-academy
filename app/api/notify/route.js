export async function POST(req) {
  const { title, message } = await req.json();

  const response = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer os_v2_app_oci7h4am6ffpvfmhbqyebnjay7pixdlcl7suuafh6kbm5przcltcuofhu3n4zysoaukeusv72oujryd7zd4izksitd7elagpklwbwmq',
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

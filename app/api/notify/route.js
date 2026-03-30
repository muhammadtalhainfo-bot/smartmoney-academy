export async function POST(req) {
  const { title, message } = await req.json();

  const response = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.ONESIGNAL_REST_API_KEY,
    },
    body: JSON.stringify({
      app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
      included_segments: ['All'],
      headings: { en: title },
      contents: { en: message },
      url: 'https://ictflow.com',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return Response.json({ error: data }, { status: 400 });
  }
  return Response.json({ success: true, data });
}

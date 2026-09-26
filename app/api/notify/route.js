export const runtime = 'nodejs';

export async function POST(req) {
  try {
    if (!process.env.ONESIGNAL_REST_API_KEY) {
      return Response.json({ error: 'Notification service not configured' }, { status: 500 });
    }

    const { title, message } = await req.json();
    if (!title?.trim()) return Response.json({ error: 'Missing title' }, { status: 400 });
    if (!message?.trim()) return Response.json({ error: 'Missing message' }, { status: 400 });

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
        included_segments: ['All'],
        headings: { en: title.trim() },
        contents: { en: message.trim() },
        url: 'https://ictflow.com',
      }),
    });

    const data = await response.json();
    if (!response.ok) return Response.json({ error: 'Failed to send notification', data }, { status: 400 });
    return Response.json({ success: true, data });
  } catch (err) {
    console.error('Notify error:', err);
    return Response.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}

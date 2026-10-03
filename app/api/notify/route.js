import { getAdminSession } from '../../admin/actions';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > 25_000) {
      return Response.json({ error: 'Request too large.' }, { status: 413 });
    }

    const session = await getAdminSession();
    if (!session?.ok) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.ONESIGNAL_REST_API_KEY) {
      return Response.json({ error: 'Notification service not configured' }, { status: 500 });
    }

    const rawBody = await req.text();
    if (rawBody.length > 25_000) {
      return Response.json({ error: 'Request too large.' }, { status: 413 });
    }

    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const { title, message } = body;
    const cleanTitle = typeof title === 'string' ? title.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    if (!cleanTitle) return Response.json({ error: 'Missing title' }, { status: 400 });
    if (!cleanMessage) return Response.json({ error: 'Missing message' }, { status: 400 });
    if (cleanTitle.length > 100 || cleanMessage.length > 2000) {
      return Response.json({ error: 'Notification content is too long.' }, { status: 413 });
    }

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
        included_segments: ['All'],
        headings: { en: cleanTitle },
        contents: { en: cleanMessage },
        url: 'https://ictflow.com',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OneSignal notification error:', response.status, data);
      return Response.json({ error: 'Failed to send notification' }, { status: 502 });
    }
    return Response.json({ success: true, data });
  } catch (err) {
    console.error('Notify error:', err);
    return Response.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}

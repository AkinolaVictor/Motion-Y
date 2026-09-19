// API Route: src/pages/api/chat.js
// Secure proxy to Ollama API to prevent exposing API keys to the client.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array is required' });
  }

  const apiKey = process.env.OLLAMA_API_KEY;

  if (!apiKey) {
    console.error('Missing OLLAMA_API_KEY in environment variables');
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  const isLocal = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV=="local"
  const use_API = isLocal?"http://localhost:11434":"https://ollama.com";
  // console.log({isLocal, use_API})
  // console.log({isLocal, use_API})
  // console.log({isLocal, use_API})
  try {
    const response = await fetch(`${use_API}/api/chat`, {
      method: 'POST',
      headers: isLocal?
      {
        'Content-Type': 'application/json',
      }:{
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma4:31b-cloud',
        messages: messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Ollama API Error:', response.status, errorData);
      return res.status(response.status).json({
        error: errorData.error || 'Failed to fetch response from Ollama API'
      });
    }

    const data = await response.json();

    // Ollama's /api/chat returns response in data.message.content
    return res.status(200).json({ content: data.message.content });

  } catch (error) {
    console.error('Internal Server Error during Ollama proxy:', error);
    return res.status(500).json({ error: 'An internal server error occurred while processing your request.' });
  }
}

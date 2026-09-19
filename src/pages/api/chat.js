// API Route: src/pages/api/chat.js
// Secure proxy to Ollama API with RAG (Dynamic Folder Context) implementation.

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Lacking messages array in request body' });
  }

  const apiKey = process.env.OLLAMA_API_KEY;

  if (!apiKey) {
    console.error('Missing OLLAMA_API_KEY in environment variables');
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  try {
    // Dynamic RAG: Read all files from the public/about_us directory
    const ragDir = path.join(process.cwd(), 'public', 'about_us');
    const files = fs.readdirSync(ragDir);

    let combinedKnowledge = "";

    for (const file of files) {
      if (file.endsWith('.txt')) {
        const content = fs.readFileSync(path.join(ragDir, file), 'utf8');
        combinedKnowledge += `\\n--- SOURCE: ${file} ---\\n${content}\\n`;
      }
    }

    const systemPrompt = `You are the Motion-Y AI Assistant. You are a professional, helpful, and technical expert.

    KNOWLEDGE BASE (Aggregated from company files):
    ${combinedKnowledge}

    STRICT RESPONSE GUIDELINES:
    1. BE CONCISE AND TO THE POINT: Avoid fluff, unnecessary introductions, or excessive politeness.
    2. DIRECT ANSWERS: Provide the most helpful answer immediately. Use bullet points for lists.
    3. NO NOISE: Do not repeat the question or add generic "As an AI assistant..." filler.
    4. PRIMARY SOURCE: Use the provided KNOWLEDGE BASE as your primary source of truth.
    5. KNOWLEDGE LIMITS: If the answer is not present in the KNOWLEDGE BASE, follow the "Important Knowledge Rule" (avoid inventing company-specific facts or prices).
    6. GENERAL AI: For general AI questions, be brief and state that it is general knowledge.
    7. TONE: Professional, technical, and sophisticated.
    `;

    const messagesWithContext = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const isLocal = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV === "local";
    const use_API = isLocal ? "http://localhost:11434" : "https://ollama.com";

    const response = await fetch(`${use_API}/api/chat`, {
      method: 'POST',
      headers: isLocal ? {
        'Content-Type': 'application/json',
      } : {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         model: 'gemma4:31b-cloud',
        messages: messagesWithContext,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => { return { error: 'Failed to fetch response from Ollama API' }; });
      console.error('Ollama API Error:', response.status, errorData);
      return res.status(response.status).json({
        error: errorData.error || 'Failed to fetch response from Ollama API'
      });
    }

    const data = await response.json();
    return res.status(200).json({ content: data.message.content });

  } catch (error) {
    console.error('RAG/Internal Server Error:', error);
    return res.status(500).json({ error: 'An internal server error occurred while processing your request.' });
  }
}

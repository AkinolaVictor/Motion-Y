
// API Route: src/pages/api/chat.js
// Secure proxy to Pollinations AI with RAG (Dynamic Folder Context).

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: 'Lacking messages array in request body'
    });
  }

  const apiKey = process.env.POLLINATIONS_API_KEY;

  if (!apiKey) {
    console.error('Missing POLLINATIONS_API_KEY');
    return res.status(500).json({
      error: 'Server configuration error: API key missing'
    });
  }

  // Read local knowledge files
  async function readFileContent(filePath, file) {
    try {
      const agentInstructions = path.join(
        process.cwd(),
        'public',
        filePath
      );

      return fs.readFileSync(
        path.join(agentInstructions, file),
        'utf8'
      );
    } catch (err) {
      console.error(`Error reading file at ${filePath}:`, err);
      return '';
    }
  }

  try {
    // Dynamic RAG: Read all files from public/about_us
    const ragDir = path.join(
      process.cwd(),
      'public',
      'about_us'
    );

    const files = fs.readdirSync(ragDir);

    const systemRules = await readFileContent(
      'agent_instructions',
      'system_Rules.txt'
    );

    let combinedKnowledge = '';

    for (const file of files) {
      if (file.endsWith('.txt')) {
        const content = fs.readFileSync(
          path.join(ragDir, file),
          'utf8'
        );

        combinedKnowledge += `
--- SOURCE: ${file} ---
${content}
`;
      }
    }

    // Build system prompt
    const systemPrompt = `
${systemRules}

APPROVED KNOWLEDGE BASE (Aggregated from company files):
${combinedKnowledge}
`;

    // Combine system instructions with conversation
    const messagesWithContext = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages
    ];

    // Pollinations AI configuration
    const model = 'openai/gpt-5-nano';

    const response = await fetch(
      'https://gen.pollinations.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: messagesWithContext,
          stream: false
        })
      }
    );

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Failed to fetch response from Pollinations AI'
      }));

      console.error(
        'Pollinations API Error:',
        response.status,
        errorData
      );

      return res.status(response.status).json({
        error:
          errorData.error?.message ||
          errorData.error ||
          'Failed to fetch response from Pollinations AI'
      });
    }

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Unexpected Pollinations response:', data);

      return res.status(502).json({
        error: 'Pollinations returned an empty response'
      });
    }

    return res.status(200).json({ content });

  } catch (error) {
    console.error('RAG/Internal Server Error:', error);

    return res.status(500).json({
      error: 'An internal server error occurred while processing your request.'
    });
  }
}

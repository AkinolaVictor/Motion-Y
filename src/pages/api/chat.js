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

  async function readFileContent(filePath, file) {
    try {
      const agent_instructions = path.join(process.cwd(), 'public', filePath);
      const content = fs.readFileSync(path.join(agent_instructions, file), 'utf8');
      return content;
    } catch (err) {
      console.error(`Error reading file at ${filePath}:`, err);
      return '';
    }
  }

  // console.log({prompt})
  
  try {
    // Dynamic RAG: Read all files from the public/about_us directory
    const ragDir = path.join(process.cwd(), 'public', 'about_us');
    const files = fs.readdirSync(ragDir);
    
    const system_Rules = await readFileContent('agent_instructions', 'system_Rules.txt');
    let combinedKnowledge = "";
    
    for (const file of files) {
      if (file.endsWith('.txt')) {
        const content = fs.readFileSync(path.join(ragDir, file), 'utf8');
        combinedKnowledge += `\\n--- SOURCE: ${file} ---\\n${content}\\n`;
      }
    }

// 1. BE CONCISE AND TO THE POINT: Avoid fluff, unnecessary introductions, or excessive politeness.
    const systemPrompt = `
    ${system_Rules}

    APPROVED KNOWLEDGE BASE (Aggregated from company files):
    ${combinedKnowledge}

    `;
    // console.log(countTexts())
    function countTexts(){
      const messa = [...messages]
      let char_estimate = 0
      let word_estimate = 0
      for(let i=0; i<messa.length; i++){
        const content = messa[i]?.content
        if(!content) continue

        char_estimate+=content.length

        const count_word = content.split(" ").length
        word_estimate=word_estimate+count_word
      }

      const propmt_char_len = systemPrompt.length
      const prompt_word_len = systemPrompt.split(" ").length

      const total_word = word_estimate+prompt_word_len
      const total_char = char_estimate+propmt_char_len

      return {
        char_estimate, 
        word_estimate,
        propmt_char_len,
        prompt_word_len,
        total_char,
        total_word
      }
    }

    const messagesWithContext = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const isLocal = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV === "local";
    const use_API = isLocal ? "http://localhost:11434" : "https://ollama.com";
    // const model = isLocal ? "gpt-oss:120b-cloud" : "gemma4:31b-cloud";
    const model = "gemma4:31b-cloud";
    const response = await fetch(`${use_API}/api/chat`, {
      method: 'POST',
      headers: isLocal ? {
        'Content-Type': 'application/json',
      } : {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         model,
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

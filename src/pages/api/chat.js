export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful skincare advisor. Provide concise skincare routines and recommend 2 skincare products by name for any skin issue.' },
          { role: 'user', content: message }
        ]
      })
    });

    const result = await apiRes.json();
    const reply = result.choices?.[0]?.message?.content || 'No response generated.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error contacting OpenAI.' });
  }
}

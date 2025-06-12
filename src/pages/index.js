import { useState } from 'react';
import Head from 'next/head';

const skinIssues = [
  'Acne',
  'Dry Skin',
  'Oily Skin',
  'Wrinkles',
  'Hyperpigmentation'
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Head>
        <title>GlowEssence | Skin Care AI</title>
        <meta name="description" content="GlowEssence AI Skin Care Advisor" />
      </Head>
      <h1 style={{ color: '#733bf6' }}>SKIN AI 💬</h1>
      <p style={{ fontSize: '1.1rem' }}>Choose or type your skin concern to get personalized suggestions:</p>

      <select onChange={(e) => setQuery(e.target.value)} style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '1rem', width: '100%', maxWidth: '600px' }}>
        <option value="">-- Select a skin issue --</option>
        {skinIssues.map((issue) => (
          <option key={issue} value={`Suggest skincare routine and 2 product recommendations for ${issue.toLowerCase()}.`}>{issue}</option>
        ))}
      </select>
  <br></br>
      <textarea
        rows={4}
        cols={50}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Or type your own question..."
        style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem', width: '100%', maxWidth: '600px' }}
      />
      <br />
      <button onClick={handleChat} style={{ marginTop: '1rem', backgroundColor: '#733bf6', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Ask AI
      </button>
      {response && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
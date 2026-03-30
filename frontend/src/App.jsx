import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText) return;
    setLoading(true);
    setSummary('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary("Error: Make sure the Python server is running.");
    }
    setLoading(false);
  };

  return (
      <div className="container">
        <div className="card">
          <h1>AI Summarizer</h1>
          <p className="subtitle">
            Local Intelligence powered by <strong>FastAPI</strong>, <strong>LangGraph</strong>, and <strong>Llama 3.2</strong>.
          </p>

          <textarea
              rows="10"
              placeholder="Paste your long-form text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
          />

          <button className="btn" onClick={handleSummarize} disabled={loading}>
            {loading ? 'Synthesizing...' : 'Summarize Content'}
          </button>

          {summary && (
              <div className="result-area">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>Executive Summary</h3>
                  <button
                      onClick={() => navigator.clipboard.writeText(summary)}
                      style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <p style={{ marginTop: '16px', lineHeight: '1.7', color: '#334155' }}>{summary}</p>
              </div>
          )}
        </div>
      </div>
  )
}

export default App

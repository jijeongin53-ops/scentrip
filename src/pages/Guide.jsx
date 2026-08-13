import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { LuBot } from 'react-icons/lu';

const Guide = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm ScenTrip Soul Mate. Ask me about Jeonpo cafes, Yeongdo gems, or your eco-rewards!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "That's a great question! Busan has many eco-friendly spots. Have you checked out the Gamcheon Culture Village's new walking paths?", 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  return (
    <div className="page-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      {/* Header Area */}
      <div className="dark-card" style={{ borderRadius: '0 0 24px 24px', margin: 0, padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-color)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff' }}>
            <LuBot />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>ScenTrip Soul Mate ✨</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your Busan travel AI</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? 'var(--accent-color)' : 'white',
            color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
            padding: '1rem',
            borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
            maxWidth: '85%',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-color)', boxShadow: '0 -4px 10px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-color)', borderRadius: '24px', padding: '0.5rem 1rem', border: '1px solid #e2e8f0' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{ border: 'none', background: 'transparent', padding: 0, margin: 0, flex: 1, boxShadow: 'none' }}
          />
          <button 
            onClick={handleSend}
            style={{ background: 'var(--accent-color)', color: 'white', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;

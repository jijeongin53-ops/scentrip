import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiSmile, FiCpu } from 'react-icons/fi';

// Smart Busan AI Travel Guide Engine
const generateAIResponse = (userQuery) => {
  const q = userQuery.toLowerCase().trim();

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('start')) {
    return "Hello! I'm ScenTrip Soul Mate, your AI Busan travel companion! 🌿 I can help you find eco-friendly spots, local street food, historic trails, or scenic monorails across Busan. What would you like to explore today?";
  }

  if (q.includes('food') || q.includes('eat') || q.includes('seafood') || q.includes('market') || q.includes('dish')) {
    return "Busan is a paradise for foodies! 🐟 I recommend:\n1. Jagalchi Fish Market for fresh harbor seafood.\n2. Choryang Market for Galbi & Dwaeji Gukbap.\n3. Bupyeong Kkangtong Night Market for Ssiat Hotteok & street bites!";
  }

  if (q.includes('beach') || q.includes('ocean') || q.includes('sea') || q.includes('coast')) {
    return "For ocean lovers, here are top picks:\n1. Songdo Beach & Marine Cable Car (Korea's 1st public beach).\n2. Huinnyeoul Culture Village cliffside walk.\n3. Yeongdo Seaside Skywalk floating above crashing waves!";
  }

  if (q.includes('history') || q.includes('culture') || q.includes('village') || q.includes('stair')) {
    return "For rich culture and history:\n1. Choryang Ibagu-gil & 168 Stairs Monorail in Dong-gu.\n2. Gamcheon Culture Village - the Machu Picchu of Busan.\n3. Bosu-dong Book Street for vintage secondhand books!";
  }

  if (q.includes('view') || q.includes('tower') || q.includes('night') || q.includes('observatory')) {
    return "For stunning panoramic views:\n1. Yongdusan Park & Busan Tower (360-degree harbor views).\n2. Yoo Chi-hwan Postbox Observatory.\n3. Sanbok-doro Skyway Road for nighttime Busan port lights!";
  }

  if (q.includes('recommend') || q.includes('best') || q.includes('where') || q.includes('place')) {
    return "We have 40 curated eco-spots in Dong-gu, Jung-gu, Yeongdo-gu, and Seo-gu! Click on the 'Explore' tab to see spots sorted by real-time distance from your location, with audio guides for each!";
  }

  return `Thanks for asking about "${userQuery}"! Busan offers 40 eco-friendly destinations. Check out the 'Explore' section to view real-time GPS distances, audio guides, and traveler reviews for spots near you!`;
};

const Guide = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm ScenTrip Soul Mate ✨ Ask me anything about Busan's 40 eco-friendly spots, seafood markets, or scenic monorails!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    const newMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);
    
    // Intelligent AI response generation
    setTimeout(() => {
      const aiReplyText = generateAIResponse(userText);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: aiReplyText, 
        sender: 'ai' 
      }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="page-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      {/* Header Area */}
      <div className="dark-card" style={{ borderRadius: '0 0 24px 24px', margin: 0, padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-color)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
            <FiCpu />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2px', color: 'white' }}>ScenTrip Soul Mate ✨</h1>
            <p style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: '600' }}>Busan AI Travel Companion (Active)</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? 'var(--accent-color)' : 'white',
            color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
            padding: '1rem 1.2rem',
            borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            maxWidth: '85%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: msg.sender === 'ai' ? '1px solid #e2e8f0' : 'none',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-line'
          }}>
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '0.8rem 1.2rem', borderRadius: '18px 18px 18px 0', border: '1px solid #e2e8f0', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: '600' }}>
            🤖 AI is thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '0.8rem 1rem', background: 'var(--surface-color)', boxShadow: '0 -4px 15px rgba(0,0,0,0.04)', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-color)', borderRadius: '24px', padding: '0.4rem 0.8rem', border: '1px solid #e2e8f0' }}>
          <input 
            type="text" 
            placeholder="Ask AI about Busan spots, food, monorail..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{ border: 'none', background: 'transparent', padding: '0.5rem', margin: 0, flex: 1, boxShadow: 'none', fontSize: '0.95rem' }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{ background: 'var(--accent-color)', color: 'white', border: 'none', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: !input.trim() ? 0.6 : 1 }}
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;

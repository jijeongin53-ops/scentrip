import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStory } from '../services/googleSheets';
import { FiVolume2, FiSquare, FiArrowLeft } from 'react-icons/fi';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudioGuide = () => {
    if (!story) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        const textToSpeak = `Story guide. ${story.content}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  useEffect(() => {
    const fetchStory = async () => {
      const data = await getStory(id);
      setStory(data);
      setLoading(false);
    };
    fetchStory();

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading story...</div>;
  }

  if (!story) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Story not found.</div>;
  }

  return (
    <div className="story-container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem', padding: '1rem' }}>
      
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        <FiArrowLeft /> Back
      </button>

      {/* Story Images */}
      {story.images && story.images.length > 0 && (
        <div style={{ width: '100%', height: '320px', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
          <img src={story.images[0]} alt="Story visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Story Content Card */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--header-bg)' }}>The Local Tale</h1>
          
          {/* Audio Guide Button */}
          <button
            onClick={toggleAudioGuide}
            style={{
              background: isPlaying ? '#ef4444' : 'var(--accent-color)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              boxShadow: '0 4px 10px rgba(16,185,129,0.3)'
            }}
          >
            {isPlaying ? <><FiSquare /> Stop Audio</> : <><FiVolume2 /> Audio Guide</>}
          </button>
        </div>
        
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '2.5rem' }}>
          {story.content.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0' }} />

        {/* Call to Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--header-bg)', marginBottom: '0.5rem' }}>Ready to explore this alleyway?</h3>
          
          <a 
            href="https://smartstore.naver.com/scentrip" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ width: '100%', maxWidth: '320px' }}
          >
            Get ScenTrip Kit
          </a>

          <button 
            onClick={() => navigate(`/review/${id}`)}
            style={{ 
              width: '100%', maxWidth: '320px', padding: '0.9rem', background: 'transparent', 
              border: '1px solid var(--accent-color)', color: 'var(--accent-color)', 
              borderRadius: '12px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.3s ease'
            }}
          >
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Story;

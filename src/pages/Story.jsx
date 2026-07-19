import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStory } from '../services/googleSheets';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      const data = await getStory(id);
      setStory(data);
      setLoading(false);
    };
    fetchStory();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading story...</div>;
  }

  // Fallback for missing story
  if (!story) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Story not found.</div>;
  }

  return (
    <div className="story-container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Story Images */}
      {story.images && story.images.length > 0 && (
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', boxShadow: 'var(--glass-shadow)' }}>
          <img src={story.images[0]} alt="Story visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Story Content */}
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>The Local Tale</h1>
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '3rem' }}>
          {story.content.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '2rem 0' }} />

        {/* Call to Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Ready to explore this alleyway?</h3>
          
          {/* External Purchase Link */}
          <a 
            href="https://smartstore.naver.com/scentrip" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ width: '100%', maxWidth: '300px' }}
          >
            Get ScenTrip Kit
          </a>

          <button 
            onClick={() => navigate(`/review/${id}`)}
            className="btn-secondary"
            style={{ 
              width: '100%', maxWidth: '300px', padding: '0.75rem', background: 'transparent', 
              border: '1px solid var(--accent-color)', color: 'var(--accent-color)', 
              borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Leave a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Story;

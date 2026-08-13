import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStory, getReviews } from '../services/googleSheets';
import { FiVolume2, FiSquare, FiArrowLeft, FiStar, FiMessageCircle, FiUser } from 'react-icons/fi';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [reviews, setReviews] = useState([]);
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
    const fetchData = async () => {
      const storyData = await getStory(id);
      setStory(storyData);
      
      const reviewsData = await getReviews(id);
      setReviews(reviewsData);
      
      setLoading(false);
    };
    fetchData();

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading story and reviews...</div>;
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

      {/* Story Hero Image */}
      {story.images && story.images.length > 0 && (
        <div style={{ width: '100%', height: '320px', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
          <img src={story.images[0]} alt="Story visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Story Content Card */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'white', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
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
        
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '2rem' }}>
          {story.content.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a 
            href="https://smartstore.naver.com/scentrip" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ width: '100%', maxWidth: '320px' }}
          >
            Get ScenTrip Kit
          </a>
        </div>
      </div>

      {/* Traveler Reviews Section */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--header-bg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMessageCircle style={{ color: 'var(--accent-color)' }} /> Traveler Reviews
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <div style={{ color: '#eab308', fontSize: '1.1rem' }}>★ ★ ★ ★ ★</div>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>4.9</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>({reviews.length} reviews)</span>
            </div>
          </div>

          <button 
            onClick={() => navigate(`/review/${id}`)}
            style={{ 
              padding: '8px 16px', background: '#f0fdf4', 
              border: '1px solid #bbf7d0', color: 'var(--accent-color)', 
              borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem'
            }}
          >
            + Leave Review
          </button>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reviews.map((rev, idx) => (
            <div 
              key={rev.id || idx} 
              style={{ 
                padding: '1.2rem', 
                background: '#f8fafc', 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifySelf: 'center', color: '#64748b', justifyContent: 'center' }}>
                    <FiUser />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{rev.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{rev.timestamp}</div>
                  </div>
                </div>

                <div style={{ color: '#eab308', fontSize: '0.9rem' }}>
                  {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))}
                </div>
              </div>

              <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: '1.5' }}>
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveReview } from '../services/googleSheets';
import { FiStar, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const Review = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: user?.name || '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: location } });
    } else {
      setFormData(prev => ({ ...prev, name: user.name || '' }));
    }
  }, [user, navigate, location]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const result = await saveReview({ alleywayId: id, ...formData });
    setSubmitting(false);
    
    if (result) {
      setSuccess(true);
      setTimeout(() => navigate(`/explore`), 2000);
    } else {
      alert('Failed to submit review. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: 'white', maxWidth: '440px', width: '100%', borderRadius: '24px' }}>
          <FiCheckCircle style={{ fontSize: '3.5rem', color: 'var(--accent-color)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--header-bg)', marginBottom: '0.5rem' }}>Thank You!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Your review has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '540px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '1rem' }}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="glass-panel" style={{ padding: '2.5rem 2rem', background: 'white', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--header-bg)', marginBottom: '0.5rem', textAlign: 'center' }}>Leave a Review</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', textAlign: 'center', marginBottom: '2rem' }}>
          Share your eco-friendly experience with other travelers
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your name"
              style={{ marginBottom: 0 }}
            />
          </div>

          {/* Interactive Star Rating */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.8rem',
                    color: star <= formData.rating ? '#eab308' : '#cbd5e1',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 0.1s ease'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Styled Textarea (Matching Tone & Manner) */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.9rem' }}>Comment</label>
            <textarea 
              required 
              rows="4"
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              placeholder="Share your experience..."
              style={{
                width: '100%',
                minHeight: '130px',
                padding: '1rem 1.2rem',
                background: 'var(--bg-color)',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-color)';
                e.target.style.background = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = 'var(--bg-color)';
              }}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={submitting}
            style={{ marginTop: '0.5rem', opacity: submitting ? 0.7 : 1, padding: '1.1rem', fontSize: '1.1rem', borderRadius: '16px' }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;

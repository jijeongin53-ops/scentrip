import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveReview } from '../services/googleSheets';

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
      setTimeout(() => navigate(`/district/1`), 2000); // Redirect after success
    } else {
      alert('Failed to submit review. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="review-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Thank You!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Your review has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Leave a Review</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your name"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Rating (1-5)</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              required 
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Comment</label>
            <textarea 
              required 
              rows="5"
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              placeholder="Share your experience..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={submitting}
            style={{ marginTop: '1rem', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;

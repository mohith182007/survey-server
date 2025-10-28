import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitUserInfo } from '../utils/api';
import './InfoPage.css';

function InfoPage({ onUserCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    institution: '',
    institutionName: '',
    gmail: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 5 || formData.age > 100) newErrors.age = 'Age must be between 5 and 100';
    if (!formData.institution) newErrors.institution = 'Please select school or university';
    if (!formData.institutionName.trim()) newErrors.institutionName = 'Institution name is required';
    if (!formData.gmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.gmail = 'Valid email is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Ensure age is sent as a number
    const payload = {
      ...formData,
      age: Number(formData.age)
    };
    try {
      const result = await submitUserInfo(payload);
      onUserCreated(result.userId);
      navigate('/questions');
    } catch (error) {
      setErrors({ submit: error.error || 'Failed to submit form' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Personality</h1>
          <p className="hero-subtitle">Understand yourself better through our interactive personality assessment</p>
        </div>
      </div>

      <div className="container">
        <div className="main-content">
          <div className="personality-showcase">
            <div className="personality-card">
              <div className="card-icon">🦉</div>
              <h3>The Silent Sentinel</h3>
              <p>Solitary observer, handles challenges independently</p>
            </div>
            <div className="personality-card">
              <div className="card-icon">🦊</div>
              <h3>The Watchful Gardener</h3>
              <p>Intelligent and cautious, wisely selective</p>
            </div>
            <div className="personality-card">
              <div className="card-icon">�</div>
              <h3>The Empathic Anchor</h3>
              <p>Thrives in connection and cooperation</p>
            </div>
            <div className="personality-card">
              <div className="card-icon">🦎</div>
              <h3>The Masked Jester</h3>
              <p>Masks feelings with humor, adapts expression</p>
            </div>
            <div className="personality-card">
              <div className="card-icon">🔥</div>
              <h3>Adaptive Hybrid</h3>
              <p>Flexible blend of openness and caution</p>
            </div>
            <div className="personality-card">
              <div className="card-icon">🦋</div>
              <h3>Ambivalent Type</h3>
              <p>Craves closeness yet fears rejection</p>
            </div>
          </div>

          <div className="form-wrapper">
            <h2>Let's Get Started</h2>
            <p className="form-subtitle">Tell us about yourself</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  min="5"
                  max="100"
                />
                {errors.age && <div className="error">{errors.age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="institution">Type of Institution *</label>
                <select
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="school">School</option>
                  <option value="university">University</option>
                </select>
                {errors.institution && <div className="error">{errors.institution}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="institutionName">Name of Institution *</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  placeholder="e.g., ABC School / XYZ University"
                />
                {errors.institutionName && <div className="error">{errors.institutionName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="gmail">Gmail Address *</label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                />
                {errors.gmail && <div className="error">{errors.gmail}</div>}
              </div>

              {errors.submit && <div className="error" style={{ marginBottom: '20px' }}>{errors.submit}</div>}

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Submitting...' : 'Start Assessment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

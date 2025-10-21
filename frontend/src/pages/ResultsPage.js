import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSurveyResponse } from '../utils/api';
import { getRating, PERSONALITY_TYPES } from '../utils/personalityCalculator';
import './ResultsPage.css';

function ResultsPage({ responseId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if results were passed via navigation state (for local testing)
    if (location.state?.result) {
      const { result, surveyData } = location.state;
      setResponse({
        classification: result.type,
        answerCounts: result.answerCounts,
        profile: result.profile,
        userId: {
          name: 'Test User',
          institutionName: 'Test Institution'
        }
      });
      setLoading(false);
      return;
    }

    if (!responseId) {
      setError('No response found. Please complete the assessment.');
      setLoading(false);
      return;
    }

    const fetchResponse = async () => {
      try {
        const data = await getSurveyResponse(responseId);
        setResponse(data);
      } catch (err) {
        setError(err.error || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId, location]);

  if (loading) {
    return (
      <div className="container">
        <p>Loading your results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <button onClick={() => navigate('/')}>Start Over</button>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="container">
        <p className="error">No results available</p>
        <button onClick={() => navigate('/')}>Start Over</button>
      </div>
    );
  }

  return (
    <div className="results-page container">
      <h1>Your Results</h1>
      
      {response.userId && (
        <div className="user-info">
          <p><strong>Name:</strong> {response.userId.name}</p>
          <p><strong>Institution:</strong> {response.userId.institutionName}</p>
        </div>
      )}

      <div className="personality-card">
        <div className="type-badge">{response.profile?.animal}</div>
        
        <h2>{response.profile?.name}</h2>
        <p className="description">{response.profile?.description}</p>

        <div className="rating-box">
          <strong>Classification Strength:</strong> <span className="rating">{getRating(response.answerCounts)}</span>
        </div>

        {response.profile?.reasoning && (
          <div className="reasoning-box">
            <h4>Why This Classification?</h4>
            <p>{response.profile.reasoning}</p>
          </div>
        )}
      </div>

      <div className="details-container">
        <div className="detail-box">
          <h3>Key Traits</h3>
          <ul>
            {response.profile?.traits && response.profile.traits.map((trait, idx) => (
              <li key={idx}>{trait}</li>
            ))}
          </ul>
        </div>

        <div className="detail-box">
          <h3>Strengths</h3>
          <ul>
            {response.profile?.strengths && response.profile.strengths.map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="detail-box">
          <h3>Areas for Development</h3>
          <ul>
            {response.profile?.weaknesses && response.profile.weaknesses.map((weakness, idx) => (
              <li key={idx}>{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="detail-box">
          <h3>Recommendations</h3>
          <ul>
            {response.profile?.recommendations && response.profile.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="detail-box">
          <h3>Suitable Career Paths</h3>
          <ul>
            {response.profile?.careerFit && response.profile.careerFit.map((career, idx) => (
              <li key={idx}>{career}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="score-breakdown">
        <h3>Your Answer Distribution</h3>
        <div className="score-grid">
          <div className="score-item">
            <div className="score-label">
              <span>Option A</span>
              <span>Option B</span>
              <span>Option C</span>
              <span>Option D</span>
            </div>
            <div className="answer-distribution">
              <div className="answer-bar" style={{ flexBasis: `${response.answerCounts?.A || 0}` }}>
                <span className="bar-label">A: {response.answerCounts?.A || 0}</span>
              </div>
              <div className="answer-bar alt1" style={{ flexBasis: `${response.answerCounts?.B || 0}` }}>
                <span className="bar-label">B: {response.answerCounts?.B || 0}</span>
              </div>
              <div className="answer-bar alt2" style={{ flexBasis: `${response.answerCounts?.C || 0}` }}>
                <span className="bar-label">C: {response.answerCounts?.C || 0}</span>
              </div>
              <div className="answer-bar alt3" style={{ flexBasis: `${response.answerCounts?.D || 0}` }}>
                <span className="bar-label">D: {response.answerCounts?.D || 0}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="legend">
          <p><strong>A = The Silent Sentinel</strong> (Emotionally Reserved)</p>
          <p><strong>B = The Watchful Gardener</strong> (Selectively Open)</p>
          <p><strong>C = The Empathic Anchor</strong> (Emotionally Open)</p>
          <p><strong>D = The Masked Jester</strong> (Defensive Detachment)</p>
        </div>
      </div>

      <div className="button-group">
        <button onClick={() => navigate('/')}>Start New Assessment</button>
        <button className="secondary" onClick={() => window.print()}>Print Results</button>
      </div>
    </div>
  );
}

export default ResultsPage;

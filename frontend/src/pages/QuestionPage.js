import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSurveyResponse } from '../utils/api';
import { calculatePersonality } from '../utils/personalityCalculator';
import './QuestionPage.css';

// Question data with answer options
const QUESTIONS = [
  {
    id: 1,
    text: "When you face a personal problem, you usually:",
    options: [
      { label: "A", text: "Try to solve it alone quietly." },
      { label: "B", text: "Share it only with close friends after thinking deeply." },
      { label: "C", text: "Ask for help openly without hesitation." },
      { label: "D", text: "Avoid thinking about it and distract yourself." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -2 }
  },
  {
    id: 2,
    text: "When someone offers you help, you:",
    options: [
      { label: "A", text: "Feel uneasy and decline politely." },
      { label: "B", text: "Accept but feel guilty later." },
      { label: "C", text: "Welcome it gratefully." },
      { label: "D", text: "Ignore or change the topic." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -2 }
  },
  {
    id: 3,
    text: "If a friend stops talking to you suddenly, you:",
    options: [
      { label: "A", text: "Assume they want distance and leave them alone." },
      { label: "B", text: "Wait for them to reach out first." },
      { label: "C", text: "Try to talk and understand the reason." },
      { label: "D", text: "Pretend you don't care." }
    ],
    scores: { A: -1, B: 0, C: 2, D: -2 }
  },
  {
    id: 4,
    text: "How do you usually express emotional pain?",
    options: [
      { label: "A", text: "I hide it completely." },
      { label: "B", text: "I express it through work or hobbies." },
      { label: "C", text: "I share it with someone I trust." },
      { label: "D", text: "I become angry or distant." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -2 }
  },
  {
    id: 5,
    text: "In a group setting, when you disagree with something, you:",
    options: [
      { label: "A", text: "Stay silent even if it bothers you." },
      { label: "B", text: "Speak gently only if it feels safe." },
      { label: "C", text: "Express your point openly." },
      { label: "D", text: "Use sarcasm or avoid the group." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -1 }
  },
  {
    id: 6,
    text: "When you feel overwhelmed, what do you do first?",
    options: [
      { label: "A", text: "Isolate myself." },
      { label: "B", text: "Think deeply and write my thoughts." },
      { label: "C", text: "Contact someone for support." },
      { label: "D", text: "Distract myself with activities or media." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -1 }
  },
  {
    id: 7,
    text: "How comfortable are you asking someone for emotional support?",
    options: [
      { label: "A", text: "Very uncomfortable." },
      { label: "B", text: "Slightly hesitant." },
      { label: "C", text: "Comfortable and open." },
      { label: "D", text: "I never ask for help." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -2 }
  },
  {
    id: 8,
    text: "If someone misunderstands you, you:",
    options: [
      { label: "A", text: "Let it go; explanations feel tiring." },
      { label: "B", text: "Try to correct it later calmly." },
      { label: "C", text: "Address it immediately." },
      { label: "D", text: "Keep distance rather than clarifying." }
    ],
    scores: { A: -1, B: 0, C: 2, D: -1 }
  },
  {
    id: 9,
    text: "In friendships, you usually:",
    options: [
      { label: "A", text: "Keep things superficial." },
      { label: "B", text: "Get close but pull back sometimes." },
      { label: "C", text: "Maintain open communication." },
      { label: "D", text: "Stay friendly but emotionally detached." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -1 }
  },
  {
    id: 10,
    text: "How do you react when others share personal feelings?",
    options: [
      { label: "A", text: "Feel awkward or unsure how to respond." },
      { label: "B", text: "Listen but struggle to empathize." },
      { label: "C", text: "Engage with care and understanding." },
      { label: "D", text: "Change the topic to something lighter." }
    ],
    scores: { A: -1, B: 0, C: 2, D: -2 }
  },
  {
    id: 11,
    text: "Which statement describes your view of dependence?",
    options: [
      { label: "A", text: "Relying on others shows weakness." },
      { label: "B", text: "It's fine occasionally but risky." },
      { label: "C", text: "It builds connection and trust." },
      { label: "D", text: "People always disappoint, so better avoid it." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -2 }
  },
  {
    id: 12,
    text: "When someone notices your sadness, you:",
    options: [
      { label: "A", text: "Deny it instantly." },
      { label: "B", text: "Say you're fine to avoid discussion." },
      { label: "C", text: "Admit and talk briefly." },
      { label: "D", text: "Joke to shift attention." }
    ],
    scores: { A: -2, B: -1, C: 2, D: -1 }
  },
  {
    id: 13,
    text: "When you see someone struggling emotionally, you usually:",
    options: [
      { label: "A", text: "Avoid getting involved—it feels uncomfortable." },
      { label: "B", text: "Offer light support but keep emotional distance." },
      { label: "C", text: "Reach out sincerely to help." },
      { label: "D", text: "Wait until they ask before acting." }
    ],
    scores: { A: -2, B: 0, C: 2, D: 0 }
  },
  {
    id: 14,
    text: "How do you feel when others express deep emotions around you?",
    options: [
      { label: "A", text: "It makes me uneasy or awkward." },
      { label: "B", text: "I listen but find it hard to relate." },
      { label: "C", text: "I feel connected and understanding." },
      { label: "D", text: "I often zone out or change the topic." }
    ],
    scores: { A: -1, B: 0, C: 2, D: -2 }
  },
  {
    id: 15,
    text: "If someone criticizes your emotional behavior, you:",
    options: [
      { label: "A", text: "Withdraw silently and feel hurt." },
      { label: "B", text: "Justify yourself calmly." },
      { label: "C", text: "Reflect and try to improve." },
      { label: "D", text: "Avoid them afterward." }
    ],
    scores: { A: -2, B: 0, C: 2, D: -1 }
  }
];

function QuestionPage({ userId, onResponseCreated }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use mock userId if not provided (for standalone testing)
  const effectiveUserId = userId || 'mock-user-id';

  const handleAnswer = (optionLabel) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionLabel
    }));
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      setError('Please answer all questions before submitting');
      return;
    }

    setLoading(true);
    try {
      const result = calculatePersonality(answers, QUESTIONS);
      const surveyData = {
        userId: effectiveUserId,
        answers: Object.fromEntries(
          Object.entries(answers).map(([idx, ans]) => [QUESTIONS[idx].id, ans])
        ),
        classification: result.type,
        answerCounts: result.answerCounts,
        answerBreakdown: result.answerBreakdown
      };

      // Try to submit to backend, but don't fail if it's not running
      try {
        const response = await submitSurveyResponse(surveyData);
        onResponseCreated(response.responseId);
      } catch (apiError) {
        console.log('Backend not available, using local results');
        // Generate a mock response ID for local testing
        onResponseCreated('mock-response-id-' + Date.now());
      }
      
      navigate('/results', { state: { result, surveyData } });
    } catch (err) {
      setError(err.error || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="question-page container">
      <h1>Personality Assessment</h1>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <p className="progress-text">Question {currentQuestion + 1} of {QUESTIONS.length}</p>

      <div className="question-container">
        <h2>{question.text}</h2>
        
        <div className="answer-options">
          {question.options.map((option) => (
            <label key={option.label} className="option">
              <input
                type="radio"
                name="answer"
                value={option.label}
                checked={answers[currentQuestion] === option.label}
                onChange={(e) => handleAnswer(e.target.value)}
              />
              <span className="option-label">{option.label}.</span>
              <span className="option-text">{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="button-group">
        <button 
          onClick={handlePrevious} 
          disabled={currentQuestion === 0}
          className="secondary"
        >
          Previous
        </button>
        
        {currentQuestion === QUESTIONS.length - 1 ? (
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="primary"
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="primary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionPage;

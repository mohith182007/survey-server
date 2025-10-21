import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InfoPage from './pages/InfoPage';
import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [userId, setUserId] = useState(null);
  const [responseId, setResponseId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoPage onUserCreated={setUserId} />} />
        <Route path="/questions" element={<QuestionPage userId={userId} onResponseCreated={setResponseId} />} />
        <Route path="/results" element={<ResultsPage responseId={responseId} />} />
        {/* Direct access routes for testing */}
        <Route path="/test/questions" element={<QuestionPage onResponseCreated={setResponseId} />} />
        <Route path="/test/results" element={<ResultsPage responseId={responseId} />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://survey-server-9ill.onrender.com/api';

function AnswersBarChart() {
  const [answerCounts, setAnswerCounts] = useState({ A: 0, B: 0, C: 0, D: 0 });

  useEffect(() => {
    axios.get(`${API_URL}/survey/responses`).then(res => {
      const responses = res.data;
      const totalCounts = { A: 0, B: 0, C: 0, D: 0 };
      responses.forEach(r => {
        if (r.answerCounts) {
          totalCounts.A += r.answerCounts.A || 0;
          totalCounts.B += r.answerCounts.B || 0;
          totalCounts.C += r.answerCounts.C || 0;
          totalCounts.D += r.answerCounts.D || 0;
        }
      });
      setAnswerCounts(totalCounts);
    });
  }, []);

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Total Answers',
        data: [answerCounts.A, answerCounts.B, answerCounts.C, answerCounts.D],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  return (
    <div>
      <h2>Answer Distribution</h2>
      <Bar data={data} />
    </div>
  );
}

export default AnswersBarChart;

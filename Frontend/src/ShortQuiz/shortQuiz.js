import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../OX_quiz/quiz.css';
import tino from '../OX_quiz/tino2.png';

function ShortQuizPage() {
  const [problemData, setProblemData] = useState({});
  const id = useParams().id;
  useEffect(() => {
    // GET request
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/blank/${id}/`)
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [userAnswer, setUserAnswer] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleAnswerSubmit = () => {
    const isCorrect = inputValue.trim().toLowerCase() === problemData.blank_answer.trim().toLowerCase();
    setUserAnswer(inputValue);
    setFeedback(isCorrect ? '정답입니다' : '틀렸습니다');
    setInputValue('');
  };

  return (
    <div>
    <div className='tino-image'>
      <img src={tino} className='quiz-tino'/>
    </div>
    <div className='quiz-container'>
      <div className='qzproblem-container'>
        {problemData && Object.keys(problemData).length > 0 && (
          <div key={problemData.id}>
            <p className="qzproblem-container2">{problemData.title}</p>
            <p className="qzproblem-container2">{problemData.description}</p>
          </div>
        )}
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <div className='answer-container'>
        <button className='answer-btn' onClick={handleAnswerSubmit}>
          Submit
        </button>
      </div>
      <p className='feedback'>
            {feedback}
          </p>
    </div>
    </div>
  );
}

export default ShortQuizPage;

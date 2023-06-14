import './quiz.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import tino from './tino2.png';

function QuizPage() {
  const [problemData, setProblemData] = useState({});
  const id = useParams().id;

  useEffect(() => {
    // GET 요청
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/select/1/`)
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [userAnswers, setUserAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswerSubmit = (is_correct) => {
    setLoading(true);
    setIsCorrect(is_correct);
    setUserAnswers(prevAnswers => [...prevAnswers, is_correct]);
    setFeedback(is_correct ? "정답입니다!" : "틀렸습니다.");
    setLoading(false);
  };


  return (
    <div>
    <div className='tino-image'>
      <img src={tino} className='quiz-tino'/>
    </div>
    <div className="quiz-container">
      <div className="qzproblem-container">
        {problemData && Object.keys(problemData).length > 0 && (
          <div key={problemData.id}>
            <p className="qzproblem-container2">{problemData.title}</p>
            <p className="qzproblem-container2">{problemData.description}</p>
          </div>
        )}
      </div>
      <div className="answer-container">
        <button className="answer-btn" onClick={() => handleAnswerSubmit(problemData.is_correct)}>
          O
        </button>
        <button className="answer-btn" onClick={() => handleAnswerSubmit(!problemData.is_correct)}>
          X
        </button>
      </div>
      <p className="feedback">{feedback}</p>
    </div>
    </div>
  );
}

export default QuizPage;
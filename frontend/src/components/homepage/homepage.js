import Quiz from '../quiz/quiz';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

const HomePage = () => {
  const [quiz, setQuiz] = useState(null);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: link,
        }),
      });
      const data = await response.json();

      setQuiz(data);
      localStorage.setItem('quiz', JSON.stringify(data)); // Store quiz data in localStorage
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigate('/quiz');
    }
  };

  return (
    <div>
      <h2>QuizTube</h2>
      <input
        type="text"
        placeholder="link"
        value={link}
        onChange={(event) => setLink(event.target.value)}
      />
      <input type="submit" onClick={getQuestions} />

      {loading ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default HomePage;

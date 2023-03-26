import Quiz from '../quiz/quiz';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import background from '../../public/images/background.jpg';
import logo from '../../public/images/logo.png';
import './homepage.css';
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
    <div
      style={{
        backgroundImage: 'url(' + background + ')',
        backgroundSize: 'cover',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="logo">
          <img id="logo" src={logo} alt="logo" />
        </div>
      </div>
      <div className="searchContainer">
        <input
          className="input"
          type="text"
          placeholder="Please enter your chosen Youtube video link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <input className="submit" type="submit" onClick={getQuestions} />
      </div>
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

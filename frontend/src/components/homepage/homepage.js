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
  const [submitting, setSubmitting] = useState(false); // New state variable
  const navigate = useNavigate();

  const getQuestions = async () => {
    setSubmitting(true); // Set submitting to true when the form is being submitted
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
      setSubmitting(false); // Set submitting back to false after the form is submitted
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
      <div className="about">
        <h2>
          Enter a Youtube video link to get a multiple choice quiz on the video
        </h2>
      </div>
      <div className="searchContainer">
        <input
          className="input"
          type="text"
          placeholder="Please enter your chosen Youtube video link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <button
          className="submit"
          type="button"
          onClick={getQuestions}
          disabled={submitting}
        >
          {submitting ? (
            <Circles
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="circles-loading"
              wrapperStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              wrapperClass=""
              visible={true}
            />
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;

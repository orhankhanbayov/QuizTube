import React, { useEffect, useState } from 'react';
import './quiz.css';
import background from '../../public/images/background.jpg';
import logo from '../../public/images/logo.png';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    const quizData = localStorage.getItem('quiz');
    if (quizData) {
      setQuiz(JSON.parse(quizData));
    }
  }, []);

  useEffect(() => {
    if (quiz) {
      const initialAnswers = quiz.data.map((q) => q.answer);
      setQuizAnswer(initialAnswers);
    }
  }, [quiz]);

  function handleAnswerSelect(question, answer) {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[question] = answer;
      return updatedAnswers;
    });
  }

  const handleSubmit = () => {
    const numCorrect = quizAnswer.reduce((count, answer, index) => {
      return answer === answers[index] ? count + 1 : count;
    }, 0);
    alert(
      `You got ${numCorrect} out of ${quizAnswer.length} questions correct.`
    );
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
        <a href="/">
          <div className="logo">
            <img id="logo" src={logo} alt="logo" />
          </div>
        </a>
      </div>
      <div>
        {quiz &&
          quiz.data &&
          quiz.data.map((q, index) => {
            const isCorrectAnswer = quizAnswer[index] === answers[index];
            const inputClass = submitClicked
              ? isCorrectAnswer
                ? 'correct'
                : 'incorrect'
              : '';
            return (
              <div key={q.question} className="quiz">
                {q.question} <br></br>
                {q.choices.map((choice) => (
                  <div key={choice}>
                    <input
                      type="radio"
                      name={index}
                      value={choice}
                      onChange={() => handleAnswerSelect(index, choice)}
                      className={inputClass}
                      disabled={submitClicked}
                      style={
                        inputClass === 'correct'
                          ? {
                              border: '2px solid green',
                              backgroundColor: 'lightgreen',
                            }
                          : inputClass === 'incorrect'
                          ? {
                              border: '2px solid red',
                              backgroundColor: 'lightcoral',
                            }
                          : {}
                      }
                    />

                    <>{choice}</>
                  </div>
                ))}
                <br></br>
              </div>
            );
          })}
        <div className="quiz">
          <button className="submitQuiz" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

import React, { useEffect, useState } from 'react';
import './quiz.css';
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
    <div>
      <h2>Quiz</h2>
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
              <div key={q.question}>
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
        <button onClick={handleSubmit}>Submit Answers</button>
      </div>
    </div>
  );
};

export default Quiz;

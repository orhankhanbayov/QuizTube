import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState([]);
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
    if (JSON.stringify(quizAnswer) === JSON.stringify(answers)) {
      console.log('well done');
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      <div>
        {quiz &&
          quiz.data &&
          quiz.data.map((q, index) => (
            <div key={q.question}>
              {q.question} <br></br>
              {q.choices.map((choice) => (
                <div key={choice}>
                  <input
                    type="radio"
                    name={index}
                    value={choice}
                    onChange={() => handleAnswerSelect(index, choice)}
                  />
                  <>{choice}</>
                </div>
              ))}
              <br></br>
            </div>
          ))}
        <button onClick={handleSubmit}>Submit Answers</button>
      </div>
    </div>
  );
};

export default Quiz;

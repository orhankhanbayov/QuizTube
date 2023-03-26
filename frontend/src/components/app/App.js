import './App.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import HomePage from '../homepage/homepage';
import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Quiz from '../quiz/quiz';
const App = ({ navigate }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage navigate={useNavigate()} />} />
      <Route path="/quiz" element={<Quiz navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

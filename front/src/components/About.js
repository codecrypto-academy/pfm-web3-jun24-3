import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>About</h2>
      <button onClick={handleNavigate}>Go to Home</button>
    </div>
  );
}

export default About;

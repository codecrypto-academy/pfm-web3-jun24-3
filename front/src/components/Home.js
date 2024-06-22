import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../W3ETHG3-logo.svg';

function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <img src={logo} className="App-logo" alt="logo" />
      </div>
  );
}

export default Home;

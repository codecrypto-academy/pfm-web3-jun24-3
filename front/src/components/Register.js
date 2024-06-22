import React, { useState } from 'react';
// import { getAccount, getBalance } from './metamask';


const Register = ({ account }) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Role:', role);
    console.log('Email:', email);
    console.log('Account:', account);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Connected Address:  </label>
          <input type="text" id="address" value={account || ''} readOnly />
          <br></br><br></br>
        </div>
        <div>
          <label htmlFor="role">Tipo de Actor:  </label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Seleecione uno</option>
            <option value="agricultor">Agricultor</option>
            <option value="bodegero">Bodegero</option>
            <option value="transportista">Transportista</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <br></br><br></br>
        </div>
        <div>
          <label htmlFor="email">Email:  </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <br></br><br></br>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

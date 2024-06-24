import React, { useState } from 'react';


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
    <div className='bg-white text-black text-center py-4 '>
      <h2>Register</h2>
      <form className='bg-light border p-2' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Connected Address:  </label>
          <input type="text" id="address" value={account} readOnly />
          <br></br><br></br>
        </div>
        <div>
          <label htmlFor="role">Tipo de Actor:  </label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Selecione uno</option>
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
        <button className='btn btn-dark' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

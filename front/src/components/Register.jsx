import React, { useState } from 'react';
import { getAccount } from '../metamask';
import { ethers } from 'ethers';
import userManagementContractABI from '../abi/UserManagementABI.json';

// Anvil contract address
const userManagementContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";



const Register = ({ account }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    var { account, provider } = await getAccount();
    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(userManagementContractAddress, userManagementContractABI, signer);
    try{
    const tx = await contract.registerUser(account, email, {from: account});
    await tx.wait();
    console.log('Hash: ', tx.hash);
    } catch (err) {
      console.error('Error: ', err);
    }
    
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

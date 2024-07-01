import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
      <h2>REGISTER FORM</h2>
      <Form onSubmit={handleSubmit} className='bg-light border p-2'>
        <Form.Group controlId="formAddress">
          <Form.Label className="text-sm-right text-left">Connected Address:</Form.Label>
          <Form.Control
            type="text"
            value={account}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <p></p>
        <Button className='btn btn-dark' type="submit">
          Register
        </Button>
      </Form>
     
    </div>
  );
};

export default Register;

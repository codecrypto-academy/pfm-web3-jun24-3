import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { useAppContext  } from '../contexts/AppContext';

const Register = () => {

  const { metaMaskHook, contractHook} = useAppContext();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [txError, setTxError] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const contractUsers = new ethers.Contract(
                                      contractHook.userManagementContractAddress, 
                                      contractHook.userManagementContractABI, 
                                      metaMaskHook.signer);

    try {
      const tx = await contractUsers.registerUser(metaMaskHook.account, email, { from: metaMaskHook.account });
      await tx.wait();
      console.log('Hash: ', tx.hash);
      setIsLoading(false);
      setTxHash(tx.hash);
    } catch (err) {
      console.error('Register Error: ', err);
      setIsLoading(false);
      setTxError(err);
      setIsError(true);
    }

  };

  return (

    <div className='bg-white text-black text-center py-4 '>

      <h2>REGISTER FORM</h2>

      <div className='row'>
        <Form onSubmit={handleSubmit} className='bg-light border p-2'>
          <Form.Group controlId="formAddress">
            <Form.Label className="text-sm-right text-left">Connected Address:</Form.Label>
            <Form.Control
              type="text"
              value={metaMaskHook.account || ''}
              readOnly
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

			<div className='row'>
				<div>
					{isLoading && (
						<div className='alert alert-success' role='alert'>
							Registering ...
						</div>
					)}
					{isError && (
						<div className='alert alert-danger' role='alert'>
							Oops! somethings was wrong. Error: {txError.message}
						</div>
					)}
					{!isLoading && !isError && txHash && (
						<div className='alert alert-success' role='alert'>
							{txHash}
						</div>
					)}
				</div>
			</div>

    </div>
  );
};

export default Register;

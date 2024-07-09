import React, { useState } from 'react';
import { Form, Button, Collapse, Alert} from 'react-bootstrap';
import { ethers } from 'ethers';
import { useAppContext  } from '../contexts/AppContext';

const Register = () => {

  const { account, setAccount, balance, setBalance, provider, setProvider, signer, setSigner,
		userManagementContractAddress, userManagementContractABI,
		contractUser, setContractUser, users, setUsers,
		currentRole, setCurrentRole,roles, roleList } = useAppContext();


  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles.PENDIENTE_ASIGNACION_ROL);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [txError, setTxError] = useState('');
  const [txHash, setTxHash] = useState('');
  const [formError, setFormError] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const validateForm = () => {
    let error = '';
    let valid = true;

    if (!email) {
      error = error +  'Provide an email for registration';
      valid = false;
    }

    if (!role) {
      error = error +  'Select a role for registration';
      valid = false;
    }

    setFormError(error);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (validateForm()) {

      const contractUsers = new ethers.Contract(
        userManagementContractAddress, 
        userManagementContractABI, 
        signer);

      try {
        console.log('Calling contractUsers.registerUser with account,email,_role,index: ', account, email, roleList.indexOf(role));
        const tx = await contractUsers.registerUser(account, email, roleList.indexOf(role));
        await tx.wait();
        console.log('Register Success!! TX Hash: ', tx.hash);
        setIsLoading(false);
        setTxHash(tx.hash);
      } 
        catch (err) {
        console.error('Register Failed!! Error: ', err);
        setIsLoading(false);
        setTxError(err);
        setIsError(true);
      }
    }
    else{
        console.error('Form validation Failed!! ', formError);
        setIsLoading(false);
        setTxError(formError);
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
              value={account || ''}
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
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
              <Form.Select
                id="role"
                name="role"
                value={roles.PENDIENTE_ASIGNACION_ROL}
                onChange={handleRoleChange}
                >
                {Object.values(roles).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
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
              <Alert severity="info">
                Registering ...
              </Alert>
					)}
					{isError && (
              <Alert severity="error" variant="danger">
                <p className="text-wrap text-break">
                Oops! somethings was wrong. Error: {formError ? formError: txError.message }
                </p>
              </Alert>
					)}
					{!isLoading && !isError && txHash && (
              <Alert severity="success">
                Registration Success: TX Hash: {txHash}
              </Alert>
					)}
				</div>
			</div>

    </div>
  );
};

export default Register;

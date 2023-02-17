import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import "../App.css";
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const saveData = async (e)=> {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User Register Successfull")
            navigate('/login')
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    };

  return (
    <>
        <div className="main_container mt-5">
            <h2 className='mb-3'>Register Here</h2>
            <div className="container w-25 border border-info p-3 rounded-2 bg-light fs-5">
                <Form method='POST' onSubmit={saveData}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' required={true} onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share with anyone.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required={true} onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Password" />
                </Form.Group>
                <Form.Group className='container mt-3'>
                <Button variant="light" className='fw-bold w-50 text-primary' type="submit">
                    Submit
                </Button>
                <NavLink to='/login'>
                    <Button variant="light" className='fw-bold w-50 text-primary'> Already a user </Button>
                </NavLink>
                </Form.Group>
                </Form>
            </div>
        </div>
    </>
  )
}

export default SignUp;
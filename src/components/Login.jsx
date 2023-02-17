import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, NavLink } from 'react-router-dom';
import "../App.css";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Present } from "../App"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {state, dispatch} = useContext(Present);

    const saveData = async (e)=> {
        e.preventDefault();

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("authToken", res._tokenResponse.refreshToken)
            localStorage.setItem("uid", res.user.uid)
            dispatch({type: "PRESENT", payload: true})
            navigate('/messages')
        } catch (error) {
            alert(error)
            console.error(error)
        }
    };

  return (
    <>
        <div className="main_container mt-5">
            {state ? <div><h1>Welcome Back</h1></div> :
            <>
                <h2 className='mb-3'>Login Here</h2>
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
                    <NavLink to='/signup'>
                        <Button variant="light" className='fw-bold w-50 text-primary'> Already a user </Button>
                    </NavLink>
                    </Form.Group>
                    </Form>
                </div>
            </>
            }
        </div>
    </>
  )
}

export default Login;
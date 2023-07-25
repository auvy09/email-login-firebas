import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase.init';
const auth = getAuth(app);
const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(e => {
                console.error(e);
            })
    }
    const handleBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }
    const handleResetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email');
            return;

        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert("Password reset email sent! Please Check Your Email.")
            })
            .catch(e => {
                console.error(e);
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'> Please login</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleBlur} name='email' type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Enter Password" required />
                </Form.Group>
                <Button variant="outline-primary" type='submit'>Login</Button>{' '}
            </Form>
            {
                success && <p className='text-success'><small><small>Login Successful </small></small></p>
            }
            <p><small>New to this site! Please <Link to={'/register'}>Register</Link> </small></p>
            <p><small>Reset password <Button onClick={handleResetPassword} variant="link">Reset Password</Button></small></p>
        </div>
    );
};

export default LoginBootstrap;
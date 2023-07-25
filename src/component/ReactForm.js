import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);



const ReactForm = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleRgester = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const name = form.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password, name);
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError("Please provide at least two uppercase");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Please provide at least six character");
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError("Please provide at least one special character");
            return;
        }
        setPasswordError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                verifyEmail();
                updateUserName(name);

            })
            .catch(error => {
                console.warn(error);
            })

    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify.');
            })
    }
    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('name update')
            })
            .catch(e => { console.error(e) })

    }

    return (
        <div className=' w-50 mx-auto mt-4'>
            <h3 className="text-warning">Please Register</h3>
            <Form onSubmit={handleRgester}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" required />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className="text-danger">{passwordError}</p>
                {
                    success && <p className='text-success'>Account created successfully</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account! Please <Link to={'/login'}>Login</Link> </small></p>
        </div>
    );
};

export default ReactForm;
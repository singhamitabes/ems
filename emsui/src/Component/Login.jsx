import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4000/ems/adminLogin', values)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    localStorage.setItem("token", res.data.token);
                    navigate('/');
                } else {
                    setError(res.data.Error);
                }
            })
            .catch((err) => {
                setError(err.response.data.Error)
            });
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' autoComplete='off' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' name='password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p className='text-center mt-2'>You agree to our terms and policies</p>
                </form>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailVerificationStatus, setEmailVerificationStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const verifyEmail = async () => {
        try {
            const apiKey = 'TCKGFHW0I0FmMTOibQKOIbts7bZo9IPCfL8d'; 
            const response = await axios.get(`https://mailbite.io/api/check?key=${apiKey}&email=${encodeURIComponent(formData.email)}`);

            if (response.data.status === 'ok') {
                const emailStatus = response.data.email_status;
                if (emailStatus === 'VALID') {
                    setIsEmailValid(true);
                    setEmailVerificationStatus('Email is valid.');
                } else {
                    setIsEmailValid(false);
                    setEmailVerificationStatus('Email is not valid. Please use a valid email address.');
                }
            } else {
                setIsEmailValid(false);
                setEmailVerificationStatus('Error verifying email. Please try again later.');
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            setIsEmailValid(false);
            setEmailVerificationStatus('Error verifying email. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Verify email before submitting
        await verifyEmail();

        if (!isEmailValid) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/v1/user/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={verifyEmail} // Verify email on blur
                        />
                        {emailVerificationStatus && (
                            <p className={isEmailValid ? 'text-green-600' : 'text-red-600'}>{emailVerificationStatus}</p>
                        )}

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="/login">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;

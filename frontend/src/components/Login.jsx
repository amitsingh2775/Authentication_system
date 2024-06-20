import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/v1/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res);





            navigate('/')



        } catch (error) {
            toast.error(error.message);
        }
        setFormData({

            email: '',
            password: '',

        });
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />


                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
                        >
                            Login
                        </button>
                      
                        <a className="no-underline border-b border-red text-red-500 hover:text-red-700" href="/forget">
                            forget password
                        </a>
                       

                    </form>


                </div>

                <div className="text-grey-dark mt-6">
                    Create Account?
                    <a className="no-underline border-b border-blue text-blue" href="/signup">
                        Sign up
                    </a>.

                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useContext, useState } from "react";
import loginIcons from '../assest/assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { fetchUserHistory } = useContext(Context)
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }

        fetchUserHistory()
    };

    return (
        <section id='login' className="w-screen flex justify-center items-center min-h-screen bg-gradient-to-br  px-6 md:px-12 lg:px-24 mt-[-40px]">
            <div className='bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full'>
                <div className='w-24 h-24 mx-auto'>
                    <img src={loginIcons} alt='login icon' className="bg-white p-2 rounded-full" />
                </div>
                <form className='pt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label className="text-gray-300">Email:</label>
                        <div className='flex items-center bg-gray-700 p-3 rounded-lg'>
                        <input
                            type='email'
                            placeholder='Enter email'
                            name="email"
                            required
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full p-3 rounded-lg bg-gray-700 text-white outline-none'
                        />
                        </div>
                    </div>
                    <div className='grid gap-2'>
                        <label className="text-gray-300">Password:</label>
                        <div className='flex items-center bg-gray-700 p-3 rounded-lg'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter password'
                                name="password"
                                required
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full p-3 rounded-lg bg-transparent outline-none text-white'
                            />
                            <div 
                                className='cursor-pointer text-xl text-gray-400 pl-2'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <Link to='/forgot-password' className='block w-fit ml-auto hover:underline text-green-400'>Forgot password?</Link>
                    </div>
                    <button 
                        type="submit"
                        className='bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 w-full'
                    >
                        Login
                    </button>
                </form>
                <p className='mt-6 text-center'>
                    Don't have an account? <Link to="/sign-up" className='text-green-400 hover:text-green-300 hover:underline'>Sign up</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;

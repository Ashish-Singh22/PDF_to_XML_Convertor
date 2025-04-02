import React, { useContext, useState } from "react";
import loginIcons from '../assest/assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { fetchUserDetails } = useContext(Context);
    const { fetchUserHistory } = useContext(Context);

    
    const [data,setData]=useState({
        email : "",
        password : "",
        name : "",
        confirmPassword: "",
        profilePic : "", 
    })

    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        const { name , value } = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.method,
                headers : {
                    "content-type":"application/json"
                },
                body : JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if(dataApi.success){
                toast.success(dataApi.message)
                    const dataResponse = await fetch(SummaryApi.signIn.url, {
                        method: SummaryApi.signIn.method,
                        credentials: 'include',
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({email : data.email,
                            password : data.password,})
                    });
                    const dataApi1 = await dataResponse.json();
                    if (dataApi1.success) {
                        toast.success(dataApi1.message);
                        navigate('/');
                        fetchUserDetails();
                    }
                    if (dataApi1.error) {
                        toast.error(dataApi1.message);
                    }
                
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
        }else{
            toast.error("Please check password and confirm password")
        }
        fetchUserHistory()
    }

    const handleUploadPic = async(e)=>{
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)
        setData((prev) => {
            return{
                ...prev,
                profilePic : imagePic
            }
        })
    }

    return (
        <section id='signup' className='flex items-center justify-center min-h-screen bg-gradient-to-br  p-6'>
            <div className='w-screen max-w-md bg-black/40 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <img src={data.profilePic || loginIcons} alt='Profile' className='object-cover w-full h-full'/>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-gray-700 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full text-white'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>
                <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label className='text-gray-300'>Name:</label>
                        <input type='text' placeholder='Enter name' name='name' required value={data.name} onChange={handleOnChange} className='bg-gray-800 text-white p-3 rounded-xl outline-none'/>
                    </div>
                    <div className='grid gap-2'>
                        <label className='text-gray-300'>Email:</label>
                        <input type='email' placeholder='Enter email' name='email' required value={data.email} onChange={handleOnChange} className='bg-gray-800 text-white p-3 rounded-xl outline-none'/>
                    </div>
                    <div className='grid gap-2'>
                        <label className='text-gray-300'>Password:</label>
                        <div className='bg-gray-800 p-3 flex items-center rounded-xl'>
                            <input type={showPassword ? "text" : "password"} placeholder='Enter password' name ='password' required value={data.password} onChange={handleOnChange} className='bg-transparent text-white outline-none flex-grow'/>
                            <div className='cursor-pointer text-gray-400 pl-2' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2'>
                        <label className='text-gray-300'>Confirm Password:</label>
                        <div className='bg-gray-800 p-3 flex items-center rounded-xl'>
                            <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm password' name ='confirmPassword' required value={data.confirmPassword} onChange={handleOnChange} className='bg-transparent text-white outline-none flex-grow'/>
                            <div className='cursor-pointer text-gray-400 pl-2' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='bg-gradient-to-r from-green-600 to-gray-700 text-white px-6 py-2 rounded-full hover:scale-105 transition-all text-xl font-bold w-full'>
                        Sign Up
                    </button>
                </form>
                <p className='my-5 text-center text-gray-300'>
                    Already have an account? <Link to='/login' className='text-green-400 hover:underline'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUp;

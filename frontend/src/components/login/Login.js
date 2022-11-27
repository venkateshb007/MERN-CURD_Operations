import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
import Footer from '../footer/Footer'

const Login = () => {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate("/")
        }
    })

    const handleLogin= async ()=>{
        console.warn("email,password", email,password)
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-Type':'application/json'
            }
        })
        result = await result.json();
        console.warn(result)
        if(result.auth){
                localStorage.setItem("user",JSON.stringify(result.user));
                localStorage.setItem("token",JSON.stringify(result.auth));
                navigate("/")
        }else{
            alert("please enter correct details")
        }
    }

    return (
        <>
        
        <div className='my-login'>
            <h1 className='log'>Login</h1>
            <input type="text" className='input-Box' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="password" className='input-Box' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button className="app-Button" onClick={handleLogin} type='button'>Login</button>
        </div>
        <div className='l-footer'>
        <Footer />
        </div>
        </>
    )
}
export default Login;
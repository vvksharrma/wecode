import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { userContext } from '../../context/userContext';

const Login = () => {
    const [userName,setuserName]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false)
    const{setUserinfo}=useContext(userContext)

    async function login(e){
        e.preventDefault();
        const response=await fetch('http://localhost:4400/login',{
            method:'POST',
            body:JSON.stringify({userName,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
        if(response.ok){
            response.json().then(userInfo=>{
                setUserinfo(userInfo)
                setRedirect(true)
            })
        }
        else{alert('WRONG CREDENTIALS')}
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <div>
            <form className="login" onSubmit={login}>
            <h1>Login</h1>
                <input type="text" placeholder="username" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            
        </div>
    )
}

export default Login
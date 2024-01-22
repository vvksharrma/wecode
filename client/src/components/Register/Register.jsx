import React, { useState } from 'react'

const Register = () => {
    const [userName,setuserName]=useState('');
    const [password,setPassword]=useState('');

    async function register(e){
        e.preventDefault();

        const response=await fetch('http://localhost:4400/register',{
            method:'POST',
            body:JSON.stringify({userName,password}),
            headers:{'Content-Type':'application/json'},
        })
        if(response.status===200){
            alert("Registered")
        }
        else{
            alert("Try again")
        }
    }
    return(
        <div>
            <form className='register' onSubmit={register}>
            <h1>Register</h1>
                <input type="text" placeholder="username" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
            
        </div>
    )
}

export default Register
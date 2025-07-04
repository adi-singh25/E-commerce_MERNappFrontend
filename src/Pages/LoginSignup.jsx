import React from 'react'
import './css/LoginSignup.css'
import { useState } from 'react';

const LoginSignup = () => {

  const  [state,setState]=useState("Login");

  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const  changeHandler=(e)=>{

      setFormData({...formData,[e.target.name]:e.target.value})

  }


  // creating two function for sign up and login detail to  meet the end point api 

  const  login =async()=>{

    console.log("login is executed",formData);

    let responseData;
    await fetch('https://e-commerce-mernappbackend-1.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=> responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }

  }

  const  signup=async ()=>{

    console.log(" sign up page  is executed",formData);

    let responseData;
    await fetch('https://e-commerce-mernappbackend-1.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=> responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }

  }
  return (
    <div  className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
        {state==='Sign Up'?<input name='username' value ={formData.username}  onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}  
          <input  name="email" value={formData.email} onChange={changeHandler}type="email" placeholder='Email Address'/>
          <input  name="password" value={formData.password} onChange={changeHandler}type="password"placeholder='Password'/>

        </div>
        <button  onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state==="Sign Up"? <p className="loginsignup-login">Already Have an account? <span onClick={()=>{setState('Login')}}>Login here</span></p>:
         <p className="loginsignup-login">  Create An Account? <span onClick={()=>{setState('Sign Up')}}> Click Here</span></p>}
         <div className="loginsignup-agree">
       
       
          <input type="checkbox" name=''  id='' />
          <p>By Continuing , I Agree  to  the term  of use  & privacy policy.

          </p>

           
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup

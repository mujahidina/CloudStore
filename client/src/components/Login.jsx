
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"





const Login = ({isAuthenticated, handleAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, username);

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    };

    fetch('http://127.0.0.1:5555/user/login', opts)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          alert('Login successful');
          handleAuth(); 
          
          navigate('/'); 
        } else {
          alert('Failed to login');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('token', data.token);
        const decoded = jwtDecode('token');
          console.log(decoded);
      });
  };

  return (
    <div className="bg-slate-100 w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[900px] h-[400px] p-7 grid grid-cols-2">
        <div className="w-full ml-4 mt-11">
          <div>
            <img src="/src/assets/drive.png" className="w-11 mr-3 h-11 mb-5" alt="drive" />
          </div>
          <h1 className="text-4xl">Sign In to Your</h1>
          <h1 className="text-4xl mt-2">Account</h1>
          <h1 className="text-sm mt-5">Enter your details</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full h-full flex-col gap-7">
          <input
            className="outline-none border border-black p-3 rounded-md w-[350px]"
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
          <input
            className="outline-none border border-black p-3 rounded-md w-[350px]"
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
          <input
            className="outline-none border border-black p-3 rounded-md w-[350px]"
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <button
            className="flex items-center justify-center border rounded-full p-3 w-[120px] ml-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-sm text-white"
            type="submit"
          >
            Sign in
          </button>
          <div className='flex w-full items-center justify-center'>
            <Link to="/signup" className='text-sm text-[#2563eb]'>Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

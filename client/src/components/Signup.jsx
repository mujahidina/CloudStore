import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({handleAuth}) => {
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
  };

  const handleClick = () => {
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

    fetch('http://127.0.0.1:5555/user/register', opts)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          alert('Account Created');
          handleAuth()
          navigate('/');
        } else {
          alert('Failed to create account');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="bg-slate-100 w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[900px] h-[300px] p-7 grid grid-cols-2">
        <div className="w-full ml-6 mt-5">
          <div>
            <img src="/src/assets/drive.png" className="w-11 mr-3 h-11 mb-5" alt="drive" />
          </div>
          <h1 className="text-4xl">Create a CloudStore</h1>
          <h1 className="text-4xl mt-2">Account</h1>
          <h1 className="text-sm mt-5">Enter your details</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full h-full flex-col gap-7">
          <input
            className="outline-none border border-black p-1.5 rounded-md w-[350px]"
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
          <input
            className="outline-none border border-black p-1.5 rounded-md w-[350px]"
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
          <input
            className="outline-none border border-black p-1.5 rounded-md w-[350px]"
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <button
            onClick={handleClick}
            className="flex items-center justify-center border rounded-full p-3 w-[120px] bg-[#2563eb] hover:bg-[#1d4ed8] text-sm text-white"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

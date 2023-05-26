import React from 'react';
import axios from 'axios';
import {getCookie, Session} from 'unofficial-compass-api';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

const Login = () => {

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
      
        getCookie('mullauna-vic', username, password)
          .then((cookie: string) => {
            setCookie('SessionId', cookie);
          })
          .catch((error: any) => {
            console.log(error)
          });
    };    

  return (
    <div className="h-screen flex bg-base">
      <div className="w-[350px] max-w-sm m-auto bg-crust rounded-2xl border-2 border-pink shadow-default py-5 px-10">
        <h1 className="text-3xl text-pink font-extrabold text-primary mt-4 mb-10 text-center">
          Compass +
        </h1>
        <form onSubmit={handleFormSubmit}>
            <input
                type="username"
                id="username"
                className='w-full p-2 border rounded-lg outline-none text-sm transition duration-150 ease-in-out mb-4'
                placeholder="Username"
            />
            <input
                type="password"
                id="password"
                className='w-full p-2 border rounded-lg outline-none text-sm transition duration-150 ease-in-out mb-4'
                placeholder="Password"
            />
          <div className="flex justify-center items-center mt-4 mb-4">
            <button
              className="w-[150px] bg-base py-2 px-4 text-sm text-green rounded-lg border-2 border-green"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Login () {

  const router = useRouter();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    let url = `http://${process.env.NEXT_PUBLIC_URL}/api/auth`;

    let options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `{"username":"${e.target.username.value}","password":"${e.target.password.value}"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        if(json['sessionId']) {
          setCookie('sessionId',json['sessionId'])
          setCookie('userId',json['userId'])
          router.push('/dashboard')
        } else {
          console.log('invalid login')
        }
      })
      .catch(err => console.error('error:' + err));
  };     

  return (
    <div className="h-screen flex bg-base">
      <div className="w-[350px] max-w-sm m-auto bg-crust rounded-2xl border-2 border-surface1 shadow-default py-5 px-10">
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
            <button className="w-[150px] bg-base py-2 px-4 text-sm text-pink rounded-lg border-2 border-pink">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
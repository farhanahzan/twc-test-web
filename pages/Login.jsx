import React, { useState, useEffect } from 'react';

import Logo from '../components/Logo';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import ErrorNotify from '../components/ErrorNotify';
import { useCookies } from 'react-cookie';
import Meta from '../components/Meta';

function Login() {
  const query = useRouter();

  const [showError, setShowError] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://twc-test-api.cyclic.app/login',
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;

          if (email) setShowError(email);
          else if (password) setShowError(password);
        } else {
          query.push('/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (showError.length > 0) {
      const timeoutId = setTimeout(() => {
        setShowError({});
      }, 3000);
    }
  }, [showError]);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        query.push('/');
      }
    };
    verifyUser();
  }, [cookies, query, removeCookie]);
  return (
    <>
      <Meta title="Login Now" />
      <main>
        {showError.length > 0 ? <ErrorNotify error={showError} /> : null}

        <section className="bg-contact bg-repeat bg-right-bottom  w-full h-screen  overflow-hidden flex flex-col-reverse md:flex-row ">
          <div className=" bg-primary md:bg-inherit md:bg-loginBG bg-cover bg-right w-[100vw] md:w-[60vw] h-[70vh] md:h-screen px-[10vw] py-8 md:py-[15vh] flex flex-col justify-between ">
            <div>
              <h2 className="font-FutuBold text-2xl md:text-5xl text-white leading-8 md:pb-6">
                Hi there,
              </h2>
              <p className="text-white leading-8 font-FutuLight font-medium tracking-wide text-lg md:text-3xl w-full md:w-[20vw]">
                Welcome to our contacts portal
              </p>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col justify-between mb-10 md:mb-16">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-input mb-10"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-input"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="button">
                  login
                </button>
                <p className="mt-2 text-slate-50 ">
                  Don&apos;t have an account?
                  <Link className="font-bold underline" href="/Register">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="transition-all duration-500 ease-in flex flex-row justify-start  items-center w-[100vw] md:w-[40vw] h-[30vh] md:h-screen px-[7vw] py-[15vh]">
            <Logo text1="black" text2="primary" />
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;

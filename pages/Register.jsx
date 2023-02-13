import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import ErrorNotify from '../components/ErrorNotify';
import { useCookies } from 'react-cookie';
import Meta from '../components/Meta';

function Register() {
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
        'https://twc-test-api.cyclic.app/register',
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
          setValues({});
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
      <Meta title="Register Now" />

      <main>
        {showError.length > 0 ? <ErrorNotify error={showError} /> : null}
        <section className="bg-ellipse bg-cover bg-center w-full h-screen px-[5vw] md:px-[15vw] py-[10vh] overflow-hidden">
          <div className=" flex justify-between flex-col h-full">
            <Logo />
            <div>
              <h2 className="text-slate-50 text-2xl md:text-5xl font-bold leading-8 mb-16 font-FutuBold">
                Create an account
              </h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col items-start md:flex-row justify-between mb-10 md:mb-20">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-input mb-5"
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
                  Register
                </button>
                <p className="mt-2 text-slate-50 ">
                  Already have an account{' '}
                  <Link className="font-bold underline" href="/Login">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;

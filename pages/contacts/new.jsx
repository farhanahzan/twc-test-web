import React from 'react';

import Logo from '../../components/Logo';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ErrorNotify from '../../components/ErrorNotify';
import Meta from '../../components/Meta';

function New() {
  const query = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [showError, setShowError] = useState({});

  const [values, setValues] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        query.push('/Login');
      } else {
        const { data } = await axios.post(
          'http://localhost:4000/',
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie('jwt', { path: '/' });
          query.push('/Login');
        }
      }
    };

    verifyUser();
  }, [cookies, query, removeCookie]);

  useEffect(() => {
    if (showError.length > 0) {
      const timeoutId = setTimeout(() => {
        setShowError({});
      }, 3000);
    }
  }, [showError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios
      .post('http://localhost:4000/contacts/new', values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errors) {
            const { email, fullname, gender, phoneNumber } = res.data.errors;

            if (fullname) setShowError(fullname);
            else if (email) setShowError(email);
            else if (phoneNumber) setShowError(phoneNumber);
            else setShowError(gender);
          } else {
            query.push('/contacts');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Meta title="Add New Contact" />
      <main>
        {showError.length > 0 ? <ErrorNotify error={showError} /> : null}

        <section className="bgcontainer">
          <div className=" flex justify-between flex-col h-full">
            <Logo />
            <div>
              <div className="flex flex-row justify-between items-start">
                <h2 className="text-slate-50 text-xl md:text-5xl font-bold leading-8 mb-8 md:mb-16 font-FutuBold">
                  New Contact
                </h2>
                <button
                  type="button"
                  className="text-white bg-secondary shadow-lg shadow-primary/50 focus:ring-0 focus:outline-none  font-medium  text-sm md:text-lg px-3 md:px-5 py-1 md:py-2.5  pb-1.5 md:pb-3 rounded-full text-center "
                >
                  <Link href="/contacts">View Contacts</Link>
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col md:flex-row justify-between gap-2 mb-2 md:mb-10">
                  <input
                    type="text"
                    name="fullname"
                    placeholder="full name"
                    className="form-input"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-input"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 mb-10 md:mb-20">
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="phone number"
                    className="form-input"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                  <div className="md:w-[32vw]  py-3 text-slate-50 text-xl flex flex-row justify-between content-center align-middle font-semibold">
                    <span>gender</span>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        className="mr-2 border-1 border-slate-50 bg-transparent mb-1 focus:ring-1 focus:ring-white text-secondary
                        "
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        className="mr-2 border-1 border-slate-50 bg-transparent mb-1 focus:ring-1 focus:ring-white text-secondary
                        "
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="button">
                  add your first contact
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default New;

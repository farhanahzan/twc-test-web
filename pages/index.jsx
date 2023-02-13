import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Logo from '../components/Logo';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Meta from '../components/Meta'
export default function Home() {
  const query = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const logout = () => {
    removeCookie('jwt', { path: '/' });

    query.push('/Login');
  };
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        query.push('/Login');
      } else {
        const { data } = await axios.post(
          'http://localhost:4000',
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie('jwt', { path: '/' });
          query.push('/Login');
        } 
        // else {
        //   console.log(`Hi ${data.user}`);
        // }
      }
    };

    verifyUser();
  }, [cookies, query, removeCookie]);
  return (
    <>
      
      <Meta title="Welcome to twc contacts portal" />
      <main>
        <section className="bgcontainer ">
          <div className="flex justify-between flex-col h-full">
            <Logo />

            <div className="mb-10">
              <h2 className="text-slate-50 text-xl md:text-6xl font-bold leading-8 mb-2 md:mb-8 font-FutuBold">
                Welcome,
              </h2>
              <p className="text-slate-50 text-lg md:text-4xl  font-normal leading-6 md:leading-14 tracking-wide mb-10 md:mb-20 font-FutuLight">
                This is where your contacts will live. Click the button below to
                add a new contact.
              </p>
              <div className="flex flex-row justify-between">
                <button
                  onClick={() => query.push('/contacts/new')}
                  className="button"
                >
                  add your first contact
                </button>
                <button
                  onClick={logout}
                  className="button hover:bg-secondary hover:text-white"
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

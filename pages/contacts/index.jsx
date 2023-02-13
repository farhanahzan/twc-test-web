import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../../components/Logo';

import EditableRow from '../../components/EditableRow';
import ReadOnlyRow from '../../components/ReadOnlyRow';
import Meta from '../../components/Meta';

function Allcontacts() {
  const query = useRouter();
  const [allContacts, setAllContacts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [change, setChange] = useState(false)

    const [editValues, setEditValues] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });
  const [editContactId, setEditContactId] = useState(null);

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = await axios
      .put(`http://localhost:4000/contacts/${editContactId}`, editValues, {
        withCredentials: true,
      })
      .then((res) => {
        setChange(true)
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (e, contact) => {
    e.preventDefault();
    setEditContactId(contact._id);
    setEditValues({ ...contact });
  };

  const handleCancel = () => {
    setEditContactId(null);
  };

  const handleDelete = async (contactId) => {
    await axios
      .delete(`http://localhost:4000/contacts/${contactId}`)
      .then((res) => {
        setChange(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getAllContact = async () => {
      await axios
        .get('http://localhost:4000/contacts')
        .then((res) => {
          setAllContacts(res.data.contact);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllContact();
    setChange(false)
  }, [change]);

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
        } else {
          console.log(`Hi ${data.user}`);
        }
      }
    };

    verifyUser();
  }, [cookies, query, removeCookie]);

  return (
    <>
      <Meta title="All Contacts" />
      <main>
        <section className="bgcontainer">
          <div className=" flex justify-between flex-col h-full">
            <Logo />
            <div className="flex gap-1 flex-col">
              <div className="flex flex-row justify-between items-baseline h-16">
                <h2 className="text-slate-50 text-xl md:text-5xl font-bold leading-8 mb-8 md:mb-16 font-FutuBold">
                  Contacts
                </h2>
                <button
                  onClick={() => query.push('/contacts/new')}
                  className="button"
                >
                  add new contact
                </button>
              </div>
              <div className="bg-white md:rounded-3xl w-full  md:px-4 py-4 text-primary  h-[50vh]  overflow-y-auto">
                <form onSubmit={handleEditSubmit}>
                  <table className="w-full text-sm md:text-[20px] text-left font-FutuLight font-semibold transition-all duration-300 ease-linear border-spacing-6">
                    <thead className="text-sm md:text-[18px] font-FutuBold font-semibold">
                      <tr>
                        <th className="pb-4 w-15"></th>
                        <th className="pb-4  md:w-52">full name</th>
                        <th className="pb-4 md:w-28">gender</th>
                        <th className="pb-4">e-mail</th>
                        <th className="pb-4 md:w-40">phone number</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allContacts.map((contact) => (
                        <Fragment key={contact._id}>
                          {editContactId === contact._id ? (
                            <EditableRow
                              contacts={editValues}
                              handleEditChange={handleEditChange}
                              handleCancel={handleCancel}
                            />
                          ) : (
                            <ReadOnlyRow
                              contact={contact}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                              handleCancel={handleCancel}
                            />
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Allcontacts;

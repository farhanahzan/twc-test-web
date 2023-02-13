import React, { useState } from 'react';
import maleAvatar from '../public/assets/male.svg';
import femaleAvatar from '../public/assets/female.svg';
import editIcon from '../public/assets/edit.svg';
import deleteIcon from '../public/assets/delete.svg';
import Image from 'next/image';
import ConfirmAlert from './ConfirmAlert';
import Alert from './Alert';

function ReadOnlyRow({ contact, handleEdit, handleDelete, handleCancel }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const handleDeleteConfirm = (e) => {
    setShowDeleteAlert(!showDeleteAlert);
  };
  const handleButton1 = () => {
    handleDelete(contact._id);
    handleDeleteConfirm();
    setConfirmPopUp(!confirmPopUp);
  };
  return (
    <>
      {confirmPopUp ? (
        <tr key={(contact._id) + 'confirmalert'}>
          <td>
            <Alert
              content="Your contact has been deleted successfully!"
              button="Okay"
              handleButton={() => setConfirmPopUp(!confirmPopUp)}
            />
          </td>
        </tr>
      ) : (
        ''
      )}
      {showDeleteAlert && (
        <tr key={(contact._id) + 'deletealert'}>
          <td>
            <ConfirmAlert
              confirmPopUp={confirmPopUp}
              setConfirmPopUp={setConfirmPopUp}
              contacts={contact}
              content="Do you want to delete the contact "
              button1="Yes"
              handleButton1={handleButton1}
              button2="Cancel"
              handleButton2={handleDeleteConfirm}
            />
          </td>
        </tr>
      )}
      <tr key={(contact._id)+'readonly'} className="opacity-90 hover:bg-slate-100">
        <td className="py-3 px-1 pr-2 ">
          {contact.gender == 'male' ? (
            <Image src={maleAvatar}  alt="male avatar" />
          ) : (
            <Image src={femaleAvatar} alt="female avatar" />
          )}
        </td>
        <td className="py-3 pr-10">{contact.fullname}</td>
        <td className="py-3 pr-10">{contact.gender}</td>
        <td className="py-3 pr-10">{contact.email}</td>
        <td className="py-3 pr-10">{contact.phoneNumber}</td>
        <td className="pt-3 md:pt-[28px]  px-1 flex flex-row gap-5 content-baseline align-baseline">
          <Image
            onClick={(e) => handleEdit(e, contact)}
            src={editIcon}
            alt="edit"
            width="auto"
            height="auto"
          />
          <Image
            onClick={handleDeleteConfirm}
            src={deleteIcon}
            alt="delete"
            width="auto"
            height="auto"
          />
        </td>
      </tr>
    </>
  );
}

export default ReadOnlyRow;

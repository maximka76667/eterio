import React, { useContext } from 'react';
import './UserInfo.sass';

import { CurrentUserContext } from '../../contexts';
import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-5xl ff-montse mb-10'>User profile</h2>
      <img
        className='rounded-xl w-[250px] h-[250px] object-cover mt-3 mb-3'
        src={currentUser?.avatar}
        alt='Avatar'
      />
      <h3 className='mt-5 text-3xl'>{currentUser?.email}</h3>
      <p className='mt-3 text-xl'>{currentUser?.name}</p>
      <NavLink
        className='user-info__edit-button py-1.5 px-3 mt-4 rounded text-white'
        to='edit'
      >
        Edit
      </NavLink>
    </div>
  );
};

export default UserInfo;

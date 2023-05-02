import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts';
import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <h2>User profile</h2>
      <h3>{currentUser?.name}</h3>
      <p>{currentUser?.email}</p>
      <NavLink to='/me/edit'>Edit</NavLink>
    </div>
  );
};

export default UserInfo;

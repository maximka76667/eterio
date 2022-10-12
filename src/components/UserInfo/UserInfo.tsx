import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { UserInfoProps } from '../../interfaces';

const UserInfo = ({ isMenuOpened, logout }: UserInfoProps) => {
  const { email } = useContext(UserContext);

  return (
    <div
      className={`header__user-info ${
        isMenuOpened ? 'header__user-info_opened' : ''
      }`}
    >
      <span className='header__user-email'>{email}</span>
      <button className='header__logout' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserInfo;

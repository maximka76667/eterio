import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts';

const PrivateRoute = () => {
  const currentUser = useContext(CurrentUserContext);

  return currentUser !== null ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;

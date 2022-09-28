import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthProps } from '../../interfaces';

const Auth = ({ signInWithLink }: AuthProps) => {
  const { email, link } = useParams<{ email: string; link: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== undefined && link !== undefined) {
      signInWithLink(email, link);
      navigate('/');
    }
  }, []);

  return <></>;
};

export default Auth;

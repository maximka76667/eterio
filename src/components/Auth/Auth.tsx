import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Auth = ({
  signInWithLink,
}: {
  signInWithLink: (email: string, magicLink: string) => void;
}) => {
  const { email, link } = useParams<{ email: string; link: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== undefined && link !== undefined) {
      signInWithLink(email, link);
      navigate('/');
    }
  }, []);

  return (
    <div>
      {email} {link}
    </div>
  );
};

export default Auth;

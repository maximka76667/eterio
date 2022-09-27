import React from 'react';
import { useParams } from 'react-router-dom';

const Auth = ({
  signInWithLink,
}: {
  signInWithLink: (email: string, magicLink: string) => Promise<void>;
}) => {
  const params = useParams();

  return (
    <div>
      {params.email} {params.link}
    </div>
  );
};

export default Auth;

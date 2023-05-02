import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts';
import UserUpdate from '../../interfaces/UserUpdate';

interface EditUserProps {
  onUserUpdate: (newUser: UserUpdate) => Promise<void>;
}

const EditUser = ({ onUserUpdate }: EditUserProps) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function setUserData() {
    if (currentUser === null) {
      return;
    }

    setName(currentUser.name);
    setEmail(currentUser.email);
  }

  function handleSubmit() {
    const newUser: UserUpdate = { name, email };

    onUserUpdate(newUser).catch(() => {
      setUserData();
    });
  }

  useEffect(() => {
    setUserData();
  }, [currentUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type='submit'>Update</button>
      </form>
    </div>
  );
};

export default EditUser;

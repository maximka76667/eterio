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
  const [avatar, setAvatar] = useState('');

  function setUserData() {
    if (currentUser === null) {
      return;
    }

    setName(currentUser.name);
    setEmail(currentUser.email);
    setAvatar(currentUser.avatar);
  }

  function handleSubmit() {
    const newUser: UserUpdate = { name, email, avatar };

    // Catch serves for a case when new user data is not valid
    onUserUpdate(newUser).catch(() => {
      setUserData();
    });
  }

  useEffect(() => {
    setUserData();
  }, [currentUser]);

  return (
    <div>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <h2 className='text-5xl ff-montse mb-10'>Edit user</h2>

        <input
          className='w-2/3 border-solid border-2 border-emerald-600 p-2 rounded'
          type='text'
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />

        <img
          className='rounded-xl w-[250px] h-[250px] object-cover mt-4'
          src={avatar}
          alt='Avatar'
        />

        <input
          className='mt-4 border-solid border-2 border-emerald-600 p-2 rounded'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className='mt-4 border-solid border-2 border-emerald-600 p-2 rounded'
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button
          className='bg-emerald-500 py-1.5 px-3 mt-4 rounded text-white'
          type='submit'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;

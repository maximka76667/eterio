import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useState
} from 'react';
import { CurrentUserContext, LoadingContext } from '../../contexts';
import { UserUpdate } from '../../interfaces';
import './EditUser.sass';

import fountain from '../../images/fountain.svg';

interface EditUserProps {
  onUserUpdate: (newUser: UserUpdate) => Promise<void>;
}

const EditUser = ({ onUserUpdate }: EditUserProps) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const isLoading = useContext(LoadingContext);

  function setUserData() {
    if (currentUser === null) {
      return;
    }

    setName(currentUser.name);
    setEmail(currentUser.email);
    setAvatar(currentUser.avatar);
  }

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newUser: UserUpdate = { name, email, avatar };

    // Catch serves for a case when new user data is not valid
    onUserUpdate(newUser).catch(() => {
      setUserData();
    });
  };

  useEffect(() => {
    setUserData();
  }, [currentUser]);

  return (
    <div>
      <form className='flex flex-col items-center'>
        <h2 className='text-5xl ff-montse mb-10'>Edit user</h2>

        <input
          className='edit-user__input w-2/3 border-solid border-2 p-2 rounded'
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
          className='edit-user__input mt-4 border-solid border-2 p-2 rounded'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className='edit-user__input mt-4 border-solid border-2 p-2 rounded'
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button
          className='edit-user__submit-button py-2.5 px-5 mt-4 rounded text-white'
          type='submit'
          onClick={handleSubmit}
        >
          {isLoading ? (
            <img className='edit-user__submit-img' src={fountain} />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  );
};

export default EditUser;

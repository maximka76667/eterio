import React, {
  useContext,
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler
} from 'react';
import './AddDrink.sass';

import {
  CategoriesContext,
  CurrentUserContext,
  DrinksContext,
  LoadingContext
} from '../../contexts';
import ListViewer from '../../components/ListViewer/ListViewer';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import { DrinkCreate, GlassContent } from '../../interfaces';
import { NavLink } from 'react-router-dom';
import GlassEditor from '../../components/GlassEditor/GlassEditor';

import fountain from '../../images/fountain.gif';

interface AddDrinkProps {
  onCreateDrink: (drinkCreate: DrinkCreate) => void;
}

const AddDrink = ({ onCreateDrink }: AddDrinkProps) => {
  // Contexts
  const drinks = useContext(DrinksContext);
  const communityDrinks = useContext(CommunityDrinksContext);
  const currentUser = useContext(CurrentUserContext);
  const categories = useContext(CategoriesContext);

  // Form fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [img, setImg] = useState('');
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>(
    {}
  );
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('Collins');

  // Code validation
  const [isCodeOccupied, setIsCodeOccupied] = useState(false);

  const isLoading = useContext(LoadingContext);

  function checkIsCodeOccupied() {
    let result = false;

    // I use two arrays because lengths of drinks and communityDrinks are different
    drinks.forEach((drink) => {
      if (drink.code === code) {
        return (result = true);
      }
    });

    communityDrinks.forEach((drink) => {
      if (drink.code === code) {
        return (result = true);
      }
    });

    return result;
  }

  useEffect(() => {
    setIsCodeOccupied(checkIsCodeOccupied());
  }, [code]);
  // --- Code validation

  function updateExtras(newExtras: string[]) {
    setExtra(newExtras);
  }

  // Form submit
  const publishDrink: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (currentUser === null) {
      return;
    }

    const newDrink: DrinkCreate = {
      name,
      description,
      code,
      is_community: true,
      img,
      ingredients: glassContent,
      author: currentUser.id,
      extra,
      favorites: [],
      date: new Date(),
      category
    };

    onCreateDrink(newDrink);
  };
  // --- Form submit

  const handleGlassContentChange = (glassContent: GlassContent) => {
    setGlassContent(glassContent);
  };

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setCategory('');
  };

  return (
    <>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div>
              <div className='flex justify-between'>
                <h2 className='add-drink__title text-9xl font-semibold ff-montse text-emerald-500 my-12 text-right'>
                  New drink
                </h2>
              </div>
            </div>

            <h3 className='mt-6 drink__subheading ff-amatic text-4xl font-bold'>
              Info
            </h3>

            <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='drinkName'
                  className='block font-medium leading-6 text-grey-800'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='drinkName'
                      id='drinkName'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='e.g. Rum & Coke'
                      value={name}
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <p className='pt-1 text-sm' style={{ height: '1lh' }}></p>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='drinkCode'
                  className='block font-medium leading-6 text-gray-900'
                >
                  Unique code
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='drinkCode'
                      id='drinkCode'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='e.g. rumncoke'
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                    />
                  </div>
                  <p className='add-drink_error pt-1 text-sm'>
                    {isCodeOccupied && 'Code is ocuppied'}
                  </p>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='description'
                  className='block font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    id='description'
                    name='description'
                    rows={3}
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder='Write a few sentences about drink'
                  ></textarea>
                </div>
              </div>

              <div className='sm:col-span-6'>
                <label
                  htmlFor='img'
                  className='block font-medium leading-6 text-gray-900'
                >
                  Image
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg'>
                    <input
                      type='text'
                      name='img'
                      id='img'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='Image link'
                      value={img}
                      onChange={(event) => setImg(event.target.value)}
                    />
                  </div>
                </div>
                <img
                  className='w-full mt-8 h-[600px]'
                  style={{
                    objectFit: 'cover',
                    borderRadius: '30px'
                  }}
                  src={img}
                  alt=''
                />
              </div>
            </div>
          </div>

          <h3 className='mt-6 drink__subheading ff-amatic text-4xl font-bold'>
            Proportions
          </h3>
          <GlassEditor
            glassContent={glassContent}
            onGlassContentChange={handleGlassContentChange}
            localStorageItemName='add-drink-content'
          />

          {/* Extras */}
          <h3 className='mt-6 drink__subheading ff-amatic text-4xl font-bold'>
            Extra Ingredients
          </h3>
          <ListViewer onUpdate={updateExtras} />
          {/* / Extras */}
          <h3 className='mt-6 drink__subheading ff-amatic text-4xl font-bold'>
            Category
          </h3>

          <div>
            <select
              className='text-xl'
              name='category'
              id='category'
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='add-drink__form-buttons'>
            <button
              onClick={publishDrink}
              className='add-drink__submit bg-emerald-500 py-2 px-3 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200'
              type='submit'
              disabled={name === '' || code === '' || isCodeOccupied}
            >
              {isLoading ? (
                <img className='submit-img' src={fountain} />
              ) : (
                'Publish'
              )}
            </button>
            <NavLink to='../' className='add-drink__cancel'>
              Cancel
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddDrink;

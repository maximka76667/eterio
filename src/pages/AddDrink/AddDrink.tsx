import React, {
  useContext,
  useState,
  useEffect,
  FocusEventHandler,
  ChangeEventHandler,
  MouseEventHandler
} from 'react';
import './AddDrink.sass';

import {
  BottlesContext,
  CategoriesContext,
  CurrentUserContext,
  DrinksContext
} from '../../contexts';
import { Bottle } from '../../components';
import ListViewer from '../../components/ListViewer/ListViewer';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import { DrinkCreate } from '../../interfaces';
import { NavLink, useNavigate } from 'react-router-dom';

interface AddDrinkProps {
  onCreateDrink: (drinkCreate: DrinkCreate) => void;
}

const AddDrink = ({ onCreateDrink }: AddDrinkProps) => {
  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);
  const categories = useContext(CategoriesContext);

  const [isPouring, setIsPouring] = useState(false);
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>(
    {}
  );

  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkCode, setCurrentDrinkCode] = useState('');

  const [ingredientCount, setIngredientCount] = useState<number>(0);

  // Form validaton
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState<string[]>([]);

  const drinks = useContext(DrinksContext);
  const communityDrinks = useContext(CommunityDrinksContext);
  const bottles = useContext(BottlesContext);

  const [category, setCategory] = useState('');

  const [isCodeOccupied, setIsCodeOccupied] = useState(false);

  function pourDrink() {
    setIsPouring(true);
  }

  function unpourDrink() {
    setIsPouring(false);
  }

  const changeDrink = (drink: string) => {
    setCurrentDrink(drink);
  };

  function formatDrinkName(drink: string) {
    return drink.replaceAll(' ', '-');
  }

  function showInput() {
    setIsSearchListOpen(true);
  }

  const handleSearchBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.relatedTarget == null) {
      hideInput();
    }
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  function handleInputClick() {
    setSearchValue('');
    showInput();
  }

  const handleBottleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    hideInput();
  };

  function hideInput() {
    setIsSearchListOpen(false);
  }

  function removeIngredient(bottleName: string) {
    const { [bottleName]: _, ...newGlassContent } = glassContent;

    setGlassContent(newGlassContent);
  }

  function checkIsCodeOccupied() {
    let result = false;

    // I use two arrays because lengths of drinks and communityDrinks are different
    drinks.forEach((drink) => {
      console.log(drink.code);
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

  function updateExtras(newExtras: string[]) {
    setExtra(newExtras);
  }

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
      category
    };

    onCreateDrink(newDrink);
    navigate('../');
  };

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (currentDrink !== '' && isPouring && ingredientCount < 1000) {
      bulking = setInterval(() => {
        const initValue = glassContent[currentDrink] ?? 0;
        setGlassContent({
          ...glassContent,
          [currentDrink]: initValue + 10
        });
      }, 100);
    }

    console.log(glassContent);

    return () => clearInterval(bulking);
  }, [isPouring, glassContent, ingredientCount, currentDrink]);

  useEffect(() => {
    let sum = 0;
    for (const key in glassContent) sum += glassContent[key];

    setIngredientCount(Math.floor(sum * 100) / 100);
  }, [glassContent, ingredientCount]);

  useEffect(() => {
    setCurrentDrinkCode(formatDrinkName(currentDrink));
    setSearchValue(currentDrink);
  }, [currentDrink]);

  useEffect(() => {
    if (!isSearchListOpen && searchValue === '') setSearchValue(currentDrink);
  }, [isSearchListOpen, searchValue, currentDrink]);

  useEffect(() => {
    setIsCodeOccupied(checkIsCodeOccupied());
  }, [code]);

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    console.log(event);
    setCategory('');
  };

  return (
    <>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div>
              <div className='flex justify-between'>
                <h2 className='add-drink__title-smile text-9xl font-semibold ff-montse text-emerald-500 my-12 text-right'>
                  ( ͡° ͜ʖ ͡°)
                </h2>
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

          {/* Glass */}
          <div style={{ widows: '100%', position: 'relative' }}>
            <div className='home__glass glass'>
              {Object.keys(glassContent).map((bottleName) => (
                <div
                  className={`glass__ingredient ${formatDrinkName(bottleName)}`}
                  key={bottleName}
                  style={{ height: `${glassContent[bottleName] * 0.1}%` }}
                  onClick={() => removeIngredient(bottleName)}
                ></div>
              ))}
            </div>
            <button
              className='home__current-drink'
              style={{ top: '-12rem', left: '48%' }}
              data-type={currentDrinkCode}
              onMouseDown={pourDrink}
              onMouseUp={unpourDrink}
              onMouseLeave={unpourDrink}
              type='button'
            >
              <div
                className={`home__drink bottle_${currentDrinkCode} ${
                  isPouring ? 'home__drink_pouring' : ''
                }`}
              ></div>
            </button>
            <div className='home__search-container' onBlur={handleSearchBlur}>
              <input
                className='home__search ff-montse'
                type='text'
                value={searchValue}
                onChange={handleSearch}
                onFocus={handleInputClick}
              />
              <ul
                className={`home__search-list ${
                  isSearchListOpen ? 'home__search-list_active' : ''
                }`}
              >
                {bottles
                  .filter((bottle) =>
                    bottle.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((bottle) => (
                    <li key={bottle} className='home__search-item'>
                      <Bottle
                        bottle={bottle}
                        changeDrink={changeDrink}
                        onClick={handleBottleClick}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {/* Glass */}

          {/* Extras */}
          <h3 className='mt-6 drink__subheading ff-amatic text-4xl font-bold'>
            Extra Ingredients
          </h3>
          <ListViewer onUpdate={updateExtras} />
          {/* / Extras */}
          <select name='category' id='category' onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
          <div className='add-drink__form-buttons'>
            <button
              onClick={publishDrink}
              className='add-drink__submit bg-emerald-500 py-2 px-3 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200'
              type='submit'
              disabled={name === '' || code === ''}
            >
              Publish
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

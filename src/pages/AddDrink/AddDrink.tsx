import React, {
  useContext,
  useState,
  useEffect,
  FocusEventHandler,
  ChangeEventHandler,
  MouseEventHandler
} from 'react';
import './AddDrink.sass';

import { BottlesContext } from '../../contexts';
import { Bottle } from '../../components';
import ListViewer from '../../components/ListViewer/ListViewer';

const AddDrink = () => {
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

  const bottles = useContext(BottlesContext);

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

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (currentDrink !== '' && isPouring && ingredientCount <= 10) {
      bulking = setInterval(() => {
        const initValue = glassContent[currentDrink] ?? 0;
        setGlassContent({
          ...glassContent,
          [currentDrink]: Math.floor((initValue + 0.1) * 100) / 100
        });
      }, 100);
    }
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

  return (
    <>
      <form>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              This inhtmlFormation will be displayed publicly so be careful what
              you share.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='drinkName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='drinkName'
                      id='drinkName'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='e.g. Rum & Coke'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='drinkCode'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Unique code
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='drinkCode'
                      id='drinkCode'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='e.g. rumncoke'
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                    />
                  </div>
                  <p style={{ height: '1lh' }}></p>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='img'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Image
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
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
                  style={{ width: '200px', height: '200px' }}
                  src=''
                  alt=''
                />
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
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
            </div>
          </div>
          <div style={{ widows: '100%', position: 'relative' }}>
            <div className='home__glass glass'>
              {Object.keys(glassContent).map((bottleName) => (
                <div
                  className={`glass__ingredient ${formatDrinkName(bottleName)}`}
                  key={bottleName}
                  style={{ height: `${glassContent[bottleName] * 10}%` }}
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
            >
              <div
                className={`home__drink bottle_${currentDrinkCode} ${
                  isPouring ? 'home__drink_pouring' : ''
                }`}
              ></div>
            </button>
            <div className='home__search-container' onBlur={handleSearchBlur}>
              <input
                className='home__search'
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
          <ListViewer />
          <div className='add-drink__form-buttons'>
            <button className='add-drink__submit'>Publish</button>
            <button className='add-drink__cancel'>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddDrink;

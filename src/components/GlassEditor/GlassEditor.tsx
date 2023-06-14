import React, {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState
} from 'react';
import './GlassEditor.sass';

import { BottlesContext } from '../../contexts';
import Bottle from '../Bottle/Bottle';
import { Bottle as IBottle, GlassContent } from '../../interfaces';

interface GlassEditorProps {
  glassContent: GlassContent;
  onGlassContentChange: (newGlassContent: GlassContent) => void;
  localStorageItemName: string;
}

const GlassEditor = ({
  glassContent,
  onGlassContentChange,
  localStorageItemName
}: GlassEditorProps) => {
  // Contexts
  const bottles = useContext(BottlesContext);

  const [ingredientCount, setIngredientCount] = useState<number>(0);

  // Pouring proccess
  const [isPouring, setIsPouring] = useState(false);
  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkCode, setCurrentDrinkCode] = useState('');
  const [currentDrinkImg, setCurrentDrinkImg] = useState('');

  function pourDrink() {
    setIsPouring(true);
  }

  function unpourDrink() {
    setIsPouring(false);
  }

  useEffect(() => {
    let bulking: NodeJS.Timer;

    if (currentDrink !== '' && isPouring && ingredientCount < 1000) {
      bulking = setInterval(() => {
        const initValue = glassContent[currentDrink] ?? 0;

        onGlassContentChange({
          ...glassContent,
          [currentDrink]: initValue + 10
        });
      }, 100);
    }

    return () => clearInterval(bulking);
  }, [isPouring, glassContent, ingredientCount, currentDrink]);
  // --- Pouring proccess

  // Bottles search
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.relatedTarget == null) {
      hideInput();
    }
  };

  const changeBottle = (bottle: IBottle) => {
    setCurrentDrink(bottle.name.toLowerCase());
    setCurrentDrinkImg(bottle.img);
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

  function showInput() {
    setIsSearchListOpen(true);
  }

  function hideInput() {
    setIsSearchListOpen(false);
  }

  useEffect(() => {
    const cachedGlassContent = localStorage.getItem(localStorageItemName);

    if (cachedGlassContent === null) {
      return;
    }

    onGlassContentChange(JSON.parse(cachedGlassContent));
  }, []);

  useEffect(() => {
    if (!isSearchListOpen && searchValue === '') setSearchValue(currentDrink);
  }, [isSearchListOpen, searchValue, currentDrink]);

  useEffect(() => {
    setCurrentDrinkCode(formatDrinkName(currentDrink));
    setSearchValue(currentDrink);
  }, [currentDrink]);
  // --- Bottles search

  function removeIngredient(bottleName: string) {
    const { [bottleName]: _, ...newGlassContent } = glassContent;

    onGlassContentChange(newGlassContent);
  }

  function formatDrinkName(drink: string) {
    return drink.toLowerCase().replaceAll(' ', '-');
  }

  useEffect(() => {
    let sum = 0;
    for (const key in glassContent) sum += glassContent[key];

    setIngredientCount(Math.floor(sum * 100) / 100);

    localStorage.setItem(localStorageItemName, JSON.stringify(glassContent));
  }, [glassContent, ingredientCount]);

  return (
    <div style={{ widows: '100%', position: 'relative' }}>
      <div className='glass-editor__glass glass'>
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
        className='glass-editor__current-drink w-[250px]'
        style={{ top: '-12rem', left: '48%' }}
        data-type={currentDrinkCode}
        onMouseDown={pourDrink}
        onMouseUp={unpourDrink}
        onMouseLeave={unpourDrink}
        onTouchStart={pourDrink}
        onTouchEnd={unpourDrink}
        type='button'
      >
        {currentDrinkImg !== '' && (
          <img
            className={`glass-editor__drink ${
              isPouring ? 'glass-editor__drink_pouring' : ''
            }`}
            src={`${process.env.PUBLIC_URL}/images/${currentDrinkImg}`}
            onError={() => setCurrentDrinkImg('bottle-not-found.png')}
          />
        )}
      </button>
      <div className='glass-editor__search-container' onBlur={handleSearchBlur}>
        <input
          className='glass-editor__search ff-montse'
          type='text'
          value={searchValue}
          onChange={handleSearch}
          onFocus={handleInputClick}
        />
        <ul
          className={`glass-editor__search-list ${
            isSearchListOpen ? 'glass-editor__search-list_active' : ''
          }`}
        >
          {bottles
            .filter((bottle) =>
              bottle.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((bottle) => (
              <li key={bottle.id} className='glass-editor__search-item'>
                <Bottle
                  bottle={bottle}
                  changeDrink={changeBottle}
                  onClick={handleBottleClick}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GlassEditor;

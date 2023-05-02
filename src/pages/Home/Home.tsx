import React, {
  MouseEventHandler,
  FocusEventHandler,
  ChangeEventHandler,
  useContext,
  useEffect,
  useState
} from 'react';
import DrinksContext from '../../contexts/DrinksContext';
import HomeProps from './HomeProps';
import Drink from '../../interfaces/Drink';
import Bottle from '../../components/Bottle/Bottle';
import Match from '../../components/Match/Match';
import './Home.sass';
import BottlesContext from '../../contexts/BottlesContext';

// Component of the home page
const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps): JSX.Element => {
  const drinks = useContext(DrinksContext);

  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);

  const [isPouring, setIsPouring] = useState(false);
  const [glassContent, setGlassContent] = useState<{ [key: string]: number }>(
    {}
  );

  const [currentDrink, setCurrentDrink] = useState('');
  const [currentDrinkCode, setCurrentDrinkCode] = useState('');

  const [ingredientCount, setIngredientCount] = useState<number>(0);

  const [matches, setMatches] = useState<
    Array<{ drink: Drink; match: number }>
  >([]);

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

  function searchMatches() {
    setMatches([]);
    for (const drink of drinks) {
      const drinkMatch =
        Math.floor(compareComposition(drink.ingredients, glassContent) * 10) /
        10;

      if (drinkMatch > 0) {
        setMatches((matches) => [...matches, { drink, match: drinkMatch }]);
      }
    }
    setMatches((matches) => matches.sort((a, b) => b.match - a.match));
    setIsSubmittedOnce(true);
  }

  function compareComposition(
    drink1: { [key: string]: number },
    drink2: { [key: string]: number }
  ) {
    let result = 0;
    for (const ingr in drink1) {
      if (drink2[ingr] !== undefined) {
        result +=
          ((drink1[ingr] < drink2[ingr] ? drink1[ingr] : drink2[ingr]) / 6.5) *
          100;
      }
    }
    return result;
  }

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
    <div className='home'>
      {/* <h1 className='home__title'>
        Welcome to <span className='home__name'>Alcopedia</span>
      </h1>
      <p className='home__text'>
        Here you can find ingredients and proportions for cocktails&apos;
        preparing
      </p>
      <button
        className={`home__sidebar-button ${
          !isSidebarOpened ? 'home__sidebar-button_animated' : ''
        }`}
        onClick={toggleSidebar}
      >
        Search for a drink
      </button> */}

      <div className='home__glass glass'>
        {Object.keys(glassContent).map((key) => (
          <div
            className={`glass__ingredient ${formatDrinkName(key)}`}
            key={key}
            style={{ height: `${glassContent[key] * 10}%` }}
          ></div>
        ))}
      </div>
      <button
        className='home__current-drink'
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
      <button className='home__matches-button' onClick={searchMatches}>
        Find matches
      </button>
      <div className='matches'>
        {isSubmittedOnce ? (
          matches.length !== 0 ? (
            matches.map((match) => <Match key={match.drink.id} match={match} />)
          ) : (
            <p className='matches__not-found'>Nothing is found</p>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Home;

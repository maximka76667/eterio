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
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';

type IMatch = Array<{
  drink: Drink;
  match: number;
}>;

// Component of the home page
const Home = ({ toggleSidebar, isSidebarOpened }: HomeProps): JSX.Element => {
  const drinks = useContext(DrinksContext);
  const communityDrinks = useContext(CommunityDrinksContext);

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

  const [matches, setMatches] = useState<IMatch>([]);
  const [communityMatches, setCommunityMatches] = useState<IMatch>([]);

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
    setCommunityMatches([]);

    for (const drink of drinks) {
      const drinkMatch =
        Math.floor(compareComposition(drink.ingredients, glassContent) * 10) /
        10;

      if (drinkMatch > 0) {
        setMatches((matches) => [...matches, { drink, match: drinkMatch }]);
      }
    }

    for (const communityDrink of communityDrinks) {
      const drinkMatch =
        Math.floor(
          compareComposition(communityDrink.ingredients, glassContent) * 10
        ) / 10;

      if (drinkMatch > 0) {
        setCommunityMatches((matches) => [
          ...matches,
          { drink: communityDrink, match: drinkMatch }
        ]);
      }
    }

    setMatches((matches) => matches.sort((a, b) => b.match - a.match));
    setCommunityMatches((matches) => matches.sort((a, b) => b.match - a.match));
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
    <div className='home'>
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
        {isSubmittedOnce &&
          (matches.length !== 0 ? (
            matches.map((match) => <Match key={match.drink.id} match={match} />)
          ) : (
            <p className='matches__not-found'>Nothing is found</p>
          ))}
        {isSubmittedOnce && (
          <>
            <h2>Search on community drinks</h2>
            {communityMatches.length !== 0 ? (
              communityMatches.map((match) => (
                <Match key={match.drink.id} match={match} />
              ))
            ) : (
              <p className='matches__not-found'>Nothing is found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

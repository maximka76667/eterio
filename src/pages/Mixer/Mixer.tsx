import React, { useContext, useEffect, useState } from 'react';
import Drink from '../../interfaces/Drink';
import Match from '../../components/Match/Match';

import './Mixer.sass';

import DrinksContext from '../../contexts/DrinksContext';
import CommunityDrinksContext from '../../contexts/CommunityDrinksContext';
import GlassEditor from '../../components/GlassEditor/GlassEditor';
import { GlassContent } from '../../interfaces';

type IMatch = Array<{
  drink: Drink;
  match: number;
}>;

// Component of the home page
const Mixer = () => {
  const drinks = useContext(DrinksContext);
  const communityDrinks = useContext(CommunityDrinksContext);

  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);

  const [glassContent, setGlassContent] = useState<GlassContent>({});

  const [matches, setMatches] = useState<IMatch>([]);
  const [communityMatches, setCommunityMatches] = useState<IMatch>([]);

  function calculateMatch(drink: Drink) {
    return (
      Math.floor(compareComposition(drink.ingredients, glassContent) * 10) / 10
    );
  }

  function searchMatches() {
    setMatches([]);
    setCommunityMatches([]);

    for (const drink of drinks) {
      const match = calculateMatch(drink);

      if (match > 0) {
        setMatches((matches) => [...matches, { drink, match }]);
      }
    }

    for (const communityDrink of communityDrinks) {
      const match = calculateMatch(communityDrink);

      if (match > 0) {
        setCommunityMatches((matches) => [
          ...matches,
          {
            drink: {
              ...communityDrink,
              code: `community/${communityDrink.code}`
            },
            match
          }
        ]);
      }
    }

    setMatches((matches) => matches.sort((a, b) => b.match - a.match));
    setCommunityMatches((matches) => matches.sort((a, b) => b.match - a.match));
    setIsSubmittedOnce(true);
  }

  function compareComposition(drink1: GlassContent, drink2: GlassContent) {
    let result = 0;
    for (const ingr in drink1) {
      if (drink2[ingr] !== undefined) {
        result +=
          (drink1[ingr] < drink2[ingr] ? drink1[ingr] : drink2[ingr]) / 6.5;
      }
    }
    return result;
  }

  useEffect(() => {
    const localMatches = localStorage.getItem('matches');

    if (localMatches === null) {
      return;
    }

    const { matches, communityMatches } = JSON.parse(localMatches);

    setMatches(matches);
    setCommunityMatches(communityMatches);
    setIsSubmittedOnce(true);
  }, []);

  useEffect(() => {
    // Store matches in localStorage
    localStorage.setItem(
      'matches',
      JSON.stringify({ matches, communityMatches })
    );
  }, [matches, communityMatches]);

  return (
    <div className='mixer'>
      <h1 className='text-7xl ff-montse mixer__title'>Put some drinks!</h1>
      <div className='relative'>
        <GlassEditor
          glassContent={glassContent}
          onGlassContentChange={(newGlassContent) =>
            setGlassContent(newGlassContent)
          }
          localStorageItemName='mixer-content'
        />
      </div>

      <button className='mixer__matches-button' onClick={searchMatches}>
        Find matches
      </button>
      <div className='matches'>
        {isSubmittedOnce &&
          (matches.length !== 0 ? (
            matches.map((match) => <Match key={match.drink.id} match={match} />)
          ) : (
            <p className='matches__not-found ff-montse'>Nothing is found</p>
          ))}
        {isSubmittedOnce && (
          <>
            <h2 className='text-xl font-bold ff-montse'>
              Search on community drinks
            </h2>
            {communityMatches.length !== 0 ? (
              communityMatches.map((match) => (
                <Match key={match.drink.id} match={match} />
              ))
            ) : (
              <p className='matches__not-found ff-montse'>Nothing is found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Mixer;

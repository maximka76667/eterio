import React from 'react';
import { Link } from 'react-router-dom';
import MatchProps from './MatchProps';
import './Match.sass';

const Match = ({ match: { drink, match } }: MatchProps) => {
  return (
    <Link to={drink.code} className='match'>
      <div
        style={{ backgroundImage: `url(${drink.img})` }}
        className='match__drink-img'
      ></div>
      <div className='match__drink-info'>
        <p className='match__drink-name'>{drink.name}</p>
        <p className='match__drink-description'>{drink.description}</p>
      </div>
      <p className='match__percent'>{match}%</p>
    </Link>
  );
};

export default Match;

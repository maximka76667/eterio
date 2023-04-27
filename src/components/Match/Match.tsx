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
      <div className='match__drink-info py-7 px-2'>
        <h2 className='match__drink-name text-6xl ff-amatic mb-3'>
          {drink.name}
        </h2>
        <p className='match__drink-description ff-montse'>
          {drink.description}
        </p>
      </div>
      <p className='match__percent text-9xl ff-amatic'>{match}%</p>
    </Link>
  );
};

export default Match;

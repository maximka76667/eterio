import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MatchProps from './MatchProps';
import './Match.sass';

import imageNotFound from '../../images/image-not-found.jpg';

const Match = ({ match: { drink, match } }: MatchProps) => {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = drink.img;

    img.onload = () => {
      setIsValidImage(true);
    };
  }, [drink.img]);

  return (
    <Link to={`/${drink.code}`} className='match flex-col xl:flex-row w-full'>
      <div
        style={{
          backgroundImage: `url(${isValidImage ? drink.img : imageNotFound})`
        }}
        className='match__drink-img min-w-[100px] lg:min-w-[300px]'
      ></div>
      <div className='match__drink-info py-7 px-2'>
        <h2 className='match__drink-name text-6xl ff-amatic mb-3'>
          {drink.name}
        </h2>
        <p className='match__drink-description ff-montse'>
          {drink.description !== ''
            ? drink.description
            : 'There is no description...'}
        </p>
      </div>
      <p className='match__percent text-9xl ff-amatic'>{match}%</p>
    </Link>
  );
};

export default Match;

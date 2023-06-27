import React from 'react';
import './FavoritesStar.sass';

import { ReactComponent as StarIcon } from '../../images/star-2.svg';

const FavoritesStar = () => {
  return (
    <div className='favorites-star'>
      <StarIcon />
    </div>
  );
};

export default FavoritesStar;

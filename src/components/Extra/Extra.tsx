import React from 'react';
import './Extra.sass';

const Extra = ({ extra }: { extra: string }) => {
  return <div className={`extra extra_${extra}`} />;
};

export default Extra;

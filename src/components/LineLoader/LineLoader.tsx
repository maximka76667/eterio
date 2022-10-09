import React from 'react';

const LineLoader = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        margin: 'auto',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width='100%'
      height='100%'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <rect x='17.5' y='28.5' width='15' height='43' fill='#39b37b'>
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='15.600000000000001;28.5;28.5'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.1941747572815534s'
        ></animate>
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='68.8;43;43'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.1941747572815534s'
        ></animate>
      </rect>
      <rect x='42.5' y='28.5' width='15' height='43' fill='#39b37b'>
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='18.824999999999996;28.5;28.5'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.0970873786407767s'
        ></animate>
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='62.35000000000001;43;43'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.0970873786407767s'
        ></animate>
      </rect>
      <rect x='67.5' y='28.5' width='15' height='43' fill='#39b37b'>
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='18.824999999999996;28.5;28.5'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
        ></animate>
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='0.970873786407767s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='62.35000000000001;43;43'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
        ></animate>
      </rect>
    </svg>
  );
};

export default LineLoader;

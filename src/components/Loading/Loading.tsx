import React from 'react';
import './Loading.sass';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.15
    }
  },
  end: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: '0%'
  },
  end: {
    y: '60%'
  }
};

const loadingCircleTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut'
};

const Loading = () => {
  return (
    <div className='loading'>
      <motion.div
        className='loading__container'
        variants={loadingContainerVariants}
        initial='start'
        animate='end'
      >
        <motion.span
          className='loading__circle'
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className='loading__circle'
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className='loading__circle'
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
    </div>
  );
};

export default Loading;

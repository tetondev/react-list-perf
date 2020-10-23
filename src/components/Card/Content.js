import React from 'react';
import './card.css';

const Content = ({ children }) => {
  return (
    <div className='cardContent'>
      {children}
    </div>
  );
};

export default Content;
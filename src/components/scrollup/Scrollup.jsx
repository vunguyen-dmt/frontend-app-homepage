import React, { useState, useEffect } from 'react';
import { ArrowForwardIos } from '@openedx/paragon/icons';
import './Scrollup.scss';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop  >= 1000) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!showButton) return null;

  return (
    <button 
      onClick={scrollToTop}
      className='scrollup-btn'
    >
      <ArrowForwardIos />
    </button>
  );
};

export default ScrollToTopButton;

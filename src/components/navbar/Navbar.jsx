"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

const logo = "/logo_dark.png";

const Navbar = ({ theme, toggleTheme }) => {
  const [activeMenu, setActiveItem] = useState('Home');
  const [isScrolling, setIsScrolling] = useState(false);
  const menuRef = useRef();

  //Open and Close Menu
  const openMenu = () => {
    menuRef.current.style.left="0px";
  }
  const closeMenu = () => {
    menuRef.current.style.left="-400px";
  }

  // Scroll settings
  const scrollDuration = 1000; // ms
  const intersectionThreshold = 0.3; // 30% visibility required
  const navbarHeight = 80; // px
  const scrollOffset = 50; // px

  // Debounce function for scroll events
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const menuItems = [
    { name: 'Home', href: '#profile' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleIntersection = useCallback(
    debounce((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
          setActiveItem(sectionName);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 300);
        }
      });
    }, 100),
    []
  );

  useEffect(() => {
    const options = {
      threshold: intersectionThreshold,
      rootMargin: `-${navbarHeight}px 0px 0px 0px`
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    menuItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    // Cleanup
    return () => {
      menuItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) observer.unobserve(section);
      });
    };
  }, [handleIntersection]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      
      const progressBar = document.querySelector('.scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress"></div>
      </div>
      <div id="nav-bar" className={`nav-bar ${isScrolling ? 'is-scrolling' : ''}`}>
        <AnchorLink className='anchor-link' href='#profile' ><img src={logo} alt="" /></AnchorLink>
        <FontAwesomeIcon className='mobile-nav-icon-open' onClick={openMenu} icon={faBars} size='2x'/>
        <ul className="nav-menu" ref={menuRef} >
        <FontAwesomeIcon className='mobile-nav-icon-close' onClick={closeMenu} icon={faXmark} size='2x'/>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`
                nav-item 
                ${activeMenu === item.name ? 'active' : ''}
                ${isScrolling ? 'scrolling' : ''}
              `}
            >
              <AnchorLink 
                href={item.href} 
                offset={scrollOffset} 
                className="anchor-link"
                onClick={() => {
                  setActiveItem(item.name);
                  setIsScrolling(true);
                  setTimeout(() => setIsScrolling(false), scrollDuration);
                }}
                duration={scrollDuration}
              >
                {item.name}
              </AnchorLink>
            </li>
          ))}
        </ul>
        <button className="nav-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
        {theme === 'dark' ? (
            <Sun size={28} className="theme-icon" />
          ) : (
            <Moon size={28} className="theme-icon" />
          )}
        </button>
      </div>
    </>
  );
};

export default Navbar;
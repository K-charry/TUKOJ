import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import logo from './signature.png';
import './header.css';
import { Link } from 'react-router-dom';

const Headerbar = () => {
  // 메뉴버튼
  const [showLinks, setShowLinks] = useState(false);
  const [showSocial, setShowSocial] = useState(null);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);



  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          {/* 로고 클릭시 "/" 경로로 이동 */}
          <Link to="/">
            <img src={logo} className='logo' alt='logo' />
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        {/* 메뉴버튼 클릭시 목록 보이도록 */}
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {/* data에서 Nav목록 가져오기 */}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social 아이콘 가져오기 */}
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon, text } = socialIcon;
            return (
              <li key={id}>
                <a href={url} onClick={() => setShowSocial((prevShowSocial) => (prevShowSocial === id ? null : id))}>
                  {icon}
                  {showSocial && (
                  <ul className='social-list'>
                    <li className="vertical-buttons">
                      <button>{text}</button>
                    </li >

                  </ul>
                )}
                {/* <button>{text}</button> */}
                </a>
              </li>
  );
  })}
        </ul>

      </div>
    </nav>
  );
};

export default Headerbar;
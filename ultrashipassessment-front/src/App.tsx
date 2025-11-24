import React from 'react';
import logo from './logo.svg';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import MainContent from './components/MainContent';

function App() {
  const menuItems = [
    { label: 'Home', href: '/' },
    { 
      label: 'Services', 
      subItems: [
        { label: 'Web Design', href: '/services/web-design' },
        { label: 'Development', href: '/services/development' },
        { label: 'SEO', href: '/services/seo' },
      ]
    },
    { label: 'About', href: '/about' },
    { 
      label: 'Contact', 
      subItems: [
        { label: 'Email', href: '/contact/email' },
        { label: 'Phone', href: '/contact/phone' },
      ]
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1002 }}>
          <HamburgerMenu items={menuItems} />
          <HorizontalMenu items={menuItems.slice(0, 3)} /> {/* Show first 3 items in horizontal menu */}
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <MainContent />
    </div>
  );
}

export default App;

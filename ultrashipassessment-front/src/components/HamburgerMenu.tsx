import React, { useState } from 'react';
import './HamburgerMenu.css';

export interface MenuItem {
  label: string;
  href?: string;
  subItems?: MenuItem[];
}

interface HamburgerMenuProps {
  items: MenuItem[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveSubMenu(null); // Reset sub-menu when closing/opening main menu
  };

  const toggleSubMenu = (index: number) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(index);
    }
  };

  return (
    <div className="hamburger-menu-container">
      <button className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`menu-nav ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
          {items.map((item, index) => (
            <li key={index} className={`menu-item ${item.subItems ? 'has-submenu' : ''} ${activeSubMenu === index ? 'submenu-active' : ''}`}>
              {item.subItems ? (
                <div className="menu-item-header" onClick={() => toggleSubMenu(index)}>
                  <span>{item.label}</span>
                  <span className="arrow">▼</span>
                </div>
              ) : (
                <a href={item.href || '#'} className="menu-link" onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              )}

              {item.subItems && (
                <ul className={`submenu-list ${activeSubMenu === index ? 'open' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="submenu-item">
                      <a href={subItem.href || '#'} className="submenu-link" onClick={() => setIsOpen(false)}>
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default HamburgerMenu;

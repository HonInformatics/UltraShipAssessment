import React from 'react';
import './HorizontalMenu.css';
import { MenuItem } from './HamburgerMenu';

interface HorizontalMenuProps {
  items: MenuItem[];
}

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ items }) => {
  return (
    <nav className="horizontal-menu">
      <ul className="horizontal-menu-list">
        {items.map((item, index) => (
          <li key={index} className="horizontal-menu-item">
            <a href={item.href || '#'} className="horizontal-menu-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalMenu;

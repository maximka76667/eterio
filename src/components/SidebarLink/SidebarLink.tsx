import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLinkProps from './SidebarLinkProps';
import './SidebarLink.sass';

const SidebarLink = ({
  link: code,
  onListItemClick,
  children,
  extraClass
}: SidebarLinkProps) => {
  return (
    <NavLink
      onClick={onListItemClick}
      className={({ isActive }) =>
        'text-lg sidebar__link py-3 px-3 ' +
        (isActive ? ' sidebar__link_active' : '') +
        ` ${extraClass}`
      }
      to={code}
    >
      {children}
    </NavLink>
  );
};

export default SidebarLink;

import React from 'react';
import { NavLink } from 'react-router-dom';
import NestedSidebarLinkProps from './NestedSidebarLinkProps';
import './NestedSidebarLink.sass';

import { ReactComponent as EditIcon } from '../../images/edit-icon.svg';

const NestedSidebarLink = ({
  link: code,
  onListItemClick,
  children,
  extraClass,
  mainActiveClass,
  secondaryActiveClass
}: NestedSidebarLinkProps) => {
  return (
    <div className='relative'>
      <NavLink
        end
        onClick={onListItemClick}
        className={({ isActive }) =>
          'text-lg sidebar__link ff-montse py-3 px-3 ' +
          (isActive ? ` ${mainActiveClass}` : '') +
          ` ${extraClass}`
        }
        to={code}
      >
        {children}
      </NavLink>
      <NavLink
        to='/me/edit'
        className={({ isActive }) =>
          (isActive ? ` ${secondaryActiveClass}` : '') +
          ' sidebar__link_nested-secondary'
        }
      >
        <EditIcon />
      </NavLink>
    </div>
  );
};

export default NestedSidebarLink;

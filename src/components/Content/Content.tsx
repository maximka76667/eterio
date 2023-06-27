import React from 'react';
import ContentProps from './ContentProps';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import './Content.sass';
import icon from '../../images/logo512.png';

const Content = ({
  windowWidth,
  toggleSidebar,
  closeSidebar,
  onListItemClick,
  isSidebarOpened,
  onToggleFavorite,
  onUserUpdate,
  onOpenLoginPopup,
  onCreateDrink,
  onDeleteDrink
}: ContentProps) => {
  return (
    <div className='content'>
      <button className='content__sidebar-button' onClick={toggleSidebar}>
        <img
          className='content__sidebar-button-img'
          src={icon}
          alt='sidebar icon'
        />
      </button>
      <Sidebar
        isOpened={isSidebarOpened}
        toggleSidebar={toggleSidebar}
        onListItemClick={onListItemClick}
        onToggleFavorite={onToggleFavorite}
      />
      <Main
        isSidebarOpened={isSidebarOpened}
        toggleSidebar={toggleSidebar}
        onUserUpdate={onUserUpdate}
        onListItemClick={onListItemClick}
        onToggleFavorite={onToggleFavorite}
        onOpenLoginPopup={onOpenLoginPopup}
        onCreateDrink={onCreateDrink}
        onDeleteDrink={onDeleteDrink}
      />
    </div>
  );
};

export default Content;

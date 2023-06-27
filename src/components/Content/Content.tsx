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
  isSidebarOpened,
  onToggleFavorite,
  onUserUpdate,
  onOpenLoginPopup,
  onCreateDrink,
  onDeleteDrink
}: ContentProps) => {
  function handleListItemClick() {
    if (windowWidth <= 768) {
      return closeSidebar();
    }
  }

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
        onListItemClick={handleListItemClick}
        onToggleFavorite={onToggleFavorite}
      />
      <Main
        isSidebarOpened={isSidebarOpened}
        toggleSidebar={toggleSidebar}
        onUserUpdate={onUserUpdate}
        onListItemClick={handleListItemClick}
        onToggleFavorite={onToggleFavorite}
        onOpenLoginPopup={onOpenLoginPopup}
        onCreateDrink={onCreateDrink}
        onDeleteDrink={onDeleteDrink}
      />
    </div>
  );
};

export default Content;

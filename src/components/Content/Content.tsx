import React from 'react';
import { ContentProps } from '../../interfaces';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import './Content.sass';
import icon from '../../images/logo512.png';

const Content = ({
  toggleSidebar,
  closeSidebar,
  isSidebarOpened
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
      <Sidebar isOpened={isSidebarOpened} onListItemClick={closeSidebar} />
      <Main isSidebarOpened={isSidebarOpened} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Content;

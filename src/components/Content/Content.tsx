import React, { useState } from 'react'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'
import "./Content.sass"

const Content = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  function handleClick() {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function handleListItemClick() {
    setIsSidebarOpened(false);
  }

  return (
    <div className='content'>
      <button className='content__sidebar-button' onClick={handleClick}>-</button>
      <Sidebar isOpened={isSidebarOpened} onListItemClick={handleListItemClick} />
      <Main />
    </div>
  )
}

export default Content
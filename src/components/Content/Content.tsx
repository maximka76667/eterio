import React from 'react'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'

const Content = () => {
  return (
    <div className='content'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default Content
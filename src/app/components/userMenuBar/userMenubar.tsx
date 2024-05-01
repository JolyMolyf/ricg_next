import React, { useState } from 'react'

import './userMenuBarStyles.scss';

interface IUserMenuBarProps {
  webinars: any;
  lectures: any;
  ebooks: any;
  parentActiveMenuItem: any;
  setParentActiveMenuItem: (item:any) => void
}

const UserMenubar = (props: IUserMenuBarProps) => {
  const { ebooks, webinars, lectures, parentActiveMenuItem, setParentActiveMenuItem } =  props;
  
  const [ activeMenuItem, setActiveMenuItem ] = useState(parentActiveMenuItem);

  const handleActiveMenuItemChange = (menuItem: string) => {
    setActiveMenuItem(menuItem)
    setParentActiveMenuItem(menuItem)
  }
    
  return (
  <div className='userMenubar'>
    <div  className={`userMenubar-item`} onClick={() => { handleActiveMenuItemChange('lecture') }}>
      <img className='userMenubar-item-icon' src='/images/icons/szkolenia_icon.png'/>
      <p className='userMenubar-item-title'>Szkolenia</p>
      <p className='userMenubar-item-count'>{lectures?.length}</p>
      { activeMenuItem === 'lecture' && <div className='userMenubar-item-border'/>}
    </div>
    <div className={`userMenubar-item`} onClick={() => { handleActiveMenuItemChange('ebook') }}>
        <img className='userMenubar-item-icon' src='/images/icons/ebook_icon.png'/>
        <p className='userMenubar-item-title'>E-Booki</p>
        <p className='userMenubar-item-count'>{ebooks?.length}</p>
        { activeMenuItem === 'ebook' && <div className='userMenubar-item-border'/>}
    </div>
    <div  className={`userMenubar-item`} onClick={() => { handleActiveMenuItemChange('webinar') }}>
      <img className='userMenubar-item-icon' src='/images/icons/webianr_icon.png'/>
      <p className='userMenubar-item-title'>Webinary</p>
      <p className='userMenubar-item-count'>{webinars?.length}</p>
      { activeMenuItem === 'webinar' && <div className='userMenubar-item-border'/>}
    </div>
  </div>)
}

export default UserMenubar
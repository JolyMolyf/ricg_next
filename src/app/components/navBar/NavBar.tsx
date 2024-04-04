'use client';
import React, { useState } from 'react'
import './navbarStyles.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


interface INavBarProps {

}

const NavBar = (props: INavBarProps) => {
    
    const [activeMenuItem, setActiveMenuItem] = useState()
    const user = useSelector((state:RootState) => state.auth.user)

    console.log(user)
    return (
    <div className='navbar'>
        <div className='navbar-left'>
            <img  src={"/images/logo/ricg_logo.png"}></img>
        </div>
        <div className='navbar-right'>
            <div className={`navbar-item`}>
                <p className='navbar-item-text'>Home</p>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'>Sklep</p>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'>Kontakt</p>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'> { user?.firstName ? `Welcome, ${user?.firstName}!` : 'Login'}</p> 
            </div>
        </div>
    </div>
    )
}

export default NavBar
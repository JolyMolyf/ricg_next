'use client';
import React, { useState } from 'react'
import './navbarStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { logoutUser } from '@/store/authSlice';


interface INavBarProps {

}

const NavBar = (props: INavBarProps) => {
    
    const [activeMenuItem, setActiveMenuItem] = useState();
    const user = useSelector((state:RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutUser())
    };

    return (
    <div className='navbar'>
        <div className='navbar-left'>
            <img  src={"/images/logo/ricg_logo.png"}></img>
        </div>
        <div className='navbar-right'>
            <div className={`navbar-item`}>
                <Link href={'/'} className='navbar-item-text'>Home</Link>
            </div>
            <div className={`navbar-item`}>
                <Link href={'/products'}  className='navbar-item-text'>Sklep</Link>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'>Kontakt</p>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text' onClick={handleLogOut}> { user?.firstName ? 'Log out' : ''}</p> 
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'> { user?.firstName ? <Link href={'/user'}>Welcome, {user?.firstName}!</Link> : <Link href={'/auth/login'}>Login</Link>}</p> 
            </div>
        </div>
    </div>
    )
}

export default NavBar
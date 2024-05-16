'use client';
import './navbarStyles.scss';
import Link from 'next/link';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { logoutUser } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '@/app/utils/models/product';

interface INavBarProps {

}

const NavBar = (props: INavBarProps) => {
    
    const [activeMenuItem, setActiveMenuItem] = useState();
    const user = useSelector((state:RootState) => state.auth.user);
    const dispatch = useDispatch();
    const cartProducts:Array<IProduct> = useSelector((state:RootState) => state.cart.products);

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
                <Link href={'/store'}  className='navbar-item-text'>Sklep</Link>
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'>Kontakt</p>
            </div>
            <div className={`navbar-item`}>
                {/* <p  className='navbar-item-text' onClick={handleLogOut}> { user?.firstName ? 'Log out' : ''}</p>  */}
            </div>
            <div className={`navbar-item`}>
                <p  className='navbar-item-text'> { user?.firstName ? <Link href={'/user'}>Welcome, {user?.firstName}!</Link> : <Link href={'/auth/login'}>Login</Link>}</p> 
            </div>
            <div className='navbar-item'>
                <Link href={'/cart'}>
                    <img src='./images/icons/cart.png'/>
                    <p>{ cartProducts.length }</p>
                </Link>
                
            </div>
        </div>
    </div>
    )
}

export default NavBar
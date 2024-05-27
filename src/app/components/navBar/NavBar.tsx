'use client';
import './navbarStyles.scss';
import Link from 'next/link';
import { RootState } from '@/store';
import React, { useCallback, useState } from 'react'
import { logoutUser } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '@/app/utils/models/product';
import { CartItem } from '@/store/cartSlice';
import { current } from '@reduxjs/toolkit';

interface INavBarProps {

}

const NavBar = (props: INavBarProps) => {
    
    const user = useSelector((state:RootState) => state.auth.user);
    const dispatch = useDispatch();
    const cartProducts:Array<CartItem> = useSelector((state:RootState) => state.cart.products);
    const countCartItemsNumber = useCallback(() => {

        return cartProducts?.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0);
    }, [cartProducts])

    const handleLogOut = () => {
        dispatch(logoutUser())
    };

    return (
    <div className='navbar'>
        <div className='navbar-left'>
            <Link href={'/'}>
                <img  src={"/images/logo/ricg_logo.png"}></img>
            </Link>
        </div>
        <div className='navbar-right'>
            <div className={`navbar-item`}>
                <Link href={'/'} className='navbar-item-text'>Home</Link>
            </div>
            <div className={`navbar-item`}>
                <Link href={'/store'}  className='navbar-item-text'>Sklep</Link>
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
                    <p>{ countCartItemsNumber() }</p>
                </Link>
                
            </div>
        </div>
    </div>
    )
}

export default NavBar
'use client'
import React from 'react'
import './alreadyInCartPopupStyles.scss'
import Button from '../../inputs/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { openCloseAlreadyInCartNotification } from '@/store/cartSlice'
import { RootState } from '@/store'

interface Props {}

const AlreadyInCartPopUp = () => {

    const isAlredyInCartOpen = useSelector((state:RootState) => state.cart.isCartNotificationOpen );
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(openCloseAlreadyInCartNotification(false));
    }

  return(
    <div>
        { isAlredyInCartOpen ? 
        <div className='alreadyInCartPopUp'>
            <div className='alreadyInCartPopUp-wrapper'>
                <p className='alreadyInCartPopUp-wrapper-header'>Produkt juz dodany do koszyku</p>
                <div className='alreadyInCartPopUp-wrapper-actions'>
                    <Button label='Zamknij' onParentClick={handleClose}/>
                </div>
            </div>
        </div> 
        : '' }
    </div>
  )
  
  
}

export default AlreadyInCartPopUp
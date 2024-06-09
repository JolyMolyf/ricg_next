'use client'
import React from 'react'
import '../alreadyInCartPopUp/alreadyInCartPopupStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Button from '../../inputs/button/Button';
import { openCloseAlreadyBoughtNotification } from '@/store/appSlice';

interface Props {}

const AlreadyBoughtPopUp = () => {

    const isAlreadyBought = useSelector((state: RootState) => state.app.isAlreadyBoughtNotificationOpen );
    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(openCloseAlreadyBoughtNotification());
    }

    return (
        <div>
            { isAlreadyBought ? 
            <div className='alreadyInCartPopUp'>
                <div className='alreadyInCartPopUp-wrapper'>
                    <p className='alreadyInCartPopUp-wrapper-header'>Produkt juz kupiony</p>
                    <p style={{ textAlign: 'center' }}>Juz kupione produkty zostaly usuniente z koszyku</p>
                    <div className='alreadyInCartPopUp-wrapper-actions'>
                        <Button label='Zamknij' onParentClick={handleClose}/>
                    </div>
                </div>
            </div> 
            : '' }
        </div>
    )
}

export default AlreadyBoughtPopUp
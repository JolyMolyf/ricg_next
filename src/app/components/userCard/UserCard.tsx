import IUser from '@/app/utils/models/User'
import React from 'react'
import './userCardStyles.scss';
import Button from '../common/inputs/button/Button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authSlice';
import { IEbook, ILecture, IProduct } from '@/app/utils/models/product';

interface IUserCardProps {
    user: IUser | null;
    lectures?: Array<IProduct>
    ebooks?: Array<IProduct>
    webinars?: Array<any>
}

const UserCard = (props: IUserCardProps) => {
    const { user, webinars, ebooks, lectures } = props;

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutUser());
    }
    

  return ( 
    <div className='userCard'>
        <div className='userCard-icon'>
            <img src='/images/icons/userIcon.png'/>
        </div>
        <div className='userCard-header'>
            <p>{ user?.firstName } { user?.lastName }</p>
        </div>
        <div className='userCard-stats'>
            <div className='userCard-stats-item'>
                <div className='userCard-stats-item-header'>
                    {lectures?.length}
                </div>
                <div className='userCard-stats-item-text'>
                    Szkoleń
                </div>
            </div>
            <div className='userCard-stats-item'>
                <div className='userCard-stats-item-header'>
                    {ebooks?.length}
                </div>
                <div className='userCard-stats-item-text'>
                    E-bookow
                </div>
            </div>
            <div className='userCard-stats-item'>
                <div className='userCard-stats-item-header'>
                    {webinars?.length}
                </div>
                <div className='userCard-stats-item-text'>
                    Konsultacje
                </div>
            </div>
        </div>
        <div className='userCard-actions'>
            { user && <Button onParentClick={handleLogOut} label='Log out'/>}
        </div>
    </div>
  )
}

export default UserCard
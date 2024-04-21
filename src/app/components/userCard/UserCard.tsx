import IUser from '@/app/utils/models/User'
import React from 'react'
import './userCardStyles.scss';

interface IUserCardProps {
    user: IUser | null;
}

const UserCard = (props: IUserCardProps) => {
    const { user } = props;

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
                    2
                </div>
                <div className='userCard-stats-item-text'>
                    Courses
                </div>
            </div>
            <div className='userCard-stats-item'>
                <div className='userCard-stats-item-header'>
                    2
                </div>
                <div className='userCard-stats-item-text'>
                    Completed
                </div>
            </div>
            <div className='userCard-stats-item'>
                <div className='userCard-stats-item-header'>
                    2
                </div>
                <div className='userCard-stats-item-text'>
                    In progress
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard
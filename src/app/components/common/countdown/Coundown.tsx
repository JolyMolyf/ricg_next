'use client'

import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import './countdownStyles.scss';

interface Props {
    expiryTimestamp: Date;
}

const Coundown = (props:Props) => {
    const { expiryTimestamp } = props;
    const timer = useTimer({expiryTimestamp, onExpire: () => {} });

    useEffect(() => {
        if (expiryTimestamp) {
            timer.start();
        }
            
    }, [])
  return <div className='countdown'>
    <div className='countdown-entry'>
        <p className='countdown-entry-time'>{ timer.days}</p>
        <p className='countdown-entry-label'> Dni </p>
    </div>
    <div>
        <p className='countdown-entry-time'>{ timer.hours }</p>
        <p className='countdown-entry-label'> Godzin </p>
    </div>
    <div>
        <p className='countdown-entry-time'>{ timer.minutes }</p>
        <p className='countdown-entry-label'> Minut </p>
    </div>
    <div>
        <p className='countdown-entry-time'>{ timer.seconds }</p>
        <p className='countdown-entry-label'> Sekund </p>
    </div>
  </div>
}

export default Coundown
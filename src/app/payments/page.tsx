'use client'
import { useEffect, useState } from 'react';
import './paymentStatus.scss';
import {  useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import WebinarApi from '../utils/api/WebinarApi';

const PaymentsStatus = () => {

    const params = useSearchParams();
    const [isSuccess, setIsSuccess] = useState<boolean>(params.get('success') === 'true');
    const navigate = useRouter();

    return (
        <div className='paymentStatus'>
            <div className='paymentStatus-card'>
                <div className='paymentStatus-card-icon'>
                    <img src={ isSuccess ? '/images/payments/successPayment.png' : '/images/payments/failedPayment.png' }></img>
                </div>
                <div className='paymentStatus-card-header'>
                   { isSuccess? 'Płatność zaakceptowana' : 'Płatność nieudana' } 
                </div>
                <div className='paymentStatus-card-body'>
                    {isSuccess ? 'Dziękujemy za zakup naszego webinaru. Wszystkie dodatkowe informacje są wysłane na mail podany przy płatności':
                    'Zakup nieopłacony. Środki nie zostały pobrane z Twojego konta. Zakup czeka na Twoją płatność' } 
                </div>
                <div onClick={()=>{
                    isSuccess ? navigate.push('/') : navigate.push('/products')
                }} className='paymentStatus-card-action'>{ isSuccess ? 'Home' : 'Webinary' }</div>
            </div>
        </div>
    )
}

export default PaymentsStatus;
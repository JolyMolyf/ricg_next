'use client'

import './userwebinarpageStyles.scss'
import WebinarApi from '@/app/utils/api/WebinarApi';
import { RootState } from '@/store';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Coundown from '@/app/components/common/countdown/Coundown';
import moment from 'moment';
import Button from '@/app/components/common/inputs/button/Button';

interface Props {}

const UserWebinarPage = () => {

  const params = useParams();
  const user = useSelector((state:RootState) => state.auth.user);
  const router = useRouter();
  const isAuthenticated = useSelector((state:RootState) => state.auth.authState )

  const [product, setProduct] = useState<any>();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      redirect('/auth/login');
    }

    WebinarApi.getWebinarByEventDateIdAndWebinarId(params.webinarId as string, params.eventdateId as string).then((res:any) => {
      setProduct(res)
    })
  }, [])
  
  return (
    <div className='userWebinar'>
      <div className='userWebinar-header'>
        <div className='userWebinar-header-image'>
          <img src={product?.attributes?.webinar?.data?.attributes?.coverImage?.data?.attributes?.url}></img>
        </div>
        <div className='userWebinar-header-right'>
          <p className='userWebinar-header-right-title'>{ product?.attributes?.webinar?.data?.attributes?.title}</p>
          <p>{ moment(product?.attributes?.date).format('MMMM Do YYYY hh:mm:ss') }</p>
          <div className='userWebinar-header-right-description'>
            <p>{ product?.attributes?.webinar?.data?.attributes?.description}</p>
          </div>
          <div className='userWebinar-header-right-timer'>
            <p className='userWebinar-header-right-timer-header'>Zostalo do wydarzenia</p>
            <div className='userWebinar-header-right-timer-countdown'>
              { product && <Coundown expiryTimestamp={moment(product?.attributes?.date)?.toDate()}/>}
            </div>
          </div>
          <div className='userWebinar-header-right-action'>
            <Button label='Przedz do eventu' onParentClick={() => { window.location.assign( product.attributes.url || '') }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserWebinarPage
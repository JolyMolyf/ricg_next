'use client'

import './webinarPageStyles.scss'
import WebinarApi from '@/app/utils/api/WebinarApi';
import { RootState } from '@/store';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Coundown from '@/app/components/common/countdown/Coundown';
import moment from 'moment';
import Button from '@/app/components/common/inputs/button/Button';
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { EventDate } from '@/app/utils/models/EventDate';
import { IProduct, IWebinar } from '@/app/utils/models/product';
import { addToCart } from '@/store/cartSlice';
import Dropdown from 'react-dropdown';
import AuthorCard from '../../common/authorCard/AuthorCard';
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection';
import { ProductTypes } from '@/app/utils/api/ProductApi';
import ContentPagePreLoader from '../../preloaders/ContentPagePreloader';

interface Props {
  isSelling: boolean;
}

const WebinarPage = (props: Props) => {
  const { isSelling } = props;
  
  const params = useParams();
  const user = useSelector((state:RootState) => state.auth.user);
  const isAuthenticated = useSelector((state:RootState) => state.auth.authState )
  const dispatch = useDispatch();

  const [product, setProduct] = useState<IWebinar>();
  const [ eventDate, setEventDate ] = useState<EventDate>();
  const [ selectedCardDate, setSelectedCardDate ] = useState<any>();
  const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);

  useEffect(() => {
    if (!isSelling && (!isAuthenticated || !user)) {
      redirect('/auth/login');
    }

    if ( !isSelling ) {
      WebinarApi.getWebinarByEventDateIdAndWebinarId(params.webinarId as string, params.eventdateId as string).then((res:any) => {
        setEventDate({id: res.id, ...res.attributes})
        setProduct({id: res.attributes.webinar.id, ...res.attributes.webinar.data.attributes})
      })
    } else {
      WebinarApi.getWebinarById(params.webinarId as string).then((res) => {
          setProduct(res);
          const dates = res.event_dates?.data?.map((date:any) => ({ value: date.id, label: moment(date.attributes.date).format('MMMM Do YYYY')}));
          setAvailableDates(dates)
          setSelectedCardDate(dates?.[0])
      })
    }
   
  
  }, [])

  const handleAddToCart = () => {
    if (isSelling) {
      if (product) {
          dispatch(addToCart({...product, selectedDate: selectedCardDate, type: ProductTypes.webinar}))
      }
    }
  }

  const handleDropDownChange = (e:any) => {
    setSelectedCardDate(e);   
  }

  return (
    <div className='userWebinar'>
      { !product && <ContentPagePreLoader/> }
      <div className='userWebinar-header'>
        <div className='userWebinar-header-image'>
          <img src={product?.coverImage?.data?.attributes?.url}></img>
        </div>
        <div className='userWebinar-header-right'>
          <p className='userWebinar-header-right-title'>{ product?.title}</p>
          { !isSelling &&  <p>{ moment(eventDate?.date).format('MMMM Do YYYY hh:mm:ss') }</p> }
          { (product as IWebinar)?.event_dates?.data?.length > 0 &&  <div className='userWebinar-header-right-dateSelector' onClick={(e) => {
                e.stopPropagation();
            }}>
                <Dropdown value={selectedCardDate?.label} onChange={handleDropDownChange} className='productCard-dateSelector-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
            </div> } 
          <div className='userWebinar-header-right-description'>
            <p>{ product?.description}</p>
          </div>
          <div className='userWebinar-header-right-timer'>
            <p className='userWebinar-header-right-timer-header'>Zostalo do wydarzenia</p>
            <div className='userWebinar-header-right-timer-countdown'>
              { product && <Coundown expiryTimestamp={(moment(product?.event_dates?.data?.find((e) => e.id === selectedCardDate?.value ).attributes.date ?? eventDate?.date))?.toDate()}/>}
            </div>
          </div>
          <div className='userWebinar-header-right-action'>
            { !isSelling && <Button label='Przedz do eventu' onParentClick={() => { window.location.assign( product?.url || '') }} />}
            { isSelling && (
              <div className='userWebinar-header-right-action-price'>
                 <PriceDisplay price={product?.price} redeemedPrice={product?.redeemedPrice} />
                 <Button onParentClick={handleAddToCart} label='Dodaj do koszyka'/>
              </div>
            ) }
          </div>
        </div>
      </div>
      <div className='ebook-audience section'>
      <div className='ebook-author-title main-title'>Dla kogo jest ten webinar</div>  
      <ImageTextSection reverse={true} text={product?.audience || ''} title={''} imageLink={'https://res.cloudinary.com/dtb1fvbps/image/upload/v1690722537/boy_Illustration_d1c929c3fa.svg'}  />
    </div>
      <div className='userWebinar-body'>
        <p className="userWebinar-body-header main-title">Czego się nauczysz na webinarze?</p>
        <div className='userWebinar-body-points section'>
          { Object.values(product?.bulletPoints|| {})?.map((point:any, index:number) => {
            const { label, value } = point;
              return (
                  <div className="userWebinar-body-points-wrapper-item" key={index}>
                      <div className="userWebinar-body-points-wrapper-item-header">
                          {label}
                      </div>
                      <div className="userWebinar-body-points-wrapper-item-body">
                          {value}
                      </div>
                  </div>
              )
            })
            }
        </div>
      </div>
      <div className='userWebinar-author section'>
        <div className='ebook-author-title main-title'>O Autorze</div>    
        <AuthorCard author={product?.author?.data?.attributes}/>
      </div>
    </div>
  )
}

export default WebinarPage
'use client'

import './webinarPageStyles.scss'
import WebinarApi from '@/app/utils/api/WebinarApi';
import { RootState } from '@/store';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Coundown from '@/app/components/common/countdown/Coundown';
import moment from 'moment';
import Button from '@/app/components/common/inputs/button/Button';
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { EventDate } from '@/app/utils/models/EventDate';
import { IWebinar } from '@/app/utils/models/product';
import { addToCart } from '@/store/cartSlice';
import AuthorCard from '../../common/authorCard/AuthorCard';
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection';
import { ProductTypes } from '@/app/utils/api/ProductApi';
import ContentPagePreLoader from '../../preloaders/ContentPagePreloader';
import { orderApi } from '@/app/utils/api/OrderApi';
import AddedIntoAccountPopUp from '../../popups/addedIntoAccount/AddedIntoAccountPopUp';
import CartPopup from '../../popups/cartPopup/CartPopup';
import { useCalendlyEventListener, PopupButton, PopupWidget } from "react-calendly";
import { calendlyApi } from '@/app/utils/api/CalendlyApi';

interface Props {
  isSelling: boolean;
}

const WebinarPage = (props: Props) => {
  const { isSelling } = props;
  
  const params = useParams();
  const user = useSelector((state:RootState) => state.auth.user);
  const isAuthenticated = useSelector((state:RootState) => state.auth.authState )
  const router = useRouter();
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [product, setProduct] = useState<IWebinar>();
  const [ eventDate, setEventDate ] = useState<EventDate>();
  const [ selectedCardDate, setSelectedCardDate ] = useState<any>();
  const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ isAddedModalOpen, setIsAddedModalOpen ] = useState<boolean>(false);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload, e),
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  });

  useEffect(() => {
    if (!isSelling && (!isAuthenticated || !user)) {
      redirect('/auth/login');
    }

    if ( !isSelling ) {
      WebinarApi.getWebinarByEventDateIdAndWebinarId(params.eventdateId as string).then((res:any) => {
        console.log(res);
        setEventDate({id: res.id, ...res.attributes})
        setProduct({id: res.attributes.webinar.id, ...res.attributes.webinar.data.attributes})
      })
      
      calendlyApi.getEventById('7f8410c9-af05-4440-ae27-fd21cb95d29a').then((r) =>{
        console.log(r);
      })
    } else {
      WebinarApi.getWebinarById(params.webinarId as string).then((res) => {
          setProduct(res);
          const dates = res.event_dates?.data?.map((date:any) => ({ value: date.id, label: moment(date.attributes.date).format('MMMM Do YYYY HH:mm:ss')}));
          setAvailableDates(dates)
          setSelectedCardDate(dates?.[0])
      })
    }
   
  
  }, [])

  const handleAddToCart = () => {
    if (isSelling) {
      
      if (product) {
        if (product.price === 0 || product.redeemedPrice === 0) {
          if (user && product.id && user.id) {
                      orderApi.createOrder(user.id, 0, [eventDate?.id || '' ], [], []);
                      setIsAddedModalOpen(true);
              
          } else {
              router.push('/login')
          }
      } else {
          setIsModalOpen(true);
          dispatch(addToCart({...product, type: ProductTypes.webinar}))
      }
        
      }
    }
  }

  const handleDropDownChange = (e:any) => {
    setSelectedCardDate(e);   
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
}

  return (
    <div className='userWebinar' id='mmmmm'>
       <div id="__next"></div>
      
      {isModalOpen && <CartPopup handleClose={handleCloseModal} title={product?.title || ''} />}
      {isAddedModalOpen && <AddedIntoAccountPopUp handleClose={() => {setIsAddedModalOpen(false)}}/>}
      { !product && <ContentPagePreLoader/> }
      <div className='userWebinar-header' ref={ref}>
        <div className='userWebinar-header-image'>
          <img src={product?.coverImage?.data?.attributes?.url}></img>
        </div>
        <div className='userWebinar-header-right'>
          <p className='userWebinar-header-right-title'>{ product?.title}</p>
          { !isSelling && eventDate?.date &&  <p>{ moment(eventDate?.date).format('MMMM Do YYYY hh:mm:ss') }</p> }
          <div className='userWebinar-header-right-description'>
            <p>{ product?.description}</p>
          </div>
          {/* <div className='userWebinar-header-right-timer'>
            <p className='userWebinar-header-right-timer-header'>Do wydarzenia zostało</p>
            <div className='userWebinar-header-right-timer-countdown'>
              { product && <Coundown expiryTimestamp={(moment(product?.event_dates?.data?.find((e) => e.id === selectedCardDate?.value ).attributes.date ?? eventDate?.date))?.toDate()}/>}
            </div>
          </div> */}
          <div className='userWebinar-header-right-action'>
            { !isSelling && eventDate?.callendlyUrl && <Button label='Przedz do eventu' onParentClick={() => { window.location.assign( eventDate?.url || '') }} />}
            { !isSelling && <PopupButton
                className='calendlyButton'
                text="Umów się na spotkanie"
                url={`https://calendly.com/szkolenia-ricg/konsultacja-indywidualna?name=${user?.username}&email=${user?.email}`} rootElement={document.getElementById('__next')!}
              />}
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
      <div className='ebook-author-title main-title'>Dla kogo są te konsultacje</div>  
      <ImageTextSection reverse={true} text={product?.audience || ''} title={''} imageLink={'https://res.cloudinary.com/dtb1fvbps/image/upload/v1690722537/boy_Illustration_d1c929c3fa.svg'}  />
    </div>
      <div className='userWebinar-body'>
        <p className="userWebinar-body-header main-title">Czego się nauczysz na konsultacji?</p>
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
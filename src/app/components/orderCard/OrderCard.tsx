import React from 'react'
import './orderCardStyles.scss';
import moment from 'moment';
import PriceDisplay from '../common/priceDisplay/PriceDisplay';
import { IEbook, ILecture, IWebinar } from '@/app/utils/models/product';


interface Order {
  id: string;
  attributes: {
    price: number;
    createdAt: string;
    ebooks: {
        data: [
         { id: string;
          attributes: IEbook }
        ]
      },
    lectures: {
      data: [ 
        {
          id: string;
          attributes: ILecture; 
        } 
      ]

    },
    event_dates: {
      data: [
        { 
          id: string;
          attributes: {
            date: string;
            webinar: {
              data: {
                id: string; 
                attributes: IWebinar
              }
            }
          }
        }
      ]
    }
    user: {
      data: {
        id: string,
        attributes: {
          username: string;
          createdAt: string;
        }
      }
    }
  }
}

interface Props {
    order:Order
}

const OrderCard = (props:Props) => {
  
  const { order } = props;

  return (
    <div className='orderCard'>
      <div className='orderCard-header'>
        <div className='orderCard-header-title'>
          <div>
            <p>Order #{order.id}</p>
          </div>
          <div className='orderCard-header-title-time'>
            <p>{moment(order.attributes.createdAt).fromNow()}</p>
          </div>
        </div>
        <p className='orderCard-header-user'>{order.attributes.user.data.attributes.username}</p>
      </div>
      <div className='orderCard-body'>
        <p className='orderCard-body-header'>Items: </p>
        <div>
          { order.attributes?.ebooks.data?.map((ebook) => {
            return (
              <div className='orderCard-body-item'>
                <p>{ ebook.attributes.title }</p>
                <p>{ ebook.attributes.price } zł</p>
              </div>
            )
          }) }

          { order.attributes?.lectures.data?.map((lecture) => {
            return (
              <div className='orderCard-body-item'>
                <p>{ lecture.attributes.title }</p>
                <p>{ lecture.attributes.price } zł</p>
              </div>
            )
          }) }

          { order.attributes?.event_dates.data?.map((event_date) => {


            return (
              <div className='orderCard-body-item'>
                <p>{ event_date.attributes.webinar.data.attributes.title }</p>
                <p>{ moment(event_date.attributes.date).format('MMMM Do hh:mm:ss')}</p>
                <p>{ event_date.attributes.webinar.data.attributes.price } zł</p>
              </div>
            )
          }) }

        </div>
      </div>

      <div className='orderCard-footer'>
        <PriceDisplay className='orderCard-footer-price' price={order.attributes.price}/>
      </div>
    </div>
  )
}

export default OrderCard
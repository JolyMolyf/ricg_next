'use client';
import moment from 'moment';
import { productApi } from '../utils/api/ProductApi';
import './dashboardStyles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import OrderCard from '../components/orderCard/OrderCard';

interface Props {}

const Dashboard = () => {

  const [ orders, setOrders ] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    lastThreeMonth: [],
    lastYear: [],
    old: [],
  });

  useEffect(() => {
    const today = moment();
    today.set({hour:0,minute:0,second:0,millisecond:0})
    productApi.getAllOrders().then((res) => {
      const obj:any = {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        lastThreeMonth: [],
        lastYear: [],
        old: [],
      };

      res.map((order:any) => {
        const orderDate = order.attributes.createdAt;
        if ( moment(orderDate).isAfter(moment().startOf('day')) ) {
          obj.today.push(order);
        }

        if ( moment(orderDate).isBetween(moment().startOf('day').subtract(1, 'day'), moment().startOf('day')) ) {
          obj.yesterday.push(order)
        }

        if ( moment(orderDate).isBetween(moment().startOf('day').subtract(1, 'week'), moment().startOf('day').subtract(1, 'day'))) {
          obj.lastWeek.push(order);
        }

        if ( moment(orderDate).isBetween(moment().startOf('day').subtract(1, 'month'), moment().startOf('day').subtract(1, 'week')) ) {
          obj.lastMonth.push(order);
        }

        if (moment(orderDate).isBetween(moment().startOf('day').subtract(1, 'month'), moment().subtract(3, 'month'))) {
          obj.lastThreeMonth.push(order);
        }

        if (moment(orderDate).isBetween(moment().subtract(3, 'month'), moment().subtract(1, 'year'))) {
          obj.lastYear.push(order);
        }

        if (moment(orderDate).isBefore(moment().subtract(1, 'year'))) {
          obj.old.push(order);
        }

      }) 

      setOrders(obj)
    })
  }, [])

  const sumPrice = useCallback((orders:Array<any>) => {
    const ordersSum:number = orders?.reduce((acc, order) => {

      const ebookSum = order.attributes.ebooks.data.reduce ((acc:any, ebook:any) => {
        return ebook.attributes.price  + acc;
      }, 0)

      const lectureSum = order.attributes.lectures.data.reduce ((acc:any, ebook:any) => {
        return ebook.attributes.price  + acc;
      }, 0)

      const eventDatesSum = order?.attributes?.event_dates?.data?.reduce ((acc:any, ebook:any) => {
        console.log(ebook);
        return ebook?.attributes?.webinar?.data?.attributes?.price + acc;
      }, 0)

      return acc + ebookSum + lectureSum + eventDatesSum || 0;
    }, 0)

    return ordersSum;
  }, [orders])

  return (
    <div className='dashboard'>
      <p className='main-title'>DashBoard</p>
        <div className='dashboard-wrapper'>
          {Object.entries(orders).map(([key, orders], index) => {
            return( 
            <div className='dashboard-wrapper-time' key={index}>
              <div className='dashboard-wrapper-time-header'>
                <p>{key?.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g)?.join(" ")}:</p>
                <p className='dashboard-wrapper-time-header-sum'> Kupione {orders?.length } produktow na kwotę: { sumPrice(orders) } zł </p>
              </div>
              <div className='dashboard-wrapper-time-entries'>
                { orders?.length > 0 ?  orders?.map((order:any, index) => {
                  return (
                    <div key={index}>
                      <OrderCard order={order}/>
                    </div>
                  )
                }) : <p>No orders</p> }
              </div>
            </div>)
          })}
        </div>

    </div>
  )
}

export default Dashboard
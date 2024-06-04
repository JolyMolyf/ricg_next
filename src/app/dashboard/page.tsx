'use client';
import moment from 'moment';
import { productApi } from '../utils/api/ProductApi';
import './dashboardStyles.scss';
import React, { useEffect, useState } from 'react';
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
      console.log(res);
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

  return (
    <div className='dashboard'>
      <p className='main-title'>DashBoard</p>
        <div className='dashboard-wrapper'>
          {Object.entries(orders).map(([key, value]) => {
            return( 
            <div className='dashboard-wrapper-time'>
              <div className='dashboard-wrapper-time-header'>{key?.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g)?.join(" ")}</div>
              <div className='dashboard-wrapper-time-entries'>
                { value?.length > 0 ?  value.map((order:any) => {
                  return (
                    <div>
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
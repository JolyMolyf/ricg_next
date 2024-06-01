
'use client'

import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HorizontalProductCard from '../components/horizontalProductCard/HorizontalProductCard';
import './cartStyles.scss';
import Button from '../components/common/inputs/button/Button';
import axiosInterceptorInstance from '@/axios/axiosInterceptors';
import { loadStripe } from '@stripe/stripe-js';
import { orderApi } from '../utils/api/OrderApi';
import { CartItem } from '@/store/cartSlice';

interface Props {

}

const stripePromice = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const Cart = (props:Props) => {
  
  const items: Array<CartItem> = useSelector((state:RootState) => state.cart.products);
  const user = useSelector((state:RootState) => state.auth.user);
  const [cartSum, setCartSum] = useState<number>(0)
  
  useEffect(() => {
    const tmpSum:number = items.reduce((acc, cur) => {
        return acc + ( cur.quantity * (cur.product?.redeemedPrice ?? cur?.product.price) )
    }, 0)
    setCartSum(tmpSum)
}, [items])

  const handlePayment = async () => {
    axiosInterceptorInstance.post('http://localhost:3000/api/payments', {
      products: items,
      user
     }).then(async (session) => {
        const stripe = await stripePromice;
        const { error } = await stripe!.redirectToCheckout({
          sessionId: session.data.sessionId,
        });
     })
  }

  return (
    <div className='cart'>
      <p className='cart-header'>Kupione Produkty</p>
      <div className='cart-container'>
        <div className='cart-container-items'>
          { items.map((item:CartItem, key:number) => {
            return (
              <div key={key} style={{width: '100%', marginTop: 10}}>
                <HorizontalProductCard product={item.product} quantity={item.quantity}/>
              </div>
            )
          }) }
        </div>
        <div className='cart-container-summary'>
          <p className='cart-container-summary-title'>Podsumowanie</p>
          <div className='cart-container-summary-body'>
            <div className='cart-container-summary-body-price'>
              <div>
                <p className="cart-container-summary-body-price">{cartSum} zł</p>
                <p className="cart-container-summary-body-price" >{Math.ceil(cartSum / 1.23)} zł netto</p>
              </div>
            </div>
          </div>
          <Button onParentClick={handlePayment} className='cart-container-summary-action' label='Płatność' />
        </div>
      </div>
      
    </div>
  )
}

export default Cart

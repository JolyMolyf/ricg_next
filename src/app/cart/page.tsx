
'use client'

import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HorizontalProductCard from '../components/horizontalProductCard/HorizontalProductCard';
import './cartStyles.scss';
import Button from '../components/common/inputs/button/Button';

interface Props {

}

const page = (props:Props) => {
  
  const items: Array<any> = useSelector((state:RootState) => state.cart.products);
  const [cartSum, setCartSum] = useState<number>(0)

  useEffect(() => {
    const tmpSum:number = items.reduce((acc, cur) => {
        return acc + ( (cur?.redeemedPrice ?? cur?.price) )
    }, 0)
    setCartSum(tmpSum)
}, [items])

  const handlePayment = () => {
    console.log('Proceed to payment');
  }

  return (
    <div className='cart'>
      <p className='cart-header'>Kupione Produkty</p>
      <div className='cart-container'>
        <div className='cart-container-items'>
          { items.map((item, key:number) => {
            return (
              <div key={key} style={{width: '100%', marginTop: 10}}>
                <HorizontalProductCard product={item}/>
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

export default page
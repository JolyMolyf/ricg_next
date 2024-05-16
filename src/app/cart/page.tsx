
'use client'

import { RootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux'
import HorizontalProductCard from '../components/horizontalProductCard/HorizontalProductCard';
import './cartStyles.scss';

interface Props {

}

const page = (props:Props) => {
  const items: Array<any> = useSelector((state:RootState) => state.cart.products);

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

        </div>
      </div>
      
    </div>
  )
}

export default page
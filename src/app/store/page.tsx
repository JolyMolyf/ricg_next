'use client'

import React, { useEffect, useState } from 'react'
import UserMenubar from '../components/userMenuBar/userMenubar'
import { IEbook, ILecture, IWebinar } from '../utils/models/product'
import { productApi } from '../utils/api/ProductApi'
import ProductCard from '../components/productCard/ProductCard';
import './storeStyles.scss';
import { useRouter } from 'next/navigation'
import MultipleItemPagePreLoader from '../components/preloaders/MultipleItemPagePreLoader'

interface Props {}

const Store = () => {

  const [ ebooks, setEbooks ] = useState<Array<IEbook>>([]);
  const [ lectures, setLectures ] = useState<Array<ILecture>>([]);
  const [ webinars, setWebinars ] = useState<Array<IWebinar>>([]);
  const [ activeMenuItem, setActiveMenuItem ] = useState<any>('lecture');
  const [activeProductList, setActiveProductList] = useState<Array<any>>();
  
  const router = useRouter();

  const handleActiveMenuItemChange = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  }

  useEffect(() => {
      productApi.getAllLectures().then((res) => {
        setLectures(res);
        setActiveProductList(res);
      })

      productApi.getAllEbooks().then((res) => {
        setEbooks(res)
      })

      productApi.getAllWebinars().then((res) => {
        setWebinars(res)
      })
  }, [])

  useEffect(() => {
    switch (activeMenuItem) {
      case 'webinar': 
        setActiveProductList(webinars);
        break;
      case 'lecture': 
        setActiveProductList(lectures);
        break;
      case 'ebook':
        setActiveProductList(ebooks);
        break;
      default: 
        setActiveProductList(webinars);
    }
  }, [activeMenuItem])

  const handleCardClick = (product:any, selectedCardDate?:any) => {
    switch (activeMenuItem) {
      case 'webinar': 
        router.push(`/store/product/webinar/${product.id}`);
        break;
      case 'lecture': 
        router.push( `/store/product/lecture/${product.id}`);
        break;
      case 'ebook':
        router.push(`/store/product/ebook/${product.id}`);
        break;

    }
  }
  
  return (
    <div>
    {  ebooks.length === 0 || lectures.length === 0 || webinars.length === 0 ? <MultipleItemPagePreLoader/> : ( 
      <div  className='store'>
      <UserMenubar ebooks={ebooks} lectures={lectures} webinars={webinars} parentActiveMenuItem={activeMenuItem} setParentActiveMenuItem={handleActiveMenuItemChange}/>
       <div className='store-products'>
         { activeProductList?.map((product:any, key: number) => {

          return (
            <div key={key} onClick={() => {
              
            }}>
              <ProductCard onClick={handleCardClick} product={{id: product.id, ...product?.attributes}} isSellingMode={true} cardType={activeMenuItem}/>
            </div>
          )
        })  }
      </div>
      </div>
    ) 
  }  
    </div>   
  )
}

export default Store
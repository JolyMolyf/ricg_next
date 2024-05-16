'use client'

import React, { useEffect, useState } from 'react'
import UserMenubar from '../components/userMenuBar/userMenubar'
import { IEbook, ILecture, IWebinar } from '../utils/models/product'
import { productApi } from '../utils/api/ProductApi'
import ProductCard from '../components/productCard/ProductCard';
import './storeStyles.scss';

interface Props {}

const page = () => {

  const [ ebooks, setEbooks ] = useState<Array<IEbook>>([]);
  const [ lectures, setLectures ] = useState<Array<ILecture>>([]);
  const [ webinars, setWebinars ] = useState<Array<IWebinar>>([]);
  const [ activeMenuItem, setActiveMenuItem ] = useState<string>('lecture');
  const [activeProductList, setActiveProductList] = useState<Array<any>>();

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
    if (activeMenuItem === 'webinar') {
      setActiveProductList(webinars);
    } 

    if ( activeMenuItem === 'lecture' ) {
      setActiveProductList(lectures);
    }

    if (activeMenuItem === 'ebook') {
      setActiveProductList(ebooks);
    }
  }, [activeMenuItem])

  return (
    <div  className='store'>
      <UserMenubar ebooks={ebooks} lectures={lectures} webinars={webinars} parentActiveMenuItem={activeMenuItem} setParentActiveMenuItem={handleActiveMenuItemChange}/>
      <div className='store-products'>
        { activeProductList?.map((product:any, key: number) => {

          return (
            <div key={key} onClick={() => {
              
            }}>
              <ProductCard product={{id: product.id, ...product?.attributes}} isSellingMode={true} cardType={'lecture'}/>
            </div>
          )
        })  }
      </div>
    </div>
  )
}

export default page
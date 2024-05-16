'use client'

import { RootState } from '@/store';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import lodash from 'lodash';

import './userPageStyles.scss';
import UserCard from '../components/userCard/UserCard';
import UserMenubar from '../components/userMenuBar/userMenubar';
import { orderApi } from '../utils/api/OrderApi';
import ProductCard from '../components/productCard/ProductCard';
import { IWebinar, ILecture, IEbook, IProduct } from '../utils/models/product';

interface IUserPageProps {

}

const menuItems:any = {
  webinar: 'Webinary',
  lecture: 'Szkolenie',
  ebook: 'E-booki'
}

const Page = (props:IUserPageProps) => {

  const {  } = props;
  
  const [ ebooks, setEbooks ] = useState<Array<IProduct>>();
  const [ lectures, setLectures ] = useState<Array<IProduct>>();
  const [ webinars, setWebinars ] = useState<Array<IProduct>>();
  const [ activeMenuItem, setActiveMenuItem ] = useState<'webinar' | 'lecture' | 'ebook'>('webinar');

  const [activeProductList, setActiveProductList] = useState<Array<IProduct>>();
  
  const user = useSelector((state:RootState) => state.auth.user);
  const isAuthenticated = useSelector((state:RootState) => state.auth.authState )

  useEffect(() => { 
    if (!isAuthenticated || !user) {
      redirect('/auth/login')
    }

    orderApi.getAllUserOrdersByUserEmail(user.email).then((res:any) => {      
      setEbooks(res.map((o:any) => o.products.ebooks).flat());
      setLectures(res?.map((o:any) => o.products?.lectures).flat());
      const retrievedWebinars = lodash.uniqBy(res?.map((o:any) => o.products.webinars).flat(), 'id') as any;
      setWebinars(retrievedWebinars);
      setActiveProductList(retrievedWebinars)
    });

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
    <div className='userPage'>
      <div id='userPage-right' className='userPage-section'>
        <div className='userPage-section-item'>
          <UserCard user={user}/>
        </div>
        <div className='userPage-section-item'>
          <UserMenubar ebooks={ebooks} lectures={lectures} webinars={webinars} parentActiveMenuItem={activeMenuItem} setParentActiveMenuItem={setActiveMenuItem}/>
        </div>
      </div>
      <div className='userPage-section'>
        <h1 className='userPage-section-header'>{ menuItems?.[activeMenuItem] }</h1>
        <div className='userPage-section-products'>
          { activeProductList?.map((product:any, index:number) => {
         
          let mergedObject:IProduct | IWebinar | ILecture | IEbook = {
            ...(product as any).attributes,
            id: product.id,
          }
          if ( product.attributes.webinar ) {
            mergedObject = {
              ...mergedObject, 
              coverImage: product.attributes.webinar.data.attributes.coverImage.data.attributes.url, 
              title: product.attributes.webinar.data.attributes.title, 
              description: product.attributes.webinar.data.attributes.description,
              price: product.attributes.webinar.data.attributes.price,
              redeemedPrice: product.attributes.webinar.data.attributes.redeemedPrice,
              cardPoints: product.attributes.webinar.data.attributes.cardPoints,
              date: product.attributes.date,
              webinarId:  product.attributes.webinar.data.id
            }
          } else {
            mergedObject = { ...mergedObject, ...product.attributes, coverImage: product.attributes.coverImage.data.attributes.url}
          }
         
          return (
            <div key={index} className='userPage-section-products-item'>
              <ProductCard cardType={activeMenuItem} isSellingMode={false} product={mergedObject}/>
            </div>
          )
          }) }
        </div>
      </div>
    </div>
  )
}

export default Page
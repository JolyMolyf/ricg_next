'use client'

import ebookApi from '@/app/utils/api/EbookApi'
import { useParams, useRouter } from 'next/navigation'
import './ebookPageStyles.scss'
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/common/inputs/button/Button'
import AuthorCard from '@/app/components/common/authorCard/AuthorCard'
import { IEbook } from '@/app/utils/models/product'
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection'
import { ProductTypes } from '@/app/utils/api/ProductApi'
import ContentPagePreLoader from '../../preloaders/ContentPagePreloader'
import Head from 'next/head'
import { orderApi } from '@/app/utils/api/OrderApi'
import { RootState } from '@/store'
import CartPopup from '../../popups/cartPopup/CartPopup'
import AddedIntoAccountPopUp from '../../popups/addedIntoAccount/AddedIntoAccountPopUp'

interface Props {
    isSelling: boolean;
}

const EbookPage = (props: Props) => {

  const { isSelling } = props;

  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state:RootState) => state.auth.user)
  
  const [ ebook, setEbook ] = useState<IEbook>();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ isAddedModalOpen, setIsAddedModalOpen ] = useState<boolean>(false);

  useEffect(() => {
    ebookApi.getEbookById(params.ebookId as string  || '').then((res) => {
      setEbook(res)
    })
  }, [])

  const handleAddToCart = () => {
    if (isSelling) {
      if (ebook) {
        if (ebook.price === 0 || ebook.redeemedPrice === 0) {
          if (user && ebook.id && user.id) {
            orderApi.createOrder(user.id, 0, [], [], [ebook.id]);
            setIsAddedModalOpen(true);
          } else {
            router.push('/login');
          }
        } else {
          dispatch(addToCart({...ebook, type: ProductTypes.ebook}))
        }
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
}
  return ( 
    <div className='ebook'>
         {isModalOpen && <CartPopup handleClose={handleCloseModal} title={ebook?.title || ''} />}
         {isAddedModalOpen && <AddedIntoAccountPopUp handleClose={() => {setIsAddedModalOpen(false)}}/>}
      <Head>
        <title>{ ebook?.title ?? 'Ebook title' }</title>
        <meta name="og:image" content={ebook?.coverImage?.data?.attributes?.url} />
      </Head>
      { !ebook && <ContentPagePreLoader/>}
      <div className='ebook-header section'>
        <div className='ebook-header-section image-section'>
          <img src={ebook?.coverImage?.data?.attributes?.url}/>
        </div>
        <div className='ebook-header-section'>
          <div>
            <p className='ebook-header-section-title'>{ebook?.title}</p>
            <p className='ebook-header-section-description'>{ ebook?.description }</p>
            { !isSelling && <Button label='Czytaj'  onParentClick={() => { window.location.assign( ebook?.content?.data?.attributes?.url || '') }}/>}
            { isSelling && (<div className='ebook-header-section-description-action'>
                <PriceDisplay className='ebook-header-section-description-action-price' price={ebook?.price} redeemedPrice={ebook?.redeemedPrice} />
                <Button onParentClick={handleAddToCart} label='Dodaj do koszyka' />
              </div>) 
            }
          </div>
        </div>
      </div>
      <div className='ebook-audience section'>
        <div className='ebook-author-title'>Dla kogo jest ta książka</div>  
        <ImageTextSection reverse={true} text={ebook?.audience || ''} title={''} imageLink={'https://res.cloudinary.com/dtb1fvbps/image/upload/v1690722537/boy_Illustration_d1c929c3fa.svg'}  />
      </div>
      <div className='ebook-body section'>
        <p className='ebook-body-title'>Co znajdziesz w środku?</p>
        <div className='ebook-body-parts'>
            { ebook?.parts?.map((part:any, index:any) => {
              return (
            <div className='ebook-body-parts-entry' key={index}>
              <p className='ebook-body-parts-entry-title'>{part.title}</p>
              <div className='ebook-body-parts-entry-body'>{ part?.parts?.map((part:string, index:any) => {
                return (
                  <div className='ebook-body-parts-entry-body-wrapper' key={index}>
                    <div className='ebook-body-parts-entry-body-round'></div>
                    <p>{part}</p>
                  </div>
                )
              }) }</div>
            </div>
              )
            }) }
        </div>
      </div>
      <div className='ebook-author section'>
        <div className='ebook-author-title'>O Autorze</div>    
        <AuthorCard author={ebook?.author?.data?.attributes}/>
      </div>
    </div>
  )
}

export default EbookPage
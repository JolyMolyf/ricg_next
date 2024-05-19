'use client'

import ebookApi from '@/app/utils/api/EbookApi'
import { useParams } from 'next/navigation'
import './ebookPageStyles.scss'
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/common/inputs/button/Button'
import AuthorCard from '@/app/components/common/authorCard/AuthorCard'
import { IEbook } from '@/app/utils/models/product'
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection'

interface Props {
    isSelling: boolean;
}

const EbookPage = (props: Props) => {

  const { isSelling } = props;

  const params = useParams();
  const dispatch = useDispatch();
  const [ ebook, setEbook ] = useState<IEbook>();

  useEffect(() => {
    ebookApi.getEbookById(params.ebookId as string  || '').then((res) => {
      setEbook(res)
    })
  }, [])

  const handleAddToCart = () => {
    if (isSelling) {
      if (ebook) {
          dispatch(addToCart({...ebook}))
      }
    }
  }


  return <div className='ebook'>
    <div className='ebook-header section'>
      <div className='ebook-header-section'>
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
      <div className='ebook-author-title'>Dla kogo jest ta ksiazka</div>  
      <ImageTextSection reverse={true} text={ebook?.audience || ''} title={''} imageLink={'https://res.cloudinary.com/dtb1fvbps/image/upload/v1690722537/boy_Illustration_d1c929c3fa.svg'}  />
    </div>
    <div className='ebook-body section'>
      <p className='ebook-body-title'>Co znajdziesz w środku?</p>
      <div className='ebook-body-parts'>
          { ebook?.parts?.map((part:any) => {
            return (
              <div className='ebook-body-parts-entry'>
                <p className='ebook-body-parts-entry-title'>{part.title}</p>
                <div className='ebook-body-parts-entry-body'>{ part?.parts?.map((part:string) => {
                  return (
                    <div className='ebook-body-parts-entry-body-wrapper'>
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
      <AuthorCard author={ebook?.author.data.attributes}/>
    </div>
  </div>
}

export default EbookPage
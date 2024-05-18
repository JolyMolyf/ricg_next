'use client'

import ebookApi from '@/app/utils/api/EbookApi'
import { useParams } from 'next/navigation'
import './ebookPageStyles.scss'
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/common/inputs/button/Button'
import AuthorCard from '@/app/components/common/authorCard/AuthorCard'
import { IEbook } from '@/app/utils/models/product'

interface Props {
    isSelling: boolean;
}

const EbookPage = (props: Props) => {

  const { isSelling } = props;

  const params = useParams();
  const [ ebook, setEbook ] = useState<IEbook>();

  useEffect(() => {
    ebookApi.getEbookById(params.ebookId as string  || '').then((res) => {
      setEbook(res)
    })
  }, [])


  return <div className='ebook'>
    <div className='ebook-header'>
      <div className='ebook-header-section'>
        <img src={ebook?.coverImage?.data?.attributes?.url}/>
      </div>
      <div className='ebook-header-section'>
        <div>
          <p className='ebook-header-section-title'>{ebook?.title}</p>
          <p className='ebook-header-section-description'>{ ebook?.description }</p>
          <Button label='Czytaj'  onParentClick={() => { window.location.assign( ebook?.content?.data?.attributes?.url || '') }}/>
        </div>
      </div>
    </div>
    <div className='ebook-body'>
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
    <div className='ebook-author'>
      <div className='ebook-author-title'>O Autorze</div>    
      <AuthorCard author={ebook?.author.data.attributes}/>
    </div>
  </div>
}

export default EbookPage
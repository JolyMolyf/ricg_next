'use client';
import { productApi } from '@/app/utils/api/ProductApi';
import { ILecture } from '@/app/utils/models/product';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Button from '../../common/inputs/button/Button';
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection';
import ProductPart from '../../productPart/ProductPart';
import './lecturePageStyles.scss';
import AuthorCard from '../../common/authorCard/AuthorCard';

interface Props {
  isSelling:boolean
}

const LecutrePage = (props:Props) => {
  
  const { isSelling } = props;
  const [ lecture, setLecture ] = useState<ILecture>();
  
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    productApi.getLectureById(params.lectureId as string).then((lecture) => {
      setLecture(lecture)
    });
  }, [])

  const handleAddToCart = () => {
    dispatch(addToCart({...lecture}))
  }

  console.log(lecture?.lecture_parts);

  return (
    <div className='lecture'>
      <div className='lecture-header section'>
        <div className='lecture-header-section image-section'>
          <img src={lecture?.coverImage?.data?.attributes?.url}/>
        </div>
        <div className='lecture-header-section'>
          <div>
            <p className='lecture-header-section-title'>{lecture?.title}</p>
            <p className='lecture-header-section-description'>{ lecture?.description }</p>
            { !isSelling && <Button label='Zacznij'  onParentClick={() => { window.location.assign( lecture?.link || '') }}/>}
            { isSelling && (<div className='lecture-header-section-description-action'>
                <PriceDisplay className='lecture-header-section-description-action-price' price={lecture?.price} redeemedPrice={lecture?.redeemedPrice} />
                <Button onParentClick={handleAddToCart} label='Dodaj do koszyka' />
              </div>) 
            }
          </div>
        </div>
      </div>
      <div className='lecture-audience section'>
            <p className='main-title'>Dla kogo jest szkolenie</p>
            <ImageTextSection title={''} imageLink={'https://res.cloudinary.com/dtb1fvbps/image/upload/v1690722537/boy_Illustration_d1c929c3fa.svg'} text={lecture?.audience|| ''} reverse={true} />
      </div>
      <div className='lecture-parts section'>
            <p className='main-title'> Z czego sklada sie szkolenie</p>
            { lecture?.lecture_parts?.data?.map((part, index: number) => {
              console.log(part);
              return (
                <ProductPart title={part?.attributes.title} key={index} parts={[part?.attributes.description || '']} />
              )
            }) }
      </div>
      <div className='lecture-author section'>
        <div className='lecture-author main-title'>O Autorze</div>    
        <AuthorCard author={lecture?.author.data.attributes} />
      </div>
    </div>
  )
}

export default LecutrePage
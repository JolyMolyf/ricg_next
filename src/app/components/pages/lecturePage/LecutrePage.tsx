'use client';
import { ProductTypes, productApi } from '@/app/utils/api/ProductApi';
import { ILecture } from '@/app/utils/models/product';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Button from '../../common/inputs/button/Button';
import PriceDisplay from '../../common/priceDisplay/PriceDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import ImageTextSection from '../../sections/imageTextSection/ImageTextSection';
import ProductPart from '../../productPart/ProductPart';
import './lecturePageStyles.scss';
import AuthorCard from '../../common/authorCard/AuthorCard';
import ContentPagePreLoader from '../../preloaders/ContentPagePreloader';
import AddedIntoAccountPopUp from '../../popups/addedIntoAccount/AddedIntoAccountPopUp';
import CartPopup from '../../popups/cartPopup/CartPopup';
import { orderApi } from '@/app/utils/api/OrderApi';
import { RootState } from '@/store';
interface Props {
  isSelling:boolean
}

const LecutrePage = (props:Props) => {
  
  const { isSelling } = props;
  const user = useSelector((state:RootState) => state.auth.user);
  const [ lecture, setLecture ] = useState<ILecture>();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ isAddedModalOpen, setIsAddedModalOpen ] = useState<boolean>(false);
  
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter()
  const pathName = usePathname();

  useEffect(() => {
    productApi.getLectureById(params.lectureId as string).then((lecture) => {
      setLecture(lecture)
    });
  }, [])

  const handleAddToCart = () => {

     if (isSelling) {
      
      if (lecture) {
        if (lecture.price === 0 || lecture.redeemedPrice === 0) {
          if (user && lecture?.id && user?.id) {
                      orderApi.createOrder(user.id, 0, [], [], [lecture.id]);
                      setIsAddedModalOpen(true);
              
          } else {
              router.push('/login')
          }
      } else {
          setIsModalOpen(true);
          dispatch(addToCart({...lecture, type: ProductTypes.lecture}))
      }
        
      }
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
}
  return (
    <div className='lecture'>
        {isModalOpen && <CartPopup handleClose={handleCloseModal} title={lecture?.title || ''} />}
        {isAddedModalOpen && <AddedIntoAccountPopUp handleClose={() => {setIsAddedModalOpen(false)}}/>}
      { !lecture && <ContentPagePreLoader/>}
      <div className='lecture-header section'>
        <div className='lecture-header-section image-section'>
          <img src={lecture?.coverImage?.data?.attributes?.url}/>
        </div>
        <div className='lecture-header-section'>
          <div>
            <p className='lecture-header-section-title'>{lecture?.title}</p>
            <p className='lecture-header-section-description'>{ lecture?.description }</p>
            { !isSelling && <Button label='Zacznij szkolenie'  onParentClick={() => { router.push(`${pathName}/playback`) }}/>}
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
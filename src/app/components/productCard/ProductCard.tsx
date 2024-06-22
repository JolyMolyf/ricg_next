import React, { useEffect, useState } from 'react'
import './productCardStyles.scss';
import moment from 'moment';
import Button from '../common/inputs/button/Button';
import { useRouter } from 'next/navigation'
import { IWebinar, ILecture, IEbook, IProduct } from '../../utils/models/product'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Dropdown from 'react-dropdown';
import CartPopup from '../popups/cartPopup/CartPopup';
import { orderApi } from '@/app/utils/api/OrderApi';
import { RootState } from '@/store';
import { ProductTypes } from '@/app/utils/api/ProductApi';
import AddedIntoAccountPopUp from '../popups/addedIntoAccount/AddedIntoAccountPopUp';

interface IProps {
    product: IWebinar | ILecture | IEbook | IProduct;
    isSellingMode: boolean;
    cardType: 'webinar' |  'lecture' | 'ebook';
    onClick: (product:any, selectedCardDate:any) => void;
}

const ProductCard = (props:IProps) => {
    
    const { product, isSellingMode, cardType, onClick } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state:RootState) => state.auth.user)

    const [ selectedCardDate, setSelectedCardDate ] = useState<any>();
    const [availableDates, setAvailableDates] = useState<Array<any>>([]);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ isAddedModalOpen, setIsAddedModalOpen ] = useState<boolean>(false);

    const handleButtonClick = (e:any) => {
        if (isSellingMode) {
            if (product) {
                if (product.price === 0 || product.redeemedPrice === 0) {
                    if (user && product.id && user.id) {
                        switch (product.type) {
                            case ProductTypes.ebook: 
                                orderApi.createOrder(user.id, 0, [], [], [product.id]);
                                setIsAddedModalOpen(true);
                                break;
                            case ProductTypes.lecture: 
                                orderApi.createOrder(user.id, 0, [], [product.id], []);
                                setIsAddedModalOpen(true);
                                break;
                            case ProductTypes.webinar: 
                                orderApi.createOrder(user.id, 0, [selectedCardDate?.value], [], []);
                                setIsAddedModalOpen(true);
                                break;
                        }
                        
                    } else {
                        router.push('/login')
                    }
                } else {
                    setIsModalOpen(true);
                    dispatch(addToCart({...product, selectedDate: selectedCardDate}))
                }
            }
        } else {
            onClick?.(product, selectedCardDate);
        }
    }

    useEffect(() => {
        if ( (product as IWebinar).event_dates ) {
            const webinar:IWebinar = (product as IWebinar); 
            const dates = webinar.event_dates?.data?.map((date:any) => ({ value: date.id, label: moment(date.attributes.date).format('MMMM Do YYYY')}));
            setAvailableDates(dates)
            setSelectedCardDate(dates?.[0])
        }
    }, [product])

    const handleCardClick = (e:any) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.(product, selectedCardDate);
       
    }

    const handleDropDownChange = (e:any) => {
        setSelectedCardDate(e);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className='productCard' onClick={handleCardClick}>
            {isModalOpen && <CartPopup handleClose={handleCloseModal} title={product?.title} />}
            {isAddedModalOpen && <AddedIntoAccountPopUp handleClose={() => {setIsAddedModalOpen(false)}}/>}
            <img  onClick={handleCardClick} className='productCard-coverImage' src={product?.coverImage?.data?.attributes?.url?? product.coverImage} />
            <div  className='productCard-content'>
                <div className='productCard-content-header'  onClick={handleCardClick}>
                    <p>{product.title}</p> 
                    {(product as IWebinar).date && <p className='productCard-content-header-date'>{ moment((product as IWebinar)?.date).format('MMMM Do YYYY')}</p>}
                </div>
                <div  onClick={handleCardClick}>
                    {(product as IWebinar).cardPoints ?  
                        <div> {Object.values((product as IWebinar).cardPoints || {}).map((point: any, index:number) => {
                            return (
                                <div className='productCard-content-point' key={index}>
                                    <div className='productCard-content-point-circle'></div>
                                    <p>{ point.label }</p>
                                </div>
                            )}) }
                    </div> : (
                    <div className='productCard-content-point'>
                        <p>{product.description}</p>
                    </div>) }
                </div>
            </div>
            { (product as IWebinar)?.event_dates?.data?.length > 0 &&  <div className='productCard-dateSelector' onClick={(e) => {
                e.stopPropagation();
            }}>
                <Dropdown value={selectedCardDate?.label} onChange={handleDropDownChange} className='productCard-dateSelector-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
            </div> } 
           
            <div className='productCard-footer' >                
               { isSellingMode && <div className='product-footer-section'>
                { product.redeemedPrice ? (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 110, height: 20 }}>
                            <p>{product.redeemedPrice} zł</p> 
                            <p style={{ textDecoration: 'line-through', fontSize: '16px' }}>{ product.price } zł</p>  
                        </div>
                        <p style={{ fontSize: 16 }}>{Math.ceil(product.redeemedPrice/ 1.23)} zł netto</p>
                    </div>) 
                    
                    : (<div >
                            <p>{Math.ceil(product.price)} zł</p>
                            <p style={{ fontSize: 15 }}>{Math.ceil(product.price / 1.23)} zł netto</p>
                        </div> )}
                </div>} 
                <div className='product-footer-section'>
                   <Button onParentClick={handleButtonClick} label={ isSellingMode ? 'Dodaj do koszyka' : 'View'}/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
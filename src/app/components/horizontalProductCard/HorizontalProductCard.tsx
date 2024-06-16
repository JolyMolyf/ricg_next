import { IProduct, IWebinar } from '@/app/utils/models/product'
import React from 'react'
import './horizontalProductCardStyles.scss';
import Button from '../common/inputs/button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cartSlice';

interface Props {
    product: IProduct
    quantity?:number;
}

const HorizontalProductCard = (props: Props) => {
    
    const { product, quantity } = props;

    const dispatch = useDispatch();

    const handleRemoveFromCard = () => {

        if(!product?.id) return;
        dispatch(removeFromCart({ productType: product.type,  productId: product?.id, eventDateId: (product as IWebinar)?.selectedDate?.value }));
    }

    return (
        <div className='horizontalCard'>
            <img src={(product as any)?.coverImage?.data?.attributes?.url ?? product?.coverImage }/>
            <div className='horizontalCard-product'>
                <p className='horizontalCard-product-title'> { product?.title } </p>
                {( product as IWebinar )?.selectedDate?.value && <p className='horizontalCard-product-date'> { ( (product as IWebinar)?.selectedDate?.label ) } </p>}
                <p className='horizontalCard-product-description'> { product?.description } </p>
            </div>
            <div className='horizontalCard-actions'>
                <div className='horizontalCard-actions-wrapper'>
                    <div>

                    </div>
                    <div className='horizontalCard-actions-price'>
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
                                </div> )
                        }
                    </div>
                </div>
                <Button onParentClick={handleRemoveFromCard} className='horizontalCard-actions-buttons' label='Usuń'/>
            </div>
        </div>
  )
}
export default HorizontalProductCard
import React from 'react'
import './productCardStyles.scss';
import moment from 'moment';
import Button from '../common/inputs/button/Button';
import { useRouter } from 'next/navigation'

interface IProps {
    product: IWebinar | ILecture | IEbook | IProduct;
    isSellingMode: boolean;
    cardType: 'webinar' |  'lecture' | 'ebook'
}

const ProductCard = (props:IProps) => {
    
    const { product, isSellingMode, cardType } = props;

    const router = useRouter();

    const handleCardClick = () => {
        
        if ( isSellingMode ) {
            
        } else {
            switch (cardType) {
                case 'webinar': 
                    router.push(`/user/product/webinar/${(product as IWebinar).id}/${(product as IWebinar).webinarId}`);
                    break;
                case 'ebook': 
                    router.push(`/user/product/ebook/${product.id}`);
                    break;
                case 'lecture': 
                    router.push(`/user/product/lecture/${product.id}`);
                    break;
                default: 
                    router.push('/')
            }
        }

    }

    return (
        <div className='productCard' onClick={handleCardClick}>
            <img className='productCard-coverImage' src={product.coverImage}/>
            <div className='productCard-content'>
                <div className='productCard-content-header'>
                    <p>{product.title}</p> 
                    {(product as IWebinar).date && <p className='productCard-content-header-date'>{ moment((product as IWebinar)?.date).format('MMMM Do YYYY')}</p>}
                </div>
                <div>
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
            <div className='productCard-footer'>
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
                   <Button label={ isSellingMode ? 'Dodaj do koszyka' : 'View'}/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
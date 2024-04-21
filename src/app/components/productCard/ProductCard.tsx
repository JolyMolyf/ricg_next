import React from 'react'
import './productCardStyles.scss';

interface IProps {
    product: IProduct;
}

const ProductCard = (props:IProps) => {
    const { product } = props;
    
    return (
        <div className='productCard'>
            <img src={product.coverImage}/>
        </div>
    )
}

export default ProductCard
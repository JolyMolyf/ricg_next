import React from 'react'

interface Props {
    price?: number;
    redeemedPrice?: number;
    className?: string;
}

const PriceDisplay = (props: Props) => {
    const { price, redeemedPrice, className } = props;

  return <div className={className ?? ''}>
    { redeemedPrice ? (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 120, height: 25 }}>
                            <p className='main-price'>{redeemedPrice} zł</p> 
                            <p style={{ textDecoration: 'line-through', fontSize: '16px' }}>{ price } zł</p>  
                        </div>
                        <p className='price-netto' style={{ fontSize: 16 }}>{Math.ceil(redeemedPrice/ 1.23)} zł netto</p>
                    </div>) 
                    
                    : (<div >
                            <p className='main-price'>{Math.ceil(price || 0)} zł</p>
                            <p style={{ fontSize: 15 }}>{Math.ceil((price ?? 1) / 1.23)} zł netto</p>
                        </div> )}
  </div>
}

export default PriceDisplay
import React from 'react';
import './productPartStyles.scss';

interface Props {
    key: number;
    title: string
    parts: Array<string>;
}

const ProductPart = (props:Props) => {
    const { key, title, parts } = props
    return <div key={key}>
    <div className='parts'>
      <div className='parts-entry'>
          <p className='parts-entry-title'>{title}</p>
          <div className='parts-entry-body'>{ parts?.map((part:string) => {
            return (
              <div className='parts-entry-body-wrapper'>
                <div className='parts-entry-body-round'></div>
                <p>{part}</p>
              </div>
            )
          }) }</div>
        </div>
      </div>
    </div>
    }

export default ProductPart
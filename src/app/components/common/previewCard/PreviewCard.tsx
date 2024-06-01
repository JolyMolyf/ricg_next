import './previewCardStyles.scss';
import React from 'react'

interface Props {
    title: string;
    description: string;
    image: string;
    isSelected?:boolean;
}

const PreviewCard = (props:Props) => {
    const { title, description, image, isSelected } =props;

  return (
    <div className={`previewCard ${isSelected ? 'previewCard-selected' : '' }`}>
        <img className='previewCard-image' src={image} alt='previewImage'/>
        <div>
            <p className='previewCard-title'>{title}</p>
            <p className='previewCard-description'>{description}</p>
        </div>
    </div>
  )
}

export default PreviewCard
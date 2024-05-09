import { ProjectSpecialityItem } from '@/app/utils/models/ProjectSpeciality'
import React from 'react';
import parse from 'html-react-parser';
import './percCardStyles.scss';

interface Props {
    perk: ProjectSpecialityItem
}

const percCard = (props:Props) => {
    
    const { perk } = props;

    return (
        <div className='percCard'>
            <img src={perk.image}/>
            <div className='percCard-text'>
                <div className='percCard-text-header'>
                  {perk.title}
                </div>
                <div className='percCard-text-body'>
                {   parse(perk?.details || '')}
                </div>
              
            </div>
            
         </div>
    )
}

export default percCard
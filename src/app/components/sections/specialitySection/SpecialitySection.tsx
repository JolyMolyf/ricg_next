import { useEffect, useState } from 'react';
import CourseSpecialityApi from '@/app/utils/api/CourseSpecialityApi';
import { ProjectSpecialityItem } from '@/app/utils/models/ProjectSpeciality';
import PercCard from '../../common/percCard/PercCard';
import './specialitySectionStyles.scss';

interface ICarosuelProps {

}

const SpecialitySection = (props:ICarosuelProps) => {
    const {  } = props;

    const [ percItems, setPercItems ] = useState<Array<ProjectSpecialityItem>>([])

    useEffect(() => {
      CourseSpecialityApi.getCoursePercItems().then ((items:any) => {
        setPercItems(items);
      });
    }, [])


    return(
        <div className="specialitySection">
            <p className="specialitySection-title">{"Co wyroznia nasz Projekt"}</p>
            <div className='specialitySection-wrapper'>
                { percItems?.map((perc, index: number) => {
                    return(
                        <div key={index} className='specialitySection-wrapper-perc'>
                            <PercCard perk={perc} />
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default SpecialitySection;
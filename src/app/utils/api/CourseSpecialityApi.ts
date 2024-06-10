import axios from 'axios';
import { ProjectSpecialityItem } from '../models/ProjectSpeciality';


const getCoursePercItems = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/specialties?populate=*`).then((res) => {
        return res.data.data.map((itemJson:any) => {
            return ProjectSpecialityItem.fromJsonApi(itemJson);
        })
    })
}


export default {
    getCoursePercItems
}
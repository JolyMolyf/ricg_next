import axios from 'axios';
import { ProjectSpecialityItem } from '../models/ProjectSpeciality';


const getCoursePercItems = async () => {
    return await axios.get(`http://localhost:1337/api/specialties?populate=*`).then((res) => {
        return res.data.data.map((itemJson:any) => {
            return ProjectSpecialityItem.fromJsonApi(itemJson);
        })
    })
}


export default {
    getCoursePercItems
}
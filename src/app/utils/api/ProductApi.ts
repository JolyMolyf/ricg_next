import axios from "axios";
import { IEbook, ILecture, IWebinar } from "../models/product"

const getAllLectures = async () => {
    const lectures = await axios.get('http://localhost:1337/api/lectures?populate=*').then((res) => {
        return res.data.data
    }); 
    
    return lectures;
}

const getAllEbooks = async () => {
    const ebooks = await axios.get('http://localhost:1337/api/ebooks?populate=*').then((res) => {
        return res.data.data
    });

    return ebooks;
}

const getAllWebinars = async () => {
    const webinars = await axios.get('http://localhost:1337/api/webinars?populate=*').then((res) => {
        return res.data.data
    })
    return webinars;
}

const getLectureById = (lectureId:string) => {
    return axios.get(`http://localhost:1337/api/lectures/${lectureId}?populate[0]=coverImage&populate[1]=author.image&populate[2]=lecture_parts`).then((res) => {
        return {id: res.data.data.id, ...res.data.data.attributes}
    }).catch((e) => {
        console.error('error: ', e);
    })
}



interface ProductApi {
    getAllLectures: () => Promise<Array<ILecture>>;
    getAllEbooks: () => Promise<Array<IEbook>>;
    getAllWebinars: () => Promise<Array<IWebinar>>;

    getLectureById: (lectureId:string) => Promise<ILecture>;
}

export const productApi:ProductApi = {
    getAllLectures,
    getAllEbooks,
    getAllWebinars,

    getLectureById
}
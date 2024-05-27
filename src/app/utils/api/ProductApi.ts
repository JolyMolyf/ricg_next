import axios from "axios";
import { IEbook, ILecture, IWebinar } from "../models/product"

export const ProductTypes = {
    ebook: 'EBOOK',
    webinar: 'WEBINAR',
    lecture: 'LECTURE'
}

const getAllLectures = async () => {
    const lectures = await axios.get('http://localhost:1337/api/lectures?populate=*').then((res) => {
        return res.data.data.map((lecture:any) => ({id: lecture.id, attributes: {...lecture.attributes, type: ProductTypes.lecture}}))
    }); 
    
    return lectures;
}

const getAllEbooks = async () => {
    const ebooks = await axios.get('http://localhost:1337/api/ebooks?populate=*').then((res) => {
        return res.data.data.map((ebook:any) => ({id: ebook.id, attributes: {...ebook.attributes, type: ProductTypes.ebook}}))
    });

    return ebooks;
}

const getAllWebinars = async () => {
    const webinars = await axios.get('http://localhost:1337/api/webinars?populate=*').then((res) => {
        return res.data.data.map((webinar:any) => ({id: webinar.id, attributes: {...webinar.attributes, type: ProductTypes.webinar}}))
    })
    return webinars;
}

const getLectureById = (lectureId:string) => {
    return axios.get(`http://localhost:1337/api/lectures/${lectureId}?populate[0]=coverImage&populate[1]=author.image&populate[2]=lecture_parts`).then((res) => {
        return {id: res.data.data.id, ...res.data.data.attributes, type: ProductTypes.lecture}
    }).catch((e) => {
        console.error('error: ', e);
    })
}

const getEbookById = async (ebookId:string) => {
    return axios.get(`http://localhost:1337/api/ebooks/${ebookId}?populate[0]=author.image&populate[1]=coverImage`).then((ebookRes) => {
        const fetchedEbook = {id: ebookRes.data.data.id, ...ebookRes.data.data.attributes,  type: ProductTypes.ebook};
        return fetchedEbook;
    })
} 

const getWebinarById = async (webinarId:string) => {
    return axios.get(`http://localhost:1337/api/webinars/${webinarId}?populate[0]=author.image&populate[1]=event_dates&populate[2]=coverImage`).then((res) => {
        return { id: res.data.data.id, ...res.data.data.attributes,  type: ProductTypes.webinar };
    });
}

const getWebinarByEventDateId =  (eventDateId: string) => {
    return axios.get(`http://localhost:1337/api/eventdates/${eventDateId}?populate[0]=webinar.coverImage`).then((res) => {
        return { id: res.data.data.attributes.webinar.data.id, type: ProductTypes.webinar, selectedDate: eventDateId, ...res.data.data.attributes.webinar.data.attributes };
    })
}



interface ProductApi {
    getAllLectures: () => Promise<Array<ILecture>>;
    getAllEbooks: () => Promise<Array<IEbook>>;
    getAllWebinars: () => Promise<Array<IWebinar>>;

    getLectureById: (lectureId:string) => Promise<ILecture>;
    getWebinarById: (webinarId: string) => Promise<IWebinar>;
    getWebinarByEventDateId: (eventDateId: string)  => Promise<IWebinar>;
    getEbookById: (ebookId:string) => Promise<IEbook>;
    
}

export const productApi:ProductApi = {
    getAllLectures,
    getAllEbooks,
    getAllWebinars,

    getEbookById,
    getLectureById,
    getWebinarById,
    getWebinarByEventDateId
    
}
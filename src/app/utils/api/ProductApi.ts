import axios from "axios";
import { IEbook, ILecture, IWebinar } from "../models/product"
import axiosInterceptorInstance from "@/axios/axiosInterceptors";

export const ProductTypes = {
    ebook: 'EBOOK',
    webinar: 'WEBINAR',
    lecture: 'LECTURE'
}

const getAllLectures = async () => {
    const lectures = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/lectures?populate=*`).then((res) => {
        return res.data.data.map((lecture:any) => ({id: lecture.id, attributes: {...lecture.attributes, type: ProductTypes.lecture}}))
    }); 
    
    return lectures;
}

const getAllEbooks = async () => {
    const ebooks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/ebooks?populate=*`).then((res) => {
        return res.data.data.map((ebook:any) => ({id: ebook.id, attributes: {...ebook.attributes, type: ProductTypes.ebook}}))
    });

    return ebooks;
}

const getAllWebinars = async () => {
    const webinars = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/webinars?populate=*`).then((res) => {
        return res.data.data.map((webinar:any) => ({id: webinar.id, attributes: {...webinar.attributes, type: ProductTypes.webinar}}))
    })
    return webinars;
}

const getLectureById = (lectureId:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/lectures/${lectureId}?populate[0]=coverImage&populate[1]=author.image&populate[2]=lecture_parts.previewImage&populate[3]=lecture_parts.files`).then((res) => {
        return {id: res.data.data.id, ...res.data.data.attributes, type: ProductTypes.lecture}
    }).catch((e) => {
        console.error('error: ', e);
    })
}

const getEbookById = async (ebookId:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/ebooks/${ebookId}?populate[0]=author.image&populate[1]=coverImage`).then((ebookRes) => {
        const fetchedEbook = {id: ebookRes.data.data.id, ...ebookRes.data.data.attributes,  type: ProductTypes.ebook};
        return fetchedEbook;
    })
} 

const getWebinarById = async (webinarId:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/webinars/${webinarId}?populate[0]=author.image&populate[1]=event_dates&populate[2]=coverImage`).then((res) => {
        return { id: res.data.data.id, ...res.data.data.attributes,  type: ProductTypes.webinar };
    });
}

const getWebinarByEventDateId =  (eventDateId: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/eventdates/${eventDateId}?populate[0]=webinar.coverImage`).then((res) => {
        return { id: res.data.data.attributes.webinar.data.id, type: ProductTypes.webinar, date: res.data.data.attributes.date, selectedDate: eventDateId, ...res.data.data.attributes.webinar.data.attributes };
    })
}

const getAllOrders = () => {
    return axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/orders?populate[0]=lectures&populate[1]=ebooks&populate[2]=event_dates.webinar&populate[3]=user&populate[4]=webinar.coverImage`).then((res) => {
        return res.data.data
    })
}

interface ProductApi {

    getAllOrders: () => Promise<Array<any>>

    getAllLectures: () => Promise<Array<ILecture>>;
    getAllEbooks: () => Promise<Array<IEbook>>;
    getAllWebinars: () => Promise<Array<IWebinar>>;

    getLectureById: (lectureId:string) => Promise<ILecture>;
    getWebinarById: (webinarId: string) => Promise<IWebinar>;
    getWebinarByEventDateId: (eventDateId: string)  => Promise<IWebinar>;
    getEbookById: (ebookId:string) => Promise<IEbook>;
    
}

export const productApi:ProductApi = {
    getAllOrders,

    getAllLectures,
    getAllEbooks,
    getAllWebinars,

    getEbookById,
    getLectureById,
    getWebinarById,
    getWebinarByEventDateId
    
}
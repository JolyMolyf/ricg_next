import axiosInterceptorInstance from "@/axios/axiosInterceptors"
import { IWebinar } from "../models/product";
import axios from "axios";

const getWebinarByEventDateIdAndWebinarId = async (eventDateId: string): Promise<IWebinar> => {
    return await axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/eventdates/${eventDateId}?populate[0]=webinar.coverImage&populate[1]=webinar.author.image&populate[2]=event_dates&populate[3]=coverImage`).then((res) => {
        return res.data.data;
    })
}

const getWebinarById = async (webinarId:string) => {
    return axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/webinars/${webinarId}?populate[0]=author.image&populate[1]=event_dates&populate[2]=coverImage`).then((res) => {
        return { id: res.data.data.id, ...res.data.data.attributes };
    });
}

const createEventDate = (webinarId: string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/eventdates`, {
        data: {
            webinar: webinarId
        }
    }).then((ev) => {
        console.log('Created event date: ', ev);
        return ev.data.data;
    }).catch((e) => {
        console.log('Error happened creating ev', e)
    } )
}

const updateEventDate = (evId: string, callendlyUrl: string, date: string) => {
    return axiosInterceptorInstance.put(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/eventdate/${evId}`, {
        data: {
            callendlyUrl,
            date
        }
    }).then((r) => {
        return r
    }).catch(() => {
        
    })
}

interface IWebinarApi {
    getWebinarById: (webianrId:string) => Promise<IWebinar>;
    getWebinarByEventDateIdAndWebinarId: (eventDateId: string) => Promise<IWebinar>;
    createEventDate: (webinarId:string) => Promise<any>;
    updateEventDate: (evId: string, callendlyUrl: string, date: string) => Promise<any>;
}

const WebinarApi:IWebinarApi = {
    getWebinarById,
    getWebinarByEventDateIdAndWebinarId,
    createEventDate,
    updateEventDate
}

export default WebinarApi;
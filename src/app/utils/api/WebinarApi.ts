import axiosInterceptorInstance from "@/axios/axiosInterceptors"
import { IWebinar } from "../models/product";

const getWebinarByEventDateIdAndWebinarId = async (webinarId:string, eventDateId: string): Promise<IWebinar> => {
    return await axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/eventdates/${eventDateId}?populate[0]=webinar.coverImage`).then((res) => {
        return res.data.data;
    })
}

const getWebinarById = async (webinarId:string) => {
    return axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/webinars/${webinarId}?populate[0]=author.image&populate[1]=event_dates&populate[2]=coverImage`).then((res) => {
        return { id: res.data.data.id, ...res.data.data.attributes };
    });
}

interface IWebinarApi {
    getWebinarById: (webianrId:string) => Promise<IWebinar>
    getWebinarByEventDateIdAndWebinarId: (webinarId: string, eventDateId: string) => Promise<IWebinar>
}

const WebinarApi:IWebinarApi = {
    getWebinarById,
    getWebinarByEventDateIdAndWebinarId
}

export default WebinarApi;
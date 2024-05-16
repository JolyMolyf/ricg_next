import axiosInterceptorInstance from "@/axios/axiosInterceptors"
import { IWebinar } from "../models/product";

const getWebinarByEventDateIdAndWebinarId = async (webinarId:string, eventDateId: string): Promise<IWebinar> => {
    return await axiosInterceptorInstance.get(`http://localhost:1337/api/eventdates/${eventDateId}?populate[0]=webinar.coverImage`).then((res) => {
        return res.data.data;
    })
}

interface IWebinarApi {
    getWebinarByEventDateIdAndWebinarId: (webinarId: string, eventDateId: string) => Promise<IWebinar>
}

const WebinarApi:IWebinarApi = {
    getWebinarByEventDateIdAndWebinarId
}

export default WebinarApi;
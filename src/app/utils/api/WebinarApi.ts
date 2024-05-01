import axiosInterceptorInstance from "@/axios/axiosInterceptors"

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
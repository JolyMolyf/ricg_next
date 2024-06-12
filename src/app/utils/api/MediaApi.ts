import axios from "axios"

interface IMediaApi {
    getVideoUrl: (url:any) => Promise<string>;
}

const getVideoUrl = async (key:any) => {
    const url:any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/content`);
    return url.data;
}

export const mediaApi:IMediaApi =  {
    getVideoUrl
}
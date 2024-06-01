import axios from "axios"

interface IMediaApi {
    getVideoUrl: (url:any) => Promise<string>;
}

const getVideoUrl = async (key:any) => {
    const url:any = await axios.get('http://localhost:3000/api/content');
    return url.data;
}

export const mediaApi:IMediaApi =  {
    getVideoUrl
}
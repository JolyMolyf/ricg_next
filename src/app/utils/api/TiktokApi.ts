import axios from 'axios';

export const getAllVideos = async () => {
    const videos:Array<any> = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/tiktoks`).then((res) => {
        return res.data.data.map((videoLink:any) => {
            return videoLink.attributes.tiktokLink;
        });
    });
    return videos;
}


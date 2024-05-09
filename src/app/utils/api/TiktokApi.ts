import axios from 'axios';

export const getAllVideos = async () => {
    const videos:Array<any> = await axios.get(`http://localhost:1337/api/tiktoks`).then((res) => {
        return res.data.data.map((videoLink:any) => {
            return videoLink.attributes.tiktokLink;
        });
    });
    return videos;
}


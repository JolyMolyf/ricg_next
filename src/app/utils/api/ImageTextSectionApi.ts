import axios from "axios"
import { ImageTextBlock } from "../models/ImageTextBlock";

const getAllImageTextBlocks = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/imagetextsections?populate=*`).then((res) => {
        return res.data.data.map((imageTextBlockJson:any) => {
            return ImageTextBlock.fromApiJson(imageTextBlockJson);
        })
    })
}


export default {
    getAllImageTextBlocks
}
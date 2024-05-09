import axios from "axios"
import { ImageTextBlock } from "../models/ImageTextBlock";

const getAllImageTextBlocks = () => {
    return axios.get('http://localhost:1337/api/imagetextsections?populate=*').then((res) => {
        return res.data.data.map((imageTextBlockJson:any) => {
            return ImageTextBlock.fromApiJson(imageTextBlockJson);
        })
    })
}


export default {
    getAllImageTextBlocks
}
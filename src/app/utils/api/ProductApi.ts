import axios from "axios";
import { IEbook, ILecture, IWebinar } from "../models/product"

const getAllLectures = async () => {
    const lectures = await axios.get('http://localhost:1337/api/lectures?populate=*').then((res) => {
        return res.data.data
    }); 
    
    return lectures;
}

const getAllEbooks = async () => {
    const ebooks = await axios.get('http://localhost:1337/api/ebooks?populate=*').then((res) => {
        return res.data.data
    });

    return ebooks;
}

const getAllWebinars = async () => {
    const webinars = await axios.get('http://localhost:1337/api/webinars?populate=*').then((res) => {
        return res.data.data
    })
    return webinars;
}



interface ProductApi {
    getAllLectures: () => Promise<Array<ILecture>>;
    getAllEbooks: () => Promise<Array<IEbook>>;
    getAllWebinars: () => Promise<Array<IWebinar>>;
}

export const productApi:ProductApi = {
    getAllLectures,
    getAllEbooks,
    getAllWebinars
}
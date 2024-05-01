import axiosInterceptorInstance from "@/axios/axiosInterceptors";
import { IEbook } from "../models/product";

const getEbookById = async (id: string) => {

    return axiosInterceptorInstance.get(`http://localhost:1337/api/ebooks/${id}?populate[0]=author.image&populate[1]=coverImage`).then((ebookRes) => {
        const fetchedEbook = {id: ebookRes.data.data.id, ...ebookRes.data.data.attributes};
        return fetchedEbook;
    })

}

interface IEbookApi {
    getEbookById: (id: string) => Promise<IEbook>
}

const ebookApi:IEbookApi = {
    getEbookById
}


export default ebookApi;
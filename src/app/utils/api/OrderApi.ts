import axiosInterceptorInstance from "@/axios/axiosInterceptors"
import axios from "axios";

interface IOrderApi {
    getAllUserOrdersByUserEmail: (email:string) => any;
    createOrder: (user: string, price: number, event_dates?: Array<string>, lectures?: Array<string>, ebooks?: Array<string>) => any;
}

const getUserOrderById = async (orderId:string) => {
    return axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/orders/${orderId}?populate[0]=lectures.coverImage&populate[1]=event_dates.webinar.coverImage&populate=ebooks.coverImage`).then((res) => {
        const ebooks =  res.data.data.attributes.ebooks.data;
        const lectures = res.data.data.attributes.lectures.data;
        const webinars = res.data.data.attributes.event_dates.data.map((eventDate:any) => {
            return eventDate;
        });
       
        return { 
            orders: res.data.data,
            products: {
                ebooks,
                lectures,
                webinars
            } 
        }
    })
}

const getAllUserOrdersByUserEmail = async (userMail:string) => {
    return await axiosInterceptorInstance.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/users/me?populate=*`).then((res) => {
        const orders = res.data.orders;
        if ( orders ) {
            return Promise.all(orders?.map((order:any) => {
                return getUserOrderById(order.id)
            }))
        } else {
            return [];
        }
        

    })
}

const createOrder = async (user: string, price: number, event_dates?: Array<string>, lectures?: Array<string>, ebooks?: Array<string>) => {
    const body = { 
        data: {
            price,
            user,
            event_dates,
            lectures,
            ebooks,
           
        }
    }
    const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/orders`, body);
    return result;
}

export const orderApi: IOrderApi = {
    getAllUserOrdersByUserEmail,
    createOrder
}
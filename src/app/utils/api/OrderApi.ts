import axiosInterceptorInstance from "@/axios/axiosInterceptors"

interface IOrderApi {
    getAllUserOrdersByUserEmail: (email:string) => any
}

const getUserOrderById = async (orderId:string) => {
    return axiosInterceptorInstance.get(`http://localhost:1337/api/orders/${orderId}?populate[0]=lectures.coverImage&populate[1]=event_dates.webinar.coverImage&populate=ebooks.coverImage`).then((res) => {
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
    return await axiosInterceptorInstance.get('http://localhost:1337/api/users/me?populate=*').then((res) => {
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

export const orderApi: IOrderApi = {
    getAllUserOrdersByUserEmail
}
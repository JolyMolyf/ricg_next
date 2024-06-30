import axios from "axios"

const getEventById = async (id:string) => {
    return axios.get(`https://api.calendly.com/scheduled_events/${id}`, { headers: {
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_CALENDLY_TOKEN,
        "Content-Type": "application/json"
    }  }).then((res) => {
        return res.data;
    })
}

interface ICalendlyApi {
    getEventById: (id: string) => Promise<any>
}

export const calendlyApi:ICalendlyApi = {
    getEventById
}
import axios from "axios"

const getContactInfo = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/contactinfo?populate=*`).then((res) => {
        return res.data.data.attributes
    })
}

export default {
    getContactInfo
}
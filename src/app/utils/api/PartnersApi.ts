import axios from "axios"

const getAllPartners = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/partners?populate=*`)
}

export default {
    getAllPartners
}
import axios from "axios"

const getAllPartners = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/partners?populate=*`)
}

export default {
    getAllPartners
}
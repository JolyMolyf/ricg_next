import axios from "axios"

const getAllPartners = async () => {
    return await axios.get(`http://localhost:1337/api/partners?populate=*`)
}

export default {
    getAllPartners
}
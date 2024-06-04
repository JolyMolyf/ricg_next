import axios from "axios"

const getContactInfo = async () => {
    return await axios.get(`http://localhost:1337/api/contactinfo?populate=*`).then((res) => {
        return res.data.data.attributes
    })
}

export default {
    getContactInfo
}
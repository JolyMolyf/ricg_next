import axios from "axios";


interface IAuthApi {
    logInUser: (userFields:any) => Promise<any>;
    registerUser: (userFields: any) => Promise<any>;
}

const getUserByEmail = () => {
   
} 


const getAllUsers = () => {
    axios.get('')
}

const registerUser = async (userFields: any) => {
    const username = userFields.firstName + ' ' + userFields.lastName;

    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/auth/local/register`, { ...userFields, username });
}

const logInUser = async (userFields:any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH_LOCAL}/auth/local`, { identifier: userFields.email, password: userFields.password });
}

const authApi:IAuthApi = {
    logInUser,
    registerUser
}

export default authApi;
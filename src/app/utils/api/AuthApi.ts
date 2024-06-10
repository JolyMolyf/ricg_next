import axios from "axios";


interface IAuthApi {
    logInUser: (userFields:any) => Promise<any>;
    registerUser: (userFields: any) => Promise<any>;
    getUserByEmail: (email:string) => Promise<any>;
    resetPassword: (email:string) => Promise<any>;
    updateUserPassword: ( password:string, passwordConfirmation:string, code:string ) => Promise<any>;
}

const getUserByEmail = (email:string) => {
   return axios.get(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/users?email=${email}}`)
} 

const registerUser = async (userFields: any) => {
    const username = userFields.firstName + ' ' + userFields.lastName;
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/auth/local/register`, { ...userFields, username });
}

const logInUser = async (userFields:any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/auth/local`, { identifier: userFields.email, password: userFields.password })
}

const resetPassword = async (email:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/auth/forgot-password`, {
        email
    })
}

const updateUserPassword = async ( password:string, passwordConfirmation:string, code:string ) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_PATH}/auth/reset-password`, { password, passwordConfirmation, code })
}

const authApi:IAuthApi = {
    logInUser,
    registerUser,
    getUserByEmail,
    resetPassword,
    updateUserPassword
}

export default authApi;
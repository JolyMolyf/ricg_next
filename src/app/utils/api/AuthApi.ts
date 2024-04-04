import axios from "axios";


interface IAuthApi {
    logInUser: (userFields:any) => Promise<any>;
    registerUser: (userFields: any) => Promise<any>;
}

const getAllUsers = () => {
    axios.get('')
}

const registerUser = async (userFields: any) => {
    const username = userFields.firstName + ' ' + userFields.lastName;

    return await axios.post('http://localhost:1337/api/auth/local/register', { ...userFields, username });
}

const logInUser = async (userFields:any) => {
    return await axios.post('http://localhost:1337/api/auth/local', { identifier: userFields.email, password: userFields.password });
}

const authApi:IAuthApi = {
    logInUser,
    registerUser
}

export default authApi;
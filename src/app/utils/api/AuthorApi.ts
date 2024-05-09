import axios from "axios";
import { Author } from "../models/Author";

const getAllAuthors = async () => {
    return await axios.get('http://localhost:1337/api/authors?populate=*').then((res) => {
        const authors = res.data.data.map((author:any)=> {
            return Author.fromJson(author.attributes);
        })
        return authors;
    });
}

export default {
    getAllAuthors
}
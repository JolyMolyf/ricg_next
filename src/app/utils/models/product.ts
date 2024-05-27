import { Author } from "@/app/components/common/authorCard/AuthorCard";

export interface IProduct {
    id?: string; 
    type?:string; 
    title: string;
    description: string;
    price: number;
    redeemedPrice?: number;
    coverImage: any;
    category: string;
    priority?: string;
    audience: string;
    author: {
        data: {
            id: string;
            attributes: Author
        }
        
    }
}

export interface IWebinar extends IProduct {
    cardPoints: any;
    bulletPoints: any;
    date: any;
    webinarId: string;
    event_dates: {data: Array<any>};
    selectedDate: any;
    url: string;

}

export interface IEbook extends IProduct {
    content: any
    parts: any
  
   
}

export interface ILecture extends IProduct {
    link: string;
    lecture_parts: {data: Array<{id: string; attributes: ILecturePart}>}
}

interface ILecturePart  {
    id?:string;
    title: string;
    description: string;
    url: string;
}
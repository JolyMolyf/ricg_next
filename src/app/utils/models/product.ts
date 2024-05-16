import { Author } from "@/app/components/common/authorCard/AuthorCard";

export interface IProduct {
    id?: string; 
    title: string;
    description: string;
    price: number;
    redeemedPrice?: number;
    coverImage: any;
    category: string;
    priority?: string;
}

export interface IWebinar extends IProduct {
    cardPoints: any;
    bulletPoints: any;
    date: any;
    webinarId: string;
    event_dates: {data: Array<any>};
    selectedDate: any;

}

export interface IEbook extends IProduct {
    content: any
    parts: any
    author: {
        data: {
            id: string;
            attributes: Author
        }
        
    }
}

export interface ILecture extends IProduct {

    parts: Array<ILecturePart>;
}

interface ILecturePart  {

}
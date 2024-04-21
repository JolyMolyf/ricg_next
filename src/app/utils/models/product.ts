interface IProduct {
    id?: string; 
    title: string;
    description: string;
    price: number;
    redeemedPrice?: number;
    coverImage: string;
    category: string;
    priority?: string;
}

interface IWebinar extends IProduct {
    cardPoints: any;
    bulletPoints: any;

}

interface IEbook extends IProduct {

}

interface ILecture extends IProduct {

    parts: Array<ILecturePart>;
}

interface ILecturePart  {

}
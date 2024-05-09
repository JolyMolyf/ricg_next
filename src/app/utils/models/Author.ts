
export class Author {
    constructor (public name: string, public surname: string, public description: string, public image: string, public courses?:Array<any>) {}

    static fromJson (json: any) {
        return {
            name: json?.name,
            surname: json?.surname,
            description: json?.description,
            image: json?.image?.data?.attributes?.url,
            courses: json?.courses?.data?.map((course:any) => {
                return {id: course.id, ...course.attributes}
            })
        }
    }
}
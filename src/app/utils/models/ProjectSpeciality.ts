export class ProjectSpecialityItem {

    constructor (public title:string, public details: string, public image:string, public id?: string) {}

    static fromJsonApi (percJsonApi:any): ProjectSpecialityItem {
        return {
            title: percJsonApi.attributes.title,
            image: percJsonApi.attributes?.image?.data?.attributes?.url,
            details: percJsonApi.attributes?.description,
            id: percJsonApi.id
        }
    }
}

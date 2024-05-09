
export class ImageTextBlock {
    constructor (public title:string, public subTitle: string, public image: string, public text: string, public reverse:boolean, public id?:string ) {}

    static fromApiJson (imageTextJson: any): ImageTextBlock {
        return {
            id: imageTextJson?.id,
            title: imageTextJson.attributes?.Title,
            subTitle: imageTextJson.attributes?.SubTitle,
            image: imageTextJson.attributes?.image?.data?.attributes?.url,
            text:  imageTextJson.attributes?.description || imageTextJson.attributes?.richText,
            reverse: imageTextJson.attributes?.reverse
        }
    }
}
import './authorCardStyles.scss';
import parse from 'html-react-parser';

export interface Author {
    name: string;
    surname: string;
    description: string;
    image: any;
}   

interface IAuthorCardProps {
    author?: Author;
}

const AuthorCard = (props:IAuthorCardProps) => {
    const { author } = props;

    return (
        <div className='authorCard'>
            <div className='authorCard-image'>
                <img src={author?.image.data.attributes.url}></img>
            </div>
            <div className='authorCard-name'>
                <p>{ author?.name + ' ' + author?.surname }</p>
            </div>
            <div className='authorCard-description blackMainText'>
                <p>{  parse(author?.description || '') }</p>
            </div>

        </div>
    )
}

export default AuthorCard
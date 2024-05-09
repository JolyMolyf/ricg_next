import Button from '../../common/inputs/button/Button';
import './imageTextSectionStyles.scss';
import parse from 'html-react-parser';

interface IImagetextSectionProps {
    title: string;
    imageLink: string;
    text:string;
    subTitle?: string;
    reverse?:boolean;
    buttonName?:  string;
    buttonAction?: (props?:any) => void;
}

const ImageTextSection = (props:IImagetextSectionProps) => {
    const { title, imageLink, subTitle, text, reverse, buttonName, buttonAction } = props;

    return (
        <div className='imagetextSection'>
            <div className='blueSecondaryHeader imagetextSection-header section-header-top-bottom-margin '>{title}</div>
            <div className={`imagetextSection-wrapper ${ reverse ? 'imagetextSection-reverseWrapper' : '' }`}>
                <div className='imagetextSection-wrapper-text' style={{ whiteSpace: "pre-line" }}>
                    <div className='blackSecondaryHeader'>{subTitle}</div>
                    <p className='blackMainText'>
                        {parse(text || '')}
                    </p>
                    <div className='imagetextSection-button'>
                       { buttonName && buttonAction && <Button label={buttonName}  onParentClick={()=> {buttonAction?.()}} />}
                    </div>
                </div>
            <div className='imagetextSection-wrapper-image'>
                    <img src={imageLink}/>
                </div>
            </div>
        </div>
    );
}

export default ImageTextSection;
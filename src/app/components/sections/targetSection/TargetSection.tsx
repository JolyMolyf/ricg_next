import './targetSection.scss'
import { targtes } from "./targetItems";

const TargetSection = () => {

    return (
        <div className="target section-top-bottom-margin ">
            <p className="blueSecondaryHeader target-header section-header-top-bottom-margin"> Cele Projektu </p>
            <div className='target-cardWrapper'>
            { targtes.map((target, index:number) => {
                    return(
                        <div className='target-item' key={index}>
                            <div className='target-card' >
                                <img src={target.icon}></img>
                                <p>{target.description || ''}</p>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default TargetSection;
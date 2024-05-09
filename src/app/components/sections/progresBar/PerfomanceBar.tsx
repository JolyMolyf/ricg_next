import './perfomanceBar.scss';
import CountUp from 'react-countup';
import { perfomanceItems } from "./perfomanceItems";

const PerfomanceBar = () => {
    return (
        <div className="perfomance-bar">
            {perfomanceItems.map((item, index) => {
                return (
                    <div key={index} className='perfomance-bar-item'>
                       <CountUp separator="" suffix={item.suffix} prefix={item.prefix} className='perfomance-bar-item-count' end={item.count} duration={5} ></CountUp>
                        <p>{item.title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default PerfomanceBar;
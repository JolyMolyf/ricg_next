'use client'
import React from 'react'
import { TypeAnimation } from "react-type-animation";
import Button from '../../common/inputs/button/Button';
import './homeHeaderStyles.scss'
import PerfomanceBar from '../progresBar/PerfomanceBar';

interface Props {}

const HomeHeader = () => {
  return (
         <div className="header-wrapper section-top-bottom-margin">
        <div className="header-content">
          <div
            className="header-content-left"
          >
            <TypeAnimation
              sequence={[
                "Wystartuj z nami-",
                1500,
              ]}
              wrapper="p"
              cursor={false}
              repeat={0}
              className="blackSecondaryHeader"
            />
            <TypeAnimation
              sequence={[
                1000,
                `rynek pracy
                 bez tajemnic`
              ]}
              speed={{type: "keyStrokeDelayInMs", value: 20}}
              wrapper="p"
              cursor={true}
              repeat={0}
              style={{ whiteSpace: "pre-line" }}
              className="blueHeader"
            />
            <div className="header-content-left-arrow">
              <img src={"/images/icons/arrowRight.svg"} />
              <Button
                label='KUP WEBINAR'
                // id="header-content-left-arrow-button"
                // type={ButtonTypes.default}
                // handleClick={ () => {
                //   navigate('/products');
                // }}
              />
            </div>
          </div>
          <div
            className="header-content-right"
          >
            <img
              src={"/images/illustrations/group_header.png"}
              style={{ width: "80%", height: "auto", maxWidth: 450 }}
            ></img>
          </div>
        </div>
        <PerfomanceBar />
    </div>
  )
}

export default HomeHeader
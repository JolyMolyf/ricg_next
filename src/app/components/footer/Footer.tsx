'use client'
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledFooter = styled.div`
    position: relative; 
    bottom: 0;
    height: 100px;            
    height: 170px;
    width: 100%;
    background-color: #9a4580;
    padding-top: 20px;
    img {
        display: block;
        height: 55px;
        margin: 0px auto;
        
        @media only screen and (min-width: 356px) and (max-width: 480px) {
            height: 35px;
        }
    
    }

`
const StyledContactWrapper = styled.div`
    color: #fff;
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    div {
        margin: 2.5px;
        display: block;
        p {
            margin: 10px;
            display: inline;
        }

        a {
            cursor: pointer; 
            color: #fff;
            text-decoration: none;
        }
    }
`

const Footer = () => {

    const [ contactInfo, setContactInfo ] = useState<any>();

    useEffect(() => {
        // ContactInfoApi.getContactInfo().then((info:any) => {
        //     setContactInfo(info);
        // })
    }, [])

    return (
        <StyledFooter>
             <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg"></img>
            <StyledContactWrapper>
                <div>
                    <p>{contactInfo?.phoneNumber}</p>
                    <p>{contactInfo?.email}</p>
                </div>
                <div>
                    <p>{ contactInfo?.adress }</p>
                </div>
                <div>
                    <a target="_blank" href={contactInfo?.regulation?.data?.attributes?.url}>Regulamin</a>
                </div>
                <div>
                    Created by JolyCodes
                </div>
            </StyledContactWrapper>
            {/* <CookieConsent
              containerClasses="cookieConsent"
              location="bottom"
              buttonText="Accept"
              cookieName="myAwesomeCookieName"
              style={{ borderRadius: 10, background: "rgb(156, 91, 137)"}}
              buttonStyle={{ width: 100, color: "#fff", borderRadius: 10, background: "#E3746D", fontSize: "16px" }}
              expires={150}
            >
              This website uses cookies to enhance the user experience.
              <a style={{marginLeft: 10, color: "#fff"}} href={contactInfo?.cookies?.data?.attributes?.url}>Polityka Cookie</a> */}
          {/* </CookieConsent> */}
        </StyledFooter>
    )
}

export default Footer;
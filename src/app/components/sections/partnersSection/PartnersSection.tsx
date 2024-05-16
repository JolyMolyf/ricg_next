import { useEffect, useState } from "react";
import PartnersApi from "@/app/utils/api/PartnersApi";
import styled from "styled-components";

const StyledPartnersSection = styled.div`
    max-width: 1440px;
    margin: 35px auto !important;
    width: 94%;
    p {
        text-align: center;
    }
`

const StyledPartners = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const StyledBrandWrapper = styled.div`
    margin: 30px;
    
    img {
        max-width: 100px;
    }

`

const PartnersSection = () => {
    const [ partners, setPartners ] = useState<any>([]);
    
    useEffect(() => {
        PartnersApi.getAllPartners().then((partner:any) => {
            setPartners(partner.data.data);
        })
    }, [])

    return (
        <StyledPartnersSection  id="partners" className="section-top-bottom-margin section-top-bottom-margin">
            <p className="blueSecondaryHeader section-header-top-bottom-margin">Partnerzy</p>
            <StyledPartners>
                { partners.map((partner:any, index:number) => {
                    return(
                        <StyledBrandWrapper key={index}>
                            <img src={partner?.attributes?.image?.data.attributes.url}></img> 
                        </StyledBrandWrapper>
                    )
                }) }
            </StyledPartners>
        </StyledPartnersSection>
    )
}

export default PartnersSection;
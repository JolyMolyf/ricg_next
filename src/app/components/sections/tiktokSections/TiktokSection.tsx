import { TikTokEmbed } from "react-social-media-embed"
import Slider from "react-slick"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { getAllVideos } from "@/app/utils/api/TiktokApi"

const StyledVidsBody = styled.div`
    width: 90%;
    max-width: 1440px;
    margin: 0 auto;
    .slick-slide {
        display: flex !important;
        justify-content: center;
        align-items:center;
    }

`


export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            rows: 1
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 1,
          }
        }
      ]
  };

const TiktokVidsSection = (props:any) => {

    const [ videos, setVideos ] = useState<Array<any>>();

    useEffect(() => {
        getAllVideos().then((vids) => {
            setVideos(vids);
        })
    }, [])

    return (
        <div className="section-top-bottom-margin ">
            <div className='blueSecondaryHeader imagetextSection-header section-header-top-bottom-margin'>Tik Toki</div>
            <StyledVidsBody>
                <Slider {...settings}>
                    { videos?.map((video, index) => {
                        return(
                            <div key={index}>
                                {/* <TikTokEmbed width={320} height={585} url={video}></TikTokEmbed> */}
                            </div>
                        )
                    })}
                </Slider>
            </StyledVidsBody>
        </div>
    )
}

export default TiktokVidsSection

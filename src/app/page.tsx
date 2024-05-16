'use client'
import "./homePageStyles.scss";
import HomeHeader from "./components/sections/header/HomeHeader";
import TargetSection from "./components/sections/targetSection/TargetSection";
import { useEffect, useState } from "react";
import { ImageTextBlock } from "./utils/models/ImageTextBlock";
import ImageTextSection from "./components/sections/imageTextSection/ImageTextSection";
import ImageTextSectionApi from "./utils/api/ImageTextSectionApi";
import AuthorSection from "./components/sections/authorSection/AuthorSection";
import SpecialitySection from "./components/sections/specialitySection/SpecialitySection";
import TiktokVidsSection from "./components/sections/tiktokSections/TiktokSection";
import PartnersSection from "./components/sections/partnersSection/PartnersSection";


export default function Home() {

  const [ imageTextSections, setImageTextSections ] = useState<Array<ImageTextBlock>>();
  
  const executeScroll = () => {

  };

  useEffect(() => {
    ImageTextSectionApi.getAllImageTextBlocks().then((blocks) => {
      setImageTextSections(blocks)
    })

  }, [])

  return (
    <div className="home">
      <div className="home-section">
        <HomeHeader/>
        <TargetSection/>
        { imageTextSections?.map((block, index: number) => {
          return (
            <div key={index}>
              <ImageTextSection   buttonAction={ executeScroll}
                    buttonName={"Dołącz do webinaru"}
                    imageLink={block.image}
                    title={block.title}
                    text={block.text}
                    reverse={block?.reverse}/>
            </div>
          )
        }) }
      <AuthorSection/>
      <SpecialitySection/>
      <PartnersSection/>
      </div>
    </div>
  );
}

'use client';

import MediaPlayer from '@/app/components/mediaPlayer/MediaPlayer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './playbackStyles.scss';
import { productApi } from '@/app/utils/api/ProductApi';
import { useParams } from 'next/navigation';
import { ILecture, ILecturePart } from '@/app/utils/models/product';
import { mediaApi } from '@/app/utils/api/MediaApi';
import PreviewCard from '@/app/components/common/previewCard/PreviewCard';

interface Props {}

const PlayBack = () => {
  
  const params = useParams();

  const [ lecture, setLecture ] = useState<ILecture>();
  const [ activePart, setActivePart ] = useState<{id: string, attributes: ILecturePart}>();
  const [ activeUrl, setActiveUrl ] = useState<string>('');

  useEffect(() => {
    productApi.getLectureById(params.lectureId as string ?? '').then((res) => {
      setLecture(res);
      setActivePart(res.lecture_parts.data?.[0]);
      mediaApi.getVideoUrl(activePart?.attributes.key).then((res) => {
        setActiveUrl(res);
      })
    });
  }, [])

  const handlePreviewCardClick = (lecturePartId: string) => {
    const lecturePart = lecture?.lecture_parts.data.find((part) => part.id === lecturePartId);
    setActivePart(lecturePart);
    mediaApi.getVideoUrl(lecturePart?.id).then((res) => {
      setActiveUrl(res);
    })
  }

  return (
    <div className='playback'>
      <div className='playback-player'>
        <div>
          <MediaPlayer config={{
            width: '100%',
            height: '450px'
          }} url={activeUrl}/>
        </div>
        <div className='playback-player-description'>
          <p className='playback-player-description-header'>{ activePart?.attributes.title }</p>
          <p>{lecture?.description}</p>
        </div>
      </div>
      <div className='playback-parts'>
        { lecture?.lecture_parts.data.map((lecturePart, index) => {
          const isSelected:boolean = lecturePart.id === activePart?.id;
          return (
            <div key={index} onClick={() => { handlePreviewCardClick(lecturePart.id) }}>
              <PreviewCard isSelected={isSelected} title={lecturePart.attributes.title} description={lecturePart.attributes.description}  image={lecturePart.attributes.previewImage?.data?.attributes?.url} /> 
            </div>
          )
        }) }
   
      </div>
    </div>
  )
}

export default PlayBack
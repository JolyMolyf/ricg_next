import React from 'react'
import ReactPlayer from 'react-player'

interface Props {
    config?: any;
    url: string;
}

const MediaPlayer = (props:Props) => {
    const { config, url } = props;
    const mediaPlayerConfig = {
        ...config,
        url
    }
  return (
    <div>
        <ReactPlayer {...mediaPlayerConfig} controls={true}/>
    </div>
  )
}

export default MediaPlayer
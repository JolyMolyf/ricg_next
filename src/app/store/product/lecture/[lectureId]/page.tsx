'use client'

import LecutrePage from '@/app/components/pages/lecturePage/LecutrePage'
import React from 'react'

interface Props {}

const LecturePageWrapper = () => {
  return <div>
    <LecutrePage isSelling={true}/>
  </div>
}

export default LecturePageWrapper
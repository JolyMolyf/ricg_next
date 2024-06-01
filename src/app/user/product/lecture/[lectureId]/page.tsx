'use client'

import LecutrePage from '@/app/components/pages/lecturePage/LecutrePage'
import { RootState } from '@/store';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

interface Props {}

const UserLecturePageWrapper = () => {
  
  const user = useSelector((state:RootState) => state.auth.user);
  const isAuthenticated = useSelector((state:RootState) => state.auth.authState );

  useEffect(() => {
    if ( !user || !isAuthenticated ) {
      redirect('/auth/login');
    }
  }, [])

  return (
    <div>
      <LecutrePage isSelling={false}/>
    </div>
  )
}

export default UserLecturePageWrapper
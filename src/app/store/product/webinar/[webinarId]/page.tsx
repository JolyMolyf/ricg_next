'use client'

import WebinarApi from '@/app/utils/api/WebinarApi';
import { RootState } from '@/store';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import WebinarPage from '@/app/components/pages/WebinarPage/WebinarPage';

interface Props {}

const StoreWebinarPageWrapper = () => {
  
  return (
   <div>
      <WebinarPage isSelling={true}/>
   </div>
  )
}

export default StoreWebinarPageWrapper
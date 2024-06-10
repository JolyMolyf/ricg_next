import ebookApi from '@/app/utils/api/EbookApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/common/inputs/button/Button'
import AuthorCard from '@/app/components/common/authorCard/AuthorCard'
import { IEbook } from '@/app/utils/models/product'
import EbookPage from '@/app/components/pages/ebookPage/EbookPage'

interface Props {}

export const metadata = {
  title: 'Demo - Ebook',
};


const EbookPageWrapper = () => {

  return (
    <div className=''>
        <EbookPage isSelling={true}/>
    </div>
  )
}

export default EbookPageWrapper;
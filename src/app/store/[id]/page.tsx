'use client'

import React, { useEffect } from 'react'

interface Props {
    params:any
}

const ProductDetailsPage = (props:Props) => {
    const { params } = props;
    useEffect(() => {
        
    }, [])

    return (
        <div>
            { params.id }
        </div>
    )
}

export default ProductDetailsPage;
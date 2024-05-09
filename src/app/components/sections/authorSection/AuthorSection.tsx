import AuthorApi from '@/app/utils/api/AuthorApi';
import { Author } from '@/app/utils/models/Author';
import React, { useState, useEffect } from 'react'
import AuthorCard from '../../common/authorCard/AuthorCard';

interface Props {}

export interface Slide {
    title: string,
    text: string,
    image: string, 

}


const AuthorSection = () => {
    const [ authors, setAuthors ] = useState<Array<Author>>([])

    useEffect(() => {
        AuthorApi.getAllAuthors().then((authors:Array<Author>) => {
            setAuthors(authors);
            const slides:Array<Slide> = authors.map((author) => {
                return {
                    title: author.name + ' ' +  author.surname,
                    text: author.description,
                    image: author.image
                }
            })
        });
    }, [])
  return (
    <div className=" authorSection standart-center-section section-top-bottom-margin ">
        <div className='blueSecondaryHeader imagetextSection-header section-header-top-bottom-margin'>Nasz Zespół</div>
        <div className="authorSection-wrapper">
        { authors.map((author, index: number) => {
                return(
                    <div key={index}>
                        <AuthorCard author={author} />
                    </div>
                )
            }) }
        </div>
    </div>
  )
}

export default AuthorSection
'use client';
import React, { useState } from 'react'
import './ressetStyles.scss';
import TextInput from '@/app/components/common/inputs/textInpputs/TextInput';
import Button from '@/app/components/common/inputs/button/Button';
import axios from 'axios';

interface Props {}

const page = () => {

    const [error, setError] = useState<any>();
    const [ info, setInfo ] = useState<string>('Wprowadz swoj email. Do Ciebie zostanie wyslany kod');
    const [ currentStep, setCurentStep ] = useState<number>(1);
    const [ isValid, setIsValid ] = useState<boolean>(false);
    const [ validationModel, setValidationModel ] = useState<any>({
        email: '',
        code: '',
    });

    const [ formFields, setFormFields ] = useState<any>({
        email: '',
        code: '',
    });

    const handleInputChange = (fieldName:  string, fieldValue: string) => {
        setFormFields({ ...formFields, [fieldName]: fieldValue })
    }

    const handleSubmit = () => {
        if ( formFields.email !== '' ) {
            setCurentStep(currentStep + 1);
            axios.post('http://localhost:3000/api/mail', { email: formFields.email });
        } else {
            setValidationModel({...validationModel, email: 'Wprowadz email'})
        }
        
    }

  return <div className='reset'>
    <div className='reset-form-header'>
            <h1>Zresetuj Haslo</h1>
            <p>{info}</p>
        </div>
    { currentStep === 1 && 
        <div className='reset-form'>
            <TextInput className='form-wrapper-input' onParentChange={handleInputChange} name='email' value={formFields.email} label='Email' error={validationModel.email}/>
            <Button label={'Dalej'} onParentClick={handleSubmit}/>
        </div>
    }

    { currentStep === 2 && 
        <div className='reset-form'>
            <p style={{ color: '#fff' }} >Kod zostal wyslany na Twoj email</p>
        </div>
    }
  </div>
}

export default page
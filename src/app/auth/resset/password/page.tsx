'use client'
import TextInput from '@/app/components/common/inputs/textInpputs/TextInput'
import Button from '@/app/components/common/inputs/button/Button'
import React, { useState } from 'react'
import '../ressetStyles.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import authApi from '@/app/utils/api/AuthApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice';

interface Props {}

const RessetPasswordPage = () => {
    
    const [error, setError] = useState<any>();
    const [ info, setInfo ] = useState<string>('Wprowadz nowe Haslo');
    const searchParmas = useSearchParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const [ validationModel, setValidationModel ] = useState<any>({
        password: '',
        passwordConfirmation: '',
    });

    const [ formFields, setFormFields ] = useState<any>({
        password: '',
        passwordConfirmation: '',
    });

    const handleInputChange = (fieldName:  string, fieldValue: string) => {
        setFormFields({ ...formFields, [fieldName]: fieldValue })
    }

    const handleSubmit = () => {
        if  (formFields.password !== '') {
            if ( formFields.passwordConfirmation !== '' ) {
                if (formFields.password === formFields.passwordConfirmation ) {
                    const code:string = searchParmas.get('code') as string;
                    authApi.updateUserPassword(formFields.password, formFields.passwordConfirmation, code ).then((res) => {
                        dispatch(loginUser(res))
                        router.push('/user');
                    }).catch((e) => {
                        console.error('[Resset Password Error]: Something went wrong while resseting password', e)
                        setError('Cos poszlo nie tak')
                    });
                } else {
                    setError('Hasla powinne byc jednakowe');
                }
            } else {
                setValidationModel({...validationModel, passwordConfirmation: 'Potwierdz nowe haslo'})    
            }
        } else {
            setValidationModel({...validationModel, password: 'Wprowadz nowe haslo'})
        } 
    }

  return (
    <div className='reset'>
         <div className='reset-form-header'>
            <h1>Zresetuj Haslo</h1>
            <p>{info}</p>
            <p>{error}</p>
        </div>
        <div className='reset-form'>
            <TextInput label='Haslo' name="password" onParentChange={handleInputChange} value={formFields.password} error={validationModel.password}/>
            <TextInput label='Potwierdz Haslo' name="passwordConfirmation" onParentChange={handleInputChange} value={formFields.passwordConfirmation} error={validationModel.passwordConfirmation}/>
            <Button label={'Dalej'} onParentClick={handleSubmit}/>
        </div>
    </div>
  )
}

export default RessetPasswordPage
'use client'

import Button from '@/app/components/common/inputs/button/Button';
import TextInput from '@/app/components/common/inputs/textInpputs/TextInput';
import React, { useState } from 'react';
import './loginStyles.scss';
import authApi from '@/app/utils/api/AuthApi';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface IProps {}

interface ILoginFields {
  email: string;
  password: string;
}

const page = (props: IProps) => {

  const dispatch = useDispatch();
  const router = useRouter();

    const [ validationModel, setValidationModel ] = useState<ILoginFields>({
      email: '',
      password: ''
    });

    const [ formFields, setFormFields ] = useState<ILoginFields>({
      email: '',
      password: ''
    });

    const [ isValid, setIsValid ] = useState<boolean>(false);

    const validateModel = (formFields:ILoginFields) => {
      const validationResult =  {
        email: formFields.email !== '' && formFields.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : 'Invalid email',
        password: formFields.password.length > 3 ? '' : 'Incorrect password'
      }
      const isValid = Object.values(validationModel).every((value) => value === '' );

      setValidationModel(validationResult);
      setIsValid(isValid)

      return isValid;
    }

    const handleInputChange = (fieldName:  string, fieldValue: string) => {
      setFormFields({ ...formFields, [fieldName]: fieldValue })
    }

    const onSubmit = (e:any) =>  {
      if ( validateModel(formFields) ) {
        authApi.logInUser(formFields).then((res) => {
          dispatch(loginUser(res))
          router.push('/user');
        });
      }
    }
        
  return (
    <div className='form'>
      <div className='form-header'>
        <h1>Welcome!</h1>
        <p>Zaloguj sie zeby miec dostep do swoich produktow</p>
      </div>
      <div className='form-wrapper'>
        <TextInput className='form-wrapper-input' onParentChange={handleInputChange} name='email' value={formFields.email} label='Email' error={validationModel.email}/>
        <TextInput className='form-wrapper-input' onParentChange={handleInputChange} name='password' value={formFields.password} label='Password' type='password' error={validationModel.password}/>
        <div className='form-wrapper-link'>
            <Link href='/auth/resset'>
              <p>Zapomniales Haslo?</p>
            </Link>
          </div>
        <Button label={'Zaloguj sie'} onParentClick={onSubmit}/>
      </div>
      <div className='form-wrapper-footer'>
        <Link href='/auth/register'>
          <p>Nie masz konta?</p>
        </Link>
      </div>
    </div>
  )
}

export default page
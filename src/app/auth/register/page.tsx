'use client'
import './registerStyled.scss';
import React, { useCallback, useEffect, useState } from 'react';
import TextInput from '../../common/inputs/textInpputs/TextInput';
import Button from '../../common/inputs/button/Button';
import authApi from '../../utils/api/AuthApi';
import lodash from 'lodash';

interface IProps {}

interface IFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const page = (props:IProps) => {

  const [ formFields, setFormFields ] = useState<IFormFields>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [ formValidationModel, setFormValidationModel ] = useState<IFormFields>();
  const [ isValid, setIsValid ] = useState<boolean>(false);

  const handleInputChange = (fieldName:  string, fieldValue: string) => {
    setFormFields({ ...formFields, [fieldName]: fieldValue })
  }

  const validateModel = (fields:IFormFields): any => {
    const validationResult = {
      email: fields.email !== '' && fields.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : 'Invalid email',
      lastName: fields.lastName !== '' ? '' : 'Required',
      firstName: fields.firstName !== '' ? '' : 'Required',
      password: fields.password !== '' && fields.password.length > 7 ? '' : 'Password is too short'
    };

    const isValid:boolean =  Object.values(validationResult).every((value) => value === '')
    setFormValidationModel(validationResult);
    setIsValid(isValid);
    return isValid;
  }

  const onSubmit = (e:any) => {
    const isValid:boolean = validateModel(formFields);
    console.log()
    if (isValid) {
      authApi.logInUser();
    } 
  }

  return (
    <div className='form'>
      <div className='form-header'>
        <h1>Welcome</h1>
        <p>Zarejestruj sie zeby miec dostep do swoich produktow</p>
      </div>
      <div className='form-wrapper'>
        <div className='form-wrapper-double'>
          <TextInput className='form-wrapper-double-input' name='firstName' value={formFields.firstName} onParentChange={handleInputChange} error={formValidationModel?.firstName} label='First Name'/>
          <TextInput className='form-wrapper-double-input' name='lastName' value={formFields.lastName} onParentChange={handleInputChange} error={formValidationModel?.lastName} label='Last Name'/>
        </div>
        <TextInput className='form-wrapper-input' name='email' value={formFields.email} onParentChange={handleInputChange} error={formValidationModel?.email} label='Email'/>
        <TextInput className='form-wrapper-input' name='password' value={formFields.password}onParentChange={handleInputChange} label='Password' type='password' error={formValidationModel?.password}/>
        <Button isDisabled={!isValid} label={'Zarejestruj sie'} onParentClick={onSubmit}/>
      </div>
    </div>
  )
}

export default page
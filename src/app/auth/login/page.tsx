'use client';
import Button from '@/app/common/inputs/button/Button';
import TextInput from '@/app/common/inputs/textInpputs/TextInput';
import React from 'react';
import './loginStyles.scss';

interface IProps {}

const page = (props: IProps) => {

    const onSubmit = (e:any) =>  {

    }
        
  return (
    <div className='form'>
      <div className='form-header'>
        <h1>Welcome</h1>
        <p>Zaloguj sie zeby miec dostep do swoich produktow</p>
      </div>
      <div className='form-wrapper'>
        <TextInput className='form-wrapper-input' name='email' value={''} label='Email'/>
        <TextInput className='form-wrapper-input' name='password' value={''} label='Password' type='password' error=''/>
        <Button label={'Zaloguj sie'} onParentClick={onSubmit}/>
      </div>
    </div>
  )
}

export default page
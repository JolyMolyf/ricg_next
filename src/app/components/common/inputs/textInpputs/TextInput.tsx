'use client'
import { TextField } from '@mui/material'
import React from 'react'
import './textInput.scss';

interface IProps {
    name: string;
    value: string;
    label?: string;
    error?: string;
    type?: string;
    className?: string;
    onParentChange?: (fieldName:string, fieldValue: string) => void; 
}

const TextInput = (props:IProps) => {
    const { name, value, error, label, type, className, onParentChange } = props;
    
    const onChange = (fieldName: string, fieldValue: string) => {

        onParentChange?.(fieldName, fieldValue)
    }

    return (
        <div className={`input ${className}`}>
            <label className='input-label' htmlFor={name}>{label}</label>
            <input type={type ?? 'text'} onChange={(e) => {
                onChange(e.target.name, e.target.value);
            }} placeholder={label} name={name} value={value}></input>
            <label className='input-label-error'>{error}</label>
        </div>)
}

export default TextInput
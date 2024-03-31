'use client'
import React from 'react'
import './buttonStyles.scss'

interface IProps {
    label: string; 
    isDisabled?: boolean;
    onParentClick?: (e:any) => void;
}

const Button = (props: IProps) => {
    const { label, isDisabled, onParentClick } = props;

    const onClick = (e:any) => {

        onParentClick?.(e);
    }

  return (
    <div className={`button-wrapper ${isDisabled ? 'inactive' : '' }`}>
        <button onClick={(e) => {
            onClick(e);
        }}> {label}</button>
    </div>
  )
}

export default Button
'use client'
import React from 'react'
import './buttonStyles.scss'

interface IProps {
    label: string; 
    isDisabled?: boolean;
    className?: string;
    onParentClick?: (e:any) => void;
}

const Button = (props: IProps) => {
    const { label, isDisabled, className, onParentClick } = props;

    const onClick = (e:any) => {
        e.stopPropagation();
        onParentClick?.(e);
    }

  return (
    <div className={`button-wrapper ${isDisabled ? 'inactive' : '' } ${className}`}>
        <button onClick={(e) => {
            onClick(e);
        }}> {label}</button>
    </div>
  )
}

export default Button
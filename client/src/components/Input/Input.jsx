import React from 'react';
import './Input.scss';

export default function Input({label, type, name, id, placeholder}) {
    return (
        <div className='input-container'>
            <label className='input-label' htmlFor={id}>{label}</label>
            <input className='input-input' type={type} name={name} id={id} placeholder={placeholder} />
        </div>
    );
}

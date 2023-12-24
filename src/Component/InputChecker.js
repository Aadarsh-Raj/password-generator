import React from 'react';
import './Style/inputchecker.css';

export default function InputChecker(prop) {
    const updateCheckBox =(e)=> prop.func(e);
  return (
    <div className='checker-item'>
      <input type="checkbox" onChange={(e) => updateCheckBox(e)}/> <p>{prop.content}</p>
    </div>
  )
}

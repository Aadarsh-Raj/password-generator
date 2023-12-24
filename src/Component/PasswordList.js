import React from 'react'

export default function PasswordList(prop) {
  const copyPass =()=> prop.copyFunc();
  const deleteItem = () => prop.deleteItem();
  return (
    <>
        <li className='list-item'>{prop.password} <i class="fa-solid fa-copy" onClick={copyPass}></i>  <i class="fa-solid fa-square-xmark" onClick={deleteItem}></i></li>
        <hr style={{color:"white", width:"100%"}}/>
    </>
  )
}

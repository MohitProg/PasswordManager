import React, { useContext } from 'react'
import DispatchContext from '../Context/DispatchContext'

const Item = ({account,password,email,id,updatepassword,mode}) => {
    const dispatch=useContext(DispatchContext)

  return (
    <>
    
    <div key={id} className={`min-h-[100px] ${mode==="DarkMode"?"bg-white":"bg-gray-400"} text-${mode==="DarkMode"?"black":"black"} shadow rounded-sm mt-2 `}>
        <div className='p-2'>
        <a  target="_blank" href={account} className='text-lg font-semibold'>{account}</a>
        <h1>{email}</h1>
        <h1>{password}</h1>

        </div>
        <div className='bg-gray-300  flex justify-between text-3xl'>
        <i className="bi bi-pencil-square cursor-pointer" onClick={()=>updatepassword(id)}></i>
        <i className="bi bi-trash-fill  cursor-pointer" onClick={()=>dispatch({ type: "DELETE", payload: id })}></i>
        </div>
    </div>

    </>
    )
}

export default Item
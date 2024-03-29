import React from 'react'

const Item = ({account,password,email,deletepassword,id,updatepassword}) => {
    

  return (
    <>
    
    <div key={id} className='min-h-[100px] bg-gray-200 shadow rounded-sm mt-2 '>
        <div className='p-2'>
        <a  target="_blank" href={account} className='text-lg font-semibold'>{account}</a>
        <h1>{email}</h1>
        <h1>{password}</h1>

        </div>
        <div className='bg-gray-400  flex justify-between text-3xl'>
        <i className="bi bi-pencil-square cursor-pointer" onClick={()=>updatepassword(id)}></i>
        <i className="bi bi-trash-fill  cursor-pointer" onClick={()=>deletepassword(id)}></i>
        </div>
    </div>

    </>
    )
}

export default Item
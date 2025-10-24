import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

const ClosePopUp = () => {
  const navigate = useNavigate();

  const handleClick= ()=>{
    navigate('..')
  }
  return (
    <button onClick={handleClick} className='active  text-primary border border-primary px-4 py-1 cursor-pointer hover:shadow-md rounded-sm absolute top-[10px] right-[10px] transition'>
        <CloseIcon style={{fontSize : 18}}/>
    </button>
  )
}

export default ClosePopUp

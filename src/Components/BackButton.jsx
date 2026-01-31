import React from 'react'
import { useNavigate } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({replace = false}) => {
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate("..",{replace : replace});
    }
  return (
   <button onClick={handleNavigate} className='back rounded-sm py-2  cursor-pointer  flex items-center gap-1 bg-white !text-black shadow-sm !hover:bg-WHITE !px-3 !text-sm select-none'>
    <ArrowBackIcon style={{fontSize : 18}}/>  Back
   </button>
  )
}

export default BackButton

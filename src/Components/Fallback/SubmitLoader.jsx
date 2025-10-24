import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const SubmitLoader = () => {
  return (
    <aside className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75 rounded-xl'>
         <CircularProgress color="inherit" />
    </aside>
  )
}

export default SubmitLoader

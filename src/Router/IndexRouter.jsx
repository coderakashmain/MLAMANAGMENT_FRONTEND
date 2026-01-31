import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import CustomSnackbar from '../Components/Snackbar'
const IndexRouter = () => {

  return (
    
    <>
      <CustomSnackbar/>
      <Outlet/>
    </>
  )
}

export default IndexRouter

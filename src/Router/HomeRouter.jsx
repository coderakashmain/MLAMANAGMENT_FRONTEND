import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet,useNavigate } from 'react-router'
import Header from '../Components/Header'
import AuthService from '../APIs/authService'
import Loader from '../Components/Fallback/Loader'

import { useAuth } from '../Context/AuthProvider'

const HomeRouter = () => {
  const {loading,error,adminData,handleCheck} = useAuth();
  const navigate =  useNavigate();

  const accesstoken = AuthService.getAccessToken();

    useEffect(()=>{
        handleCheck();
    },[]);

  // useEffect(()=>{
  //    if(error && !adminData){
  //     navigate('/login')
  //   };
  
  // },[error,adminData])
  
  
  
   
    if(loading){
      <Loader/>
    }


  return (
    <>
    {!accesstoken && (<section
      id="homeRouter"
      className="w-full h-screen grid
      grid-cols-[200px_1fr]           
        md:grid-cols-[240px_1fr]        
        lg:grid-cols-[260px_1fr] 
        overflow-hidden"
    >
      <aside className="h-full ">
        <Sidebar />
      </aside>

      <main className="h-full overflow-y-auto  ">
       <Header/> 
       <div className=' px-3'>

        <Outlet />
       </div>
      </main>
    </section>)}
    </>
  )
}

export default HomeRouter

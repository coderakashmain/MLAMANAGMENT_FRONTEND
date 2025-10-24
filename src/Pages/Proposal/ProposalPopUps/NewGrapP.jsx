

import React, { useState } from 'react'
import Popup from '../../../Components/Popup'
import ClosePopUp from '../../../Components/ClosePopUp'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router'
import api from '../../../APIs/apiService'
import { useApiPromise } from '../../../Hooks/useApi'
import SubmitLoader from '../../../Components/Fallback/SubmitLoader'

const NewGrapP = () => {
  const [gramP, setGramP] = useState('');
  const navigate = useNavigate();
  const {run,loading,error} = useApiPromise();
  const style = {
    "& .MuiOutlinedInput-root": {

      "&:hover fieldset": {
        borderColor: "#99a1af",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--color-primary)",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--color-primary)",
    },
  };
  const handleChange = (e) => {
    setGramP(e.target.value);
  };
  

  const handleSubmit = async (e)=>{
     e.preventDefault();
     if(!gramP ) return;
     
    await run(()=> api.post('/admin/add/AddGp',{gramP},{token : false,retryOnAuthFail : false}));
     
    navigate('..');
  };


  return (
    <Popup>
      
      <div className=' w-100 bg-white rounded-xl relative px-4 py-4'>
        {/* <ClosePopUp /> */}

        <h4 className='text-xl mb-2 '>Gram Panchayat</h4>
        <p className='text-xs mb-3 '>Before submit check the Gram Panchayat name and correct it.</p>
       { error && ( <p className='text-xs text-error '>{error}</p>)}

        <form onSubmit={handleSubmit} className='mt-5'>
          <TextField
            required
            label="Gp"
            size="small"
            value={gramP}
            onChange={handleChange}
            className="rounded-sm bg-white w-full "
            sx={style}
          />
          <div className='flex justify-end gap-8 mt-8  text-[0.9rem] text-primary'>
            <button onClick={(e)=>{ 
              e.preventDefault();
              navigate('..')}} className='cursor-pointer'>Cancel</button>
            <button disabled={!gramP} type='submit' className={` ${!gramP  ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Submit</button>
          </div>
        </form>
    {loading &&(  <SubmitLoader/>)}
      </div>

    </Popup>
  )
}

export default NewGrapP


import React, { useState } from 'react'
import Popup from '../../../Components/Popup'
import ClosePopUp from '../../../Components/ClosePopUp'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router'
import api from '../../../APIs/apiService'
import { useApiPromise } from '../../../Hooks/useApi'
import { useBlock } from '../../../Context/BlocksProvider'
import SubmitLoader from '../../../Components/Fallback/SubmitLoader'

const NewBlock = () => {
  const [block, setBlock] = useState('');
  const navigate = useNavigate();
  const {setBlockList} = useBlock();
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
    setBlock(e.target.value);
  };
  

  const handleSubmit = async (e)=>{
     e.preventDefault();
     if(!block ) return;
     
     const res = await run(()=> api.post('/admin/add/AddBlock',{block},{token : false,retryOnAuthFail : false}),"New Block added.");
    //  setBlockList((prev)=>[...prev,res.data])
    navigate('..');
  };


  return (
    <Popup>
      
      <div className=' w-100 bg-white rounded-xl relative px-4 py-4'>
        {/* <ClosePopUp /> */}

        <h4 className='text-xl mb-2 '>Block</h4>
        <p className='text-xs mb-3 '>Before submit check the block name and correct it.</p>
       { error && ( <p className='text-xs text-error '>{error}</p>)}

        <form onSubmit={handleSubmit} className='mt-5'>
          <TextField
            required
            label="Block"
            size="small"
            value={block}
            onChange={handleChange}
            className="rounded-sm bg-white w-full "
            sx={style}
          />
          <div className='flex justify-end gap-8 mt-8  text-[0.9rem] text-primary'>
            <button onClick={(e)=>{ 
              e.preventDefault();
              navigate('..')}} className='cursor-pointer'>Cancel</button>
            <button disabled={!block} type='submit' className={` ${!block  ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Submit</button>
          </div>
        </form>
    {loading &&(  <SubmitLoader/>)}
      </div>

    </Popup>
  )
}

export default NewBlock

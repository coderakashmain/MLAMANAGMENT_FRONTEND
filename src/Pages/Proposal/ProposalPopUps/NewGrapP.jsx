import React, { useEffect, useState } from 'react'
import Popup from '../../../Components/Popup'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useLocation, useNavigate } from 'react-router'
import api from '../../../APIs/apiService'
import { useApiPromise } from '../../../Hooks/useApi'
import SubmitLoader from '../../../Components/Fallback/SubmitLoader'
import { useBlock } from '../../../Context/BlocksProvider'
import { useGp } from '../../../Context/GpProvider'
const NewGrapP = React.memo(() => {
  const [gramP, setGramP] = useState('');
  const location = useLocation();
  const { block: defaultBlock, gp } = location.state ?? {};
 const [block, setBlock] = useState( null);
  const navigate = useNavigate();
  const { blocksList } = useBlock();
  const { run, loading, error } = useApiPromise();
  const { setGpList } = useGp();

useEffect(() => {
  if (defaultBlock && blocksList?.length) {
    const matchedBlock = blocksList.find(b => b.name === defaultBlock);
    setBlock(matchedBlock || null);
  }
}, [defaultBlock, blocksList]);

  const style = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#99a1af" },
      "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gramP || !block) return;

    const res = await run(() =>
      api.post(
        '/admin/add/AddGp',
        { gramName: gramP, blockId: block.id },
        { token: false, retryOnAuthFail: false }
      ), "New Gram Panchayat Added."
    );
    // setGpList((prev)=>[...prev,res.data]);

    navigate('..');
  };

  return (
    <Popup>
      <div className='w-100 bg-white rounded-xl relative px-4 py-4'>
        <h4 className='text-xl mb-2'>Gram Panchayat</h4>
        <p className='text-xs mb-3'>
          Before submit check the Gram Panchayat name and correct it.
        </p>

        {error && <p className='text-xs text-error'>{error}</p>}

        <form onSubmit={handleSubmit} className='mt-5'>

          <Autocomplete
            options={blocksList}
            getOptionLabel={(option) => option?.name ?? ""}
            value={block}
            onChange={(e, newValue) => setBlock(newValue)}
             isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => (
              <TextField {...params} label="Block" size="small" sx={style} />
            )}
            className='mb-2 relative z-12'
          />

          <TextField
            required
            label="Gram Panchayat"
            size="small"
            value={gramP}
            onChange={(e) => setGramP(e.target.value)}
            className="rounded-sm bg-white w-full mt-4"
            sx={style}
          />

          <div className='flex justify-end gap-8 mt-8 text-[0.9rem] text-primary'>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('..');
              }}
              className='cursor-pointer'
            >
              Cancel
            </button>

            <button
              disabled={!gramP || !block}
              type='submit'
              className={`${!gramP || !block ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Submit
            </button>
          </div>
        </form>

        {loading && <SubmitLoader />}
      </div>
    </Popup>
  )
})

export default NewGrapP;

import React, { useState } from 'react';
import Popup from '../../../Components/Popup';
import ClosePopUp from '../../../Components/ClosePopUp';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import api from '../../../APIs/apiService';
import { useApiPromise } from '../../../Hooks/useApi';
import SubmitLoader from '../../../Components/Fallback/SubmitLoader';
import { useFundsources } from '../../../Context/FundSourceProvider';
const NewFundSources = () => {
  const [fundSource, setFundSource] = useState('');
  const navigate = useNavigate();
  const { run, loading, error } = useApiPromise();
  const { setFundsourceList } = useFundsources();

  const style = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#99a1af" },
      "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
  };

  const handleChange = (e) => {
    setFundSource(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fundSource) return;
    const shortCode = fundSource
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');

    const res = await run(() =>
      api.post('/admin/add/AddFundSources', { name: fundSource, short_code: shortCode }, { token: false, retryOnAuthFail: false }),"Fund Source added."
    );

    // setFundsourceList((prev) => [...prev, res.data])

    navigate('..');
  };

  return (
    <Popup>
      <div className='w-100 bg-white rounded-xl relative px-4 py-4'>
        <h4 className='text-xl mb-2'>Fund Source</h4>
        <p className='text-xs mb-3'>Before submit check the fund source name and correct it.</p>

        {error && <p className='text-xs text-error'>{error}</p>}

        <form onSubmit={handleSubmit} className='mt-5'>
          <TextField
            required
            label="Fund Source"
            size="small"
            value={fundSource}
            onChange={handleChange}
            className="rounded-sm bg-white w-full"
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
              disabled={!fundSource}
              type='submit'
              className={`${!fundSource ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Submit
            </button>
          </div>
        </form>

        {loading && <SubmitLoader />}
      </div>
    </Popup>
  );
};

export default NewFundSources;

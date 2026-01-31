import React, { useState, useEffect } from 'react';
import Popup from '../../../Components/Popup';
import ClosePopUp from '../../../Components/ClosePopUp';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation, useNavigate } from 'react-router';
import { useGp } from '../../../Context/GpProvider';
import { useBlock } from '../../../Context/BlocksProvider';
import { useApiPromise } from '../../../Hooks/useApi';
import api from '../../../APIs/apiService';
import SubmitLoader from '../../../Components/Fallback/SubmitLoader';
import { useVillage } from '../../../Context/VillagePorvider';

const NewVillage = () => {
  const navigate = useNavigate();
  const { blocksList } = useBlock();
  const { run, loading, error } = useApiPromise();
  const {gpList  ,getGp,setGpList} = useGp();
  const [block, setBlock] = useState(null);
  const location = useLocation();
  const [gp, setGp] = useState(null);
  const [village, setVillage] = useState('');
  const {setVillageList} = useVillage();
    const { block: defaultBlock, gp : defaultGp } = location.state ?? {};


    useEffect(() => {
      if (defaultBlock && blocksList?.length) {
        const matchedBlock = blocksList.find(b => b.name === defaultBlock);
        setBlock(matchedBlock || null);
      }
    }, [defaultBlock, blocksList]);
    useEffect(() => {
      if (defaultGp && gpList?.length) {
        const matcgp = gpList.find(b => b.name === defaultGp);
        setGp(matcgp || null);
      }
    }, [defaultGp, gpList]);

  const style = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#99a1af" },
      "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
  };


  useEffect(() => {
    const fetchGps = async () => {
      if (!block) return;
      getGp(block.id);
    }
    fetchGps();
  }, [block]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!village || !gp || !block) return;

   const res = await run(() =>
      api.post(
        '/admin/add/AddVillage',
        {
          villageName : village,
          gpId: gp.id,
        },
        { token: false, retryOnAuthFail: false }
      ),"Village added."
    );


    // setVillageList((prev)=>[...prev,res.data])
    navigate('..');
  };

  return (
    <Popup>
      <div className="w-100 bg-white rounded-xl relative px-4 py-4">
        <h4 className="text-xl mb-2">Village</h4>
        <p className="text-xs mb-3">
          Before submit check the Village name and correct it.
        </p>

        {error && <p className="text-xs text-error">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-5">
          
          <Autocomplete
            options={blocksList}
             getOptionLabel={(option) => option?.name ?? ""}
            value={block}
              isOptionEqualToValue={(o, v) => o.id === v.id}
            onChange={(e, newValue) => {
              setBlock(newValue);
              setGp(null);
              setGpList([]);
            }}
            className='mb-2 relative z-12'
            renderInput={(params) => (
              <TextField {...params} label="Block" size="small" sx={style} />
            )}
          />

          
          <Autocomplete
            disabled={!block}
            options={gpList}
            getOptionLabel={(option) => option?.name ?? ""}
            value={gp}
            onChange={(e, newValue) => setGp(newValue)}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            className='mb-2 relative z-12'
            renderInput={(params) => (
              <TextField
                {...params}
                label="Gram Panchayat"
                size="small"
                sx={style}
                className="mt-4"
              />
            )}
          />

        
          <TextField
            required
            label="Village"
            size="small"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="rounded-sm bg-white w-full mt-4"
            sx={style}
          />

          <div className="flex justify-end gap-8 mt-8 text-[0.9rem] text-primary">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('..');
              }}
              className="cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={!village || !gp || !block}
              type="submit"
              className={`${
                !village || !gp || !block
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
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

export default NewVillage;

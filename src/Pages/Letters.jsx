import React, { useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { useProposalList } from '../Context/ProposalProvider';
import { downloadFile } from '../Utils/downloadFile';
import { useLetterList } from '../Context/LetterProvider';
import Table from '../Components/Table';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { formatDateTime } from "../utils/formatDateTime";
import { Chip, Menu, MenuItem } from '@mui/material';
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import LetterTable from '../Components/LetterTable';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from "lodash";


const Letters = () => {
  const [dropdown, setDropdown] = useState(false);
  const [filterLetterList,setFilterLetterList] = useState([]);
  const { letterList, setLetterList } = useLetterList();
  const { run, loading, error } = useApiPromise();
  const statuses = ["Pending", "Sent", "Draft", "Received"];
    const [searchValue,setSearchValue] = useState('');

  useEffect(()=>{
    setFilterLetterList(letterList);

  },[letterList])

const getChildRows = (row) => {
 
  if (row.referrals && row.referrals.length > 0) {
    return row.referrals.map((ref) => ({
      id: ref.id,
      ref_no: ref.referral_no,
      subject: ref.subject,
      attachments : ref.attachments,
      recipient_name: ref.referred_to_name,
      recipient_designation: ref.referred_to_designation,
      next_followup_date: row.next_followup_date, 
      status: ref.status,
      created_at: ref.created_at,
      parent_ref_no: row.ref_no, 
    }));
  }

  // If no referrals exist → no children
  return [];
};



  const columns = [



    {
    field: "ref_no",
    headerName: "Ref",
    flex: 1.2,
    renderCell: (params) => {
      const row = params.row;
      const childCount = row.referrals?.length || 0;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>{row.ref_no}</span>
          {childCount > 0 && (
            <Chip
              label={childCount}
              size="small"
              color="secondary"
              sx={{
                fontSize: "0.75rem",
                height: "22px",
                borderRadius: "50%",
                color: "#fff",
              }}
            />
          )}
        </div>
      );
    },
  },
    { field: "subject", headerName: "Subject", flex: 2 },
    { field: "recipient_name", headerName: "To", flex: 1 },
    // { field: "recipient_designation", headerName: "Position", flex: 1 },
    {
      field: "next_followup_date", headerName: "Next Follow Up", flex: 1,
      renderCell: (params) => (
        <span>{formatDateTime(params.row.next_followup_date)}</span>
      ),
    },
    { field: "letter_type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = async (newStatus) => {
          setAnchorEl(null);
          if (!newStatus || newStatus === params.value) return;


          try {
            await run(() => api.put(`/admin/letters/${params.row.id}/status`, { status: newStatus }), "Status Update.");
            setLetterList(prev =>
              prev.map(item =>
                item.id === params.row.id
                  ? { ...item, status: newStatus }
                  : item
              )
            );




          } catch (error) {
            console.error("Error updating status", error);
          }
        };


        const colorMap = {
          sent: "primary",
          pending: "secondary",
          draft: "warning",
          received: "success",
        };

        return (
          <>
            <Chip
              label={params?.value?.toLowerCase()}
              color={colorMap[params.value.toLowerCase()] || "secondary"}
              variant="outlined"
              size="small"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={handleClick}
            />

            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
              {statuses.map((status) => (
                <MenuItem
                  key={status}
                  selected={status === params.value}
                  onClick={() => handleClose(status)}
                >
                  {status}
                </MenuItem>
              ))}
            </Menu>
          </>
        );
      },
    },


    {
      field: "attachments",
      headerName: "Letter",
      flex: 1,
      renderCell: (params) => {
        const fileUrl = params.row.attachments?.[0]?.file; // safe access
        if (!fileUrl) return <span>No File</span>;

        return (
          <div className="">
            <button
              onClick={() => downloadFile(fileUrl)}
              className="cursor-pointer text-primary"
            >
              <PictureAsPdfIcon />
            </button>
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 1,
      renderCell: (params) => (
        <span>{formatDateTime(params.row.created_at)}</span>
      ),
    }



  ];



 const handleSearch = debounce((value, list, setList) => {
  const lowerSearch = value.toLowerCase();
  const datalist = list.filter(e =>
    e.ref_no.toLowerCase().includes(lowerSearch) ||
    e.recipient_name.toLowerCase().includes(lowerSearch) ||
    e.recipient_designation.toLowerCase().includes(lowerSearch) ||
    e.subject.toLowerCase().includes(lowerSearch) ||
    e.status.toLowerCase().includes(lowerSearch)  
  );
  setList(datalist);
}, 300);

useEffect(() => {
  if (searchValue) {
    handleSearch(searchValue, letterList, setFilterLetterList);
  } else {
    setFilterLetterList(letterList);
  }
}, [searchValue, letterList]);


  return (
    <section id='lettes' className="mb-10">
      <header className='flex justify-end mb-5 mt-9'>
        <div className="relative flex gap-2">
          <div className='border flex items-center bg-white  border-gray-300 rounded-sm p-1  text-sm  transition-all gap-2 hover:shadow-md hover:border-gray-400 '>
            <div className='flex items-center gap-1 pl-1'>
              <SearchIcon style={{ fontSize: 20 }} className='text-gray-400 ' />


              <input type="text" id='searchbox' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Search Letter ...' className='group h-full outline-none' />
            </div>
            <button className='btn bg-primary'>
               <SearchIcon style={{ fontSize: 20 }} className='text-white' />
            </button>

          </div>
          <button onClick={() => setDropdown((prev) => !prev)} className='btn bg-primary !text-sm text-white rounded shadow  transition duration-300 ' >
            <AddCircleIcon className='mr-1' />
            New Letter


          </button>
          <AnimatePresence>
            {dropdown && (
              <motion.div
                initial={{ y: 10, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 5, opacity: 0.3 }}
                transition={{ duration: 0.1 }}
                className="absolute top-[110%] right-0 bg-white rounded shadow-lg   z-2"
              >
                <ul>
                  <li>
                    <NavLink to="generalletters" className="px-3 pt-4  block text-nowrap text-sm text-start">
                      <AddCircleIcon className='mr-1' sx={{ fontSize: 20 }} />  General Letters
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="proposalletters" className="px-3 py-4 block text-nowrap text-sm text-start sele">
                      <AddCircleIcon className='mr-1' sx={{ fontSize: 20 }} />  Proposal Letters
                    </NavLink>
                  </li>
                </ul>


              </motion.div>)}
          </AnimatePresence>
        </div>
      </header>
      <LetterTable
        dataname="Letters"
        columns={columns}
        rows={filterLetterList.filter((x) => !x.parent_ref_no)}
        getChildRows={getChildRows}
      />

    </section>
  )
}

export default Letters

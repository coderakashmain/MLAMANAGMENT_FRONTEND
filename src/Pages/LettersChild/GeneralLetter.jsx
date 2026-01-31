

import { lazy } from 'react';
import { Autocomplete, Box, Button, Chip, Radio, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import api from '../../APIs/apiService';
import { useApiPromise } from '../../Hooks/useApi';
const Popup = lazy(() => import("../../Components/Popup"))
import { Suspense } from 'react';
import Loader from '../../Components/Fallback/Loader';
import { downloadFile } from '../../Utils/downloadFile';
import BackButton from '../../Components/BackButton';
import { useLetterList } from '../../Context/LetterProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDateTime } from '../../utils/formatDateTime';
import dayjs from 'dayjs';
import Table from '../../Components/Table';



const GeneralLetter = () => {
  const [selectedProposals, setSelectedProposals] = React.useState([]);
  const { loading, error, run } = useApiPromise();
  const [popUp, setPopUp] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { setLetterList, letterList } = useLetterList();
  const [letterType, setLetterType] = useState('general');
  const [letterState, setLetterState] = useState(false);
  const statusList = ["Pending", "Sent", "Draft", "Received"];

  const [formData, setFormDAta] = useState({
    recipient_name: '',
    recipient_designation: "",
    recipient_address: "",
    letterFrom: '',
    subject: '',
    body: '',
    proposals: [],
    type: letterType,
    next_followup_date: null,
    status: ''
  })

  useEffect(() => {
    setFormDAta({
      ...formData,
      type: letterType
    });


  }, [letterType]);


  useEffect(() => {
    if (letterType === "refferal") {
      setLetterState(true);
    } else {
      setLetterState(false);
    }

  }, [letterType])


  useEffect(() => {
    if (selectedProposals) {
      setFormDAta({
        ...formData,
        proposals: [selectedProposals]
      })
    }

  }, [selectedProposals])



  //For multiple

  // const handleSelect = (row) => {
  //   setSelectedProposals((prev) => {
  //     const exists = prev.find((item) => item.id === row.id);
  //     return exists
  //       ? prev.filter((item) => item.id !== row.id)
  //       : [...prev, row];
  //   });
  // };

  const handleSelect = (row) => {
    setSelectedProposals((prev) =>
      prev?.id === row.id ? null : row
    );
  };


  const columns = [
    {
      field: "id",
      headerName: "Select",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <div className='h-full w-full flex items-center  '>

          <input
            className='size-4'
            type='checkbox'
            checked={selectedProposals?.id === params.row.id}

            onChange={() => handleSelect(params.row)}

          />
        </div>

      )
    },
    { field: "ref_no", headerName: "Ref", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 2 },
    { field: "recipient_name", headerName: "To", flex: 1 },
    {
      field: "next_followup_date", headerName: "Next Follow Up", flex: 1,
      renderCell: (params) => (
        <span>{formatDateTime(params.row.next_followup_date)}</span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {

        const colorMap = {
          sent: "primary",
          pending: "warning",
          draft: "warning",
          received: "success",
        };

        return (
          <>
            <Chip
              label={params?.value?.toLowerCase()}
              color={colorMap[params.value] || "secondary"}
              variant="outlined"
              size="small"
              sx={{ userSelect: "none" }}
            />

          </>
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
  ]



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

  }

  const handleChange = (name, value) => {
    setFormDAta({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await run(() => api.post('/admin/letters/newletter', formData), "Letter created Successfully.");
    if (!res || !res.data) return;

    const { letter, type, filePath } = res.data;

    setPopUp(true);
    setResponseData(res);
    if (type === "refferal") {
      const parentRef = letter.letter_ref_no; 
      setLetterList((prev) =>
        prev.map((l) =>
          l.ref_no === parentRef
            ? {
              ...l,
              referrals: [
                ...(l.referrals || []),
                {
                  ...letter,
                  isChild: true, 
                },
              ],
            }
            : l
        )
      );

     
      setExpandedRows((prev) => [...new Set([...prev, parentRef])]);
    } else {
     
      setLetterList((prev) => [
        {
          ...letter,
          referrals: letter.referrals || [],
        },
        ...prev,
      ]);
    }


    if (filePath) {
      window.open(`${BASE_URL}${filePath}`, "_blank");
    }

    setFormDAta({
      recipient_name: '',
      recipient_designation: "",
      recipient_address: "",
      letterFrom: '',
      subject: '',
      body: '',
      proposals: [],
      next_followup_date: null,
      status: ''
    });

  }

  const handleReset = () => {
    setFormDAta({
      recipient_name: '',
      recipient_designation: "",
      recipient_address: "",
      letterFrom: '',
      subject: '',
      body: '',
      proposals: [],
      next_followup_date: null,
      status: ''

    });
    setSelectedIds([]);
  };



  return (
    <section id='proposal_letter' className="mb-10 mt-2" >
      <div className='flex justify-between items-center'>

        <BackButton />
        <div className='border border-primary text-primary flex  bg-white justify-between rounded-[2rem]  text-xs overflow-hidden select-none'>
          <div
            onClick={() => setLetterType("general")}
            className={`px-5 py-1 cursor-pointer font-bold ${!letterState ? "bg-primary text-white " : ""}`}>New</div>
          {/* <div className="w-[1px] bg-gray-400"></div> */}
          <div
            onClick={() => setLetterType("refferal")}
            className={`px-2 py-1 cursor-pointer font-bold  ${letterState ? "bg-primary text-white " : ""}`}>Refferal</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {letterState && (<div className='  '>

          <h2 className='pt-5 mb-3 '>Select Letter </h2>

          <Table columns={columns} rows={letterList} />
        </div>)}


        <h2 className='mt-10'>Letters Details</h2>
        <div className=' !mt-3  rounded-sm px-5 py-2 pb-10'>
          <div className=" ">
            <div className="w-full mt-5">
              <p className="text-sm mb-2 font-bold">Letter From  <span className="text-error">*</span></p>
              <TextField
                label="From"
                required
                size="small"
                fullWidth
                sx={style}
                value={formData.letterFrom}
                onChange={(e) => handleChange("letterFrom", e.target.value)}
                className="rounded-sm bg-white"
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
            <div className="w-full mt-5">
              <p className="text-sm mb-2 font-bold">Recipient Name  <span className="text-error">*</span></p>
              <TextField
                required
                label="To"
                size="small"
                fullWidth
                sx={style}
                value={formData.recipient_name}
                onChange={(e) => handleChange("recipient_name", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="w-full mt-5">
              <p className="text-sm mb-2 font-bold">Recipient Designation <span className="text-error">*</span></p>
              <TextField
                required
                label="Designation"
                size="small"
                fullWidth
                sx={style}
                value={formData.recipient_designation}
                onChange={(e) => handleChange("recipient_designation", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="w-full mt-5">
              <p className="text-sm mb-2 font-bold">Recipient Address <span className="text-error">*</span></p>
              <TextField
                required
                label="Address"
                size="small"
                fullWidth
                sx={style}
                value={formData.recipient_address}
                onChange={(e) => handleChange("recipient_address", e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="text-sm mb-2 font-bold">Subject  <span className="text-error">*</span></p>
            <TextField
              required
              label="Subject"
              size="small"
              fullWidth
              sx={style}
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="w-full mt-5">
            <p className="text-sm mb-2 font-bold">Body  <span className="text-error">*</span></p>
            <TextField
              label="Body"
              multiline
              rows={3}
              fullWidth
              sx={style}
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              className="bg-white"
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-3'>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <div className="w-full ">
                <p className="text-sm mb-2 font-bold">Next Follow-up Date</p>
                <DatePicker
                  label="Select Follow-up Date"
                  value={formData.next_followup_date ? dayjs(formData.next_followup_date) : null}
                  onChange={(newValue) =>
                    handleChange("next_followup_date", newValue ? newValue.format("YYYY-MM-DD") : null)
                  }
                  slotProps={{ textField: { fullWidth: true, sx: style, className: "bg-white" } }}
                />
              </div>
            </LocalizationProvider>
            <div className="w-full">
              <p className="text-sm mb-2 font-bold">Proposal Type <span className="text-error">*</span> </p>
              <Autocomplete
                freeSolo
                options={statusList}
                value={formData.status || ""}
                sx={style}
                onChange={(e, newValue) => {

                  handleChange("status", newValue);

                }}
                onInputChange={(e, newInputValue) => {

                  handleChange("status", newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Proposal Type" size="medium" className="bg-white" />
                )}
              />

            </div>
          </div>

          <Box className="flex justify-end gap-3 md:col-span-2 mt-4   ">
            <Button
              onClick={handleReset}
              variant="outlined"
              color="error"
              size="small"
              className="rounded-sm"
            >
              Reset
            </Button>

            <button
              disabled={loading}
              className={`btn bg-primary text-alwaysWhite rounded-sm shadow-sm ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </Box>


        </div>
      </form>
      {popUp && (
        <Suspense fallback={<Loader />}>
          <Popup>
            <div className="bg-white rounded-sm p-4 w-96 relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  setPopUp(false);
                  setResponseData(null);
                }}
              >
                ✖
              </button>

              {/* Message */}
              {responseData?.message ? (
                <p className="text-center font-semibold mb-4">{responseData.message}</p>
              ) : (
                <p className="text-center font-semibold mb-4">No message received</p>
              )}

              {/* Action Buttons */}
              {responseData?.data?.filePath && (
                <div className="flex justify-around mt-6">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (responseData.data?.filePath) {
                        window.open(responseData.data.filePath, "_blank");
                      }
                    }}
                  >
                    View
                  </button>

                  <button
                    className="bg-success text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (responseData.data?.filePath) {
                        downloadFile(responseData.data.filePath);
                      }
                    }}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </Popup>
        </Suspense>
      )}

    </section>
  )
}

export default GeneralLetter


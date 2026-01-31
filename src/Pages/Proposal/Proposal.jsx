import React, { lazy, Suspense, useEffect, useState } from 'react'
import Table from '../../Components/Table';
import { Chip, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useProposalList } from '../../Context/ProposalProvider';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
const Popup = lazy(() => import("../../Components/Popup"))
import Loader from '../../Components/Fallback/Loader';
import api from '../../APIs/apiService';
import { useApiPromise } from '../../Hooks/useApi';
const Proposal = () => {
  const { proposalList, setProposalList } = useProposalList();
  const [popUp, setPopUp] = useState();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const { run, loading, error } = useApiPromise();
 


  const handleViewProposal = (data) => {
    setPopUp(true);
    setSelectedProposal(data);
  }
  const statuses = ["Pending", "Approved", "Rejected", "Initiated", "Submitted"];


  const columns = [
    { field: "ref_no", headerName: "Ref", flex: 1 },
    { field: "title", headerName: "Proposal Title", flex: 2 },
    { field: "block_name", headerName: "Block", flex: 1 },
    { field: "gp_name", headerName: "GP", flex: 1 },
    { field: "village_name", headerName: "Village", flex: 1 },
    {
      field: "estimated_cost",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <div className='w-full h-full flex items-center'>
          <p>
            ₹ {params.value}
          </p>
        </div>

      )
    },
    { field: "fund_source", headerName: "Fund", flex: 1 },
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
            await run(() => api.put(`/admin/proposal/${params.row.id}/status`, { status: newStatus }),"Status Update.");
            setProposalList(prev =>
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
          initiated: "primary",
          approved: "success",
          rejected: "error",
          pending: "warning",
        };

        return (
          <>
            <Chip
              label={params.value}
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
      field: "action",
      headerName: "View",
      flex: 1,
      renderCell: (params) => (
        <div className='flex items-center justify-center '>
          <button
            onClick={() => handleViewProposal(params.row)}
            className=" cursor-pointer"
          >
            <InfoOutlineIcon />
          </button>
        </div>

      )
    }
  ];




  return (
    <section id='proposal' className='w-full pt-5 pb-5'>
      <header className='flex justify-end mb-5'>
        <NavLink to="/proposals/NewProposal">
          <button className='btn bg-primary !text-sm text-white rounded shadow  transition duration-300'>
            <AddCircleIcon className='mr-1' />
            Add Proposal
          </button>
        </NavLink>
      </header>


      <Table columns={columns} rows={proposalList} />


      {popUp && (
        <Suspense fallback={<Loader />}>
          <Popup onClose={() => setPopUp(false)}>
            <div className="bg-white rounded-sm p-6 w-[750px] shadow-md">
              <h2 className="text-xl font-semibold mb-4  pb-2">
                Proposal Details
              </h2>

              {selectedProposal ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 space-y-2 gap-3 text-xs text-gray-700 [&>p>strong]:text-sm [&>p>strong]:font-semibold">
                  <p>
                    <strong>Reference No:</strong> {selectedProposal.ref_no}
                  </p>
                  <p>
                    <strong>Title:</strong> {selectedProposal.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedProposal.description}
                  </p>
                  <p>
                    <strong>Estimated Cost:</strong>{" "}
                    ₹{selectedProposal.estimated_cost}
                  </p>
                  <p>
                    <strong>Fund Source:</strong> {selectedProposal.fund_source}
                  </p>
                  <p>
                    <strong>Proposal Type:</strong>{" "}
                    {selectedProposal.proposal_type}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize text-blue-600">
                      {selectedProposal.status}
                    </span>
                  </p>
                  <p>
                    <strong>Block:</strong> {selectedProposal.block_name}
                  </p>
                  <p>
                    <strong>GP:</strong> {selectedProposal.gp_name}
                  </p>
                  <p>
                    <strong>Village:</strong> {selectedProposal.village_name}
                  </p>
                </div>
              ) : (
                <p>No data available</p>
              )}

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setPopUp(false)
                    setSelectedProposal(null);
                  }}
                  className="  text-primary cursor-pointer px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </Popup>
        </Suspense>
      )}
    </section>
  )
}

export default Proposal

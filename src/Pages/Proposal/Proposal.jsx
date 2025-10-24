import React, { useEffect } from 'react'
import Table from '../../Components/Table';
import { Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Proposal = () => {
  
  const proposals = [
    {
      id: 1,
      ref: "PR-001",
      title: "Road Repair Project",
      block: 'A',
      location: "Block A",
      amount: 50000,
      fund: "Municipal Fund",
      status: "Initiated",
      action: "View"
    },
    {
      id: 2,
      ref: "PR-002",
      title: "Community Library Upgrade",
      block: 'B',
      location: "Block B",
      amount: 120000,
      fund: "Education Fund",
      status: "Approved",
      action: "View"
    },
    {
      id: 3,
      ref: "PR-003",
      title: "Street Light Installation",
      block: 'C',
      location: "Block C",
      amount: 30000,
      fund: "Public Safety Fund",
      status: "Rejected",
      action: "View"
    },
    {
      id: 4,
      ref: "PR-004",
      title: "Drainage Maintenance",
      block: 'D',
      location: "Block D",
      amount: 45000,
      fund: "Infrastructure Fund",
      status: "Pending",
      action: "View"
    },
    {
      id: 5,
      ref: "PR-004",
      title: "Drainage Maintenance",
      block: 'D',
      location: "Block D",
      amount: 45000,
      fund: "Infrastructure Fund",
      status: "Pending",
      action: "View"
    },
    {
      id: 6,
      ref: "PR-004",
      title: "Drainage Maintenance",
      block: 'D',
      location: "Block D",
      amount: 45000,
      fund: "Infrastructure Fund",
      status: "Pending",
      action: "View"
    },
    {
      id: 7,
      ref: "PR-004",
      title: "Drainage Maintenance",
      block: 'D',
      location: "Block D",
      amount: 45000,
      fund: "Infrastructure Fund",
      status: "Pending",
      action: "View"
    }
  ];

  const handleViewProposal = (id) => {
    console.log("View proposal with ID:", id);
  }

  const handleEditProposal = (id) => {
    console.log("Edit proposal with ID:", id);
  }

  const columns = [
    { field: "ref", headerName: "Ref", flex: 1 },
    { field: "title", headerName: "Proposal Title", flex: 2 },
    { field: "block", headerName: "Block", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "amount",
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
    { field: "fund", headerName: "Fund", flex: 1 },
    {
      field: "status", headerName: "Status", flex: 1,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "Initiated":
            color = "primary";
            break;
          case "Approved":
            color = "success";
            break;
          case "Rejected":
            color = "error";
            break;
          case "Pending":
            color = "warning";
            break;
          default:
            color = "secondary";
        }
        return (

          <Chip label={params.value} color={color} variant='outlined' size="small" />
        );
      }

    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleViewProposal(params.row.id)}
            className="  "
          >
            {params.row.action}
          </button>
          <button
            onClick={() => handleEditProposal(params.row.id)}
            className="ml-4"
          >
            Edit
          </button>
        </div>

      )
    },



  ];




  return (
    <section id='proposal' className='w-full pt-5'>
      <header className='flex justify-end mb-5'>
        <NavLink to="/proposals/NewProposal">
          <button className='btn bg-primary !text-sm text-white rounded shadow  transition duration-300'>
            <AddCircleIcon className='mr-1' />
            Add Proposal
          </button>
        </NavLink>
      </header>
  

      <Table columns={columns} rows={proposals} />
    


    </section>
  )
}

export default Proposal

import { Chip, Radio } from '@mui/material';
import React from 'react'
import Table from '../Components/Table';

const Letters = () => {
  const [selectedId, setSelectedId] = React.useState(null);
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
      status: "Initiated",
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
      status: "Initiated",
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
      status: "Initiated",
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
      status: "Initiated",
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
      status: "Initiated",
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
      status: "Initiated",
      action: "View"
    }
  ];

  const handleSelect = (id) => {
    setSelectedId(id);
    console.log("This is id", id)
  }

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
            checked={selectedId === params.row.id}
            onChange={() => handleSelect(params.row.id)}
            value={params.row.id}

          />
        </div>

      )
    },
    { field: "title", headerName: "Proposal Title", flex: 2 },
    { field: "fund", headerName: "Fund Source", flex: 1 },
    { field: "amount",
       headerName: "Amount",
        flex: 1 ,
         renderCell: (params) => (
          <div className='w-full h-full flex items-center'>
             <p>
        ₹ {params.value}
      </p>
          </div>
     
    )
      },
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

  ]
  return (
    <section id='letter' className="pt-5" >
      <div className='  '>

        <h2 className='pt-5 mb-3 '>Select Proposal </h2>

      <Table columns={columns} rows={proposals} />
      </div>


          <h2 className='mt-10'>Letters Details</h2>
      <div className='h-80 mt-3 shadow-xl bg-white'>
        <form action="#">

        </form>
      </div>
    </section>
  )
}

export default Letters

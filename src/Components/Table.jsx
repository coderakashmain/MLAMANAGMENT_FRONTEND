import React from 'react'
import { DataGrid } from "@mui/x-data-grid";

const Table = React.memo(({ columns, rows }) => {



    return (
        <div style={{ width: "100%" }} className='shadow-xl'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableColumnReorder
                disableColumnResize
                disableSelectionOnClick
                autoHeight
                pageSizeOptions={[5, 10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableColumnMenu
                sx={{
                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        // color: "#000",             
                        // fontWeight: "bold",
                    }
                }}
                localeText={{
                    noRowsLabel: "No discount available",
                }}

            />
        </div>
    )
})

export default Table

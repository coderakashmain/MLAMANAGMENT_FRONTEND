import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LetterTable = React.memo(({ columns, rows, dataname, getChildRows }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  
  const updatedRows = rows.flatMap((row) => {
    const list = [row];
    if (expandedRows.includes(row.id)) {
      const children = getChildRows ? getChildRows(row) : [];
      children.forEach((child) => {
        list.push({
          ...child,
          id: `child-${row.id}-${child.id}`,
          isChild: true,
        });
      });
    }
    return list;
  });

  // Add exepand icon column
const modifiedColumns = [
  {
    field: "expand",
    headerName: "",
    width: 50,
    sortable: false,
    renderCell: (params) => {
      const row = params.row;
      const hasChildren =
        typeof getChildRows === "function" &&
        Array.isArray(getChildRows(row)) &&
        getChildRows(row).length > 0;

      if (!row.isChild && hasChildren) {
        return (
          <span
            style={{ cursor: "pointer", fontSize: "18px", color: "gray" }}
            onClick={() => toggleExpand(params.id)}
          >
            {expandedRows.includes(params.id) ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </span>
        );
      }

     
      return null;
    },
  },
  ...columns,
];


  return (
    <div style={{ width: "100%" }} className="shadow-md">
      <DataGrid
        rows={updatedRows}
        columns={modifiedColumns}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
        getRowClassName={(params) =>
          params.row.isChild ? "bg-gray-100 text-sm pl-8" : ""
        }
        localeText={{
          noRowsLabel: `No ${dataname ? dataname : "Records"} available`,
        }}
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
      />
    </div>
  );
});

export default LetterTable;

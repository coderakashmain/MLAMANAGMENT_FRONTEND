import React, { useState } from "react";
import {
    TextField,
    Button,
    Autocomplete,
    Typography,
    Box,
} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BackButton from "../../Components/BackButton";
import Popup from "../../Components/Popup";
import ClosePopUp from "../../Components/ClosePopUp";
import { Outlet, useNavigate } from "react-router";
const AddProposal = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        block: null,
        gramPanchayat: null,
        village: null,
        amount: "",
        fundSource: "",
        attachment: null,
        status: "",
    });
    const [popUp, setPopUp] = useState(false);

 
    const blocks = ["Block A", "Block B", "Block C"];
    const gps = ["GP 1", "GP 2", "GP 3"];
    const villages = ["Village 1", "Village 2", "Village 3"];
    const statuses = ["Pending", "Approved", "Rejected"];
    const funds = ["MLALAD", "WOCD", "CM Spacial Grant"];

    const optionsWithAddBlock = [...blocks, "Add New"];
    const optionsWithAddGps = [...gps, "Add New"];
    const optionsWithAddVillages = [...villages, "Add New"];
    const optionsWithAddFunds = [...funds, "Add New"];
    const optionsWithAddStatuses = [...statuses, "Add New"];


    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleReset = () => {
        setFormData({
            title: "",
            description: "",
            block: null,
            gramPanchayat: null,
            village: null,
            amount: "",
            fundSource: "",
            attachment: null,
            status: "",
        });
    };

    const handleAddClick = (path) => {
        navigate(path);
    }

    return (
        <section
            id="addProposal"
            className=" py-6 rounded-md  flex justify-center"
        >
            <div className="w-250">

                <div className="flex justify-between items-center">

                    {/* <Typography variant="h6" className=" font-semibold ">
                    New Proposal
                    </Typography> */}
                    <BackButton />
                </div>

                <form onSubmit={handleSubmit} className="gap-4 mt-5">
                    {/* Proposal Title */}
                    <div className="w-full">
                        <p className="text-sm mb-2 font-bold">Propsal Title <span className="text-error">*</span></p>

                        <TextField
                            required
                            label="Proposal Title"
                            size="small"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="rounded-sm bg-white w-full "
                            sx={{

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

                            }}
                        />
                    </div>

                    <div className="w-full mt-5">
                        <p className="text-sm mb-2 font-bold">Description </p>
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            sx={{

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

                            }}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="md:col-span-2 rounded-sm bg-white"
                        />
                    </div>

                    {/* Fund Source */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">




                        {/* Block */}
                        <div>
                            <p className="text-sm mb-2 font-bold">Block  <span className="text-error">*</span></p>

                            <Autocomplete
                                freeSolo
                                options={optionsWithAddBlock}
                                value={formData.block}
                                sx={{

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

                                }}
                                onChange={(e, newValue) => {
                                    if (newValue === 'Add New') {
                                        handleAddClick('addBlock');
                                    } else {

                                        handleChange("block", newValue);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Block" size="small" className="bg-white" />
                                )}
                            />
                        </div>
                        <div>
                            <p className="text-sm mb-2 font-bold">GP  <span className="text-error">*</span></p>
                            {/* Gram Panchayat */}
                            <Autocomplete
                                freeSolo
                                options={optionsWithAddGps}
                                value={formData.gramPanchayat}
                                sx={{

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

                                }}

                                onChange={(e, newValue) => {
                                    if (newValue === 'Add New') {
                                        handleAddClick("addGp");
                                    } else {

                                        handleChange("gramPanchayat", newValue);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Gram Panchayat" size="small" className="bg-white" />
                                )}
                            />
                        </div>
                        <div>
                            <p className="text-sm mb-2 font-bold">Village  <span className="text-error">*</span></p>
                            <Autocomplete
                                freeSolo
                                options={optionsWithAddVillages}
                                value={formData.village}
                                sx={{

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

                                }}
                                onChange={(e, newValue) => {
                                    if (newValue === 'Add New') {
                                        handleAddClick("addVillage");
                                    } else {

                                        handleChange("village", newValue);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Village" size="small" className="bg-white" />
                                )}
                            />
                        </div>

                    </div>

                    <div className="mt-5 flex gap-5 w-full">
                        <div className="w-full">
                            <p className="text-sm mb-2 font-bold">Fund Resource <span className="text-error">*</span> </p>
                            <Autocomplete
                                freeSolo
                                options={optionsWithAddFunds}
                                value={formData.fundSource}
                                sx={{

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

                                }}
                                onChange={(e, newValue) => {
                                    if (newValue === 'Add New') {
                                        handleAddClick("addFundsources");
                                    } else {

                                        handleChange("fundSource", newValue);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Funds Source" size="small" className="bg-white" />
                                )}
                            />

                        </div>

                        {/* Amount */}
                        <div className="w-full">
                            <p className="text-sm mb-2 font-bold">Proposed Amount (₹)</p>
                            <TextField
                                label="e.g.,45000"
                                size="small"
                                sx={{

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

                                }}
                                type="number"
                                value={formData.amount}
                                onChange={(e) => handleChange("amount", e.target.value)}
                                className="w-full bg-white"
                            />
                        </div>

                    </div>


                    {/* Status */}
                    <div className="flex gap-4 mt-5">

                        <div className="flex-1">

                            <p className="text-sm mb-2 font-bold">Status</p>
                            <Autocomplete
                                freeSolo
                                options={optionsWithAddStatuses}
                                value={formData.status}

                                sx={{

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

                                }}
                                onChange={(e, newValue) => {
                                    if (newValue === 'Add New') {
                                        handleAddClick();
                                    } else {

                                        handleChange("status", newValue);
                                    }
                                }}


                                renderInput={(params) => (
                                    <TextField {...params} label="Status" size="small" className="bg-white" />
                                )}
                            />
                        </div>

                        {/* Attachment */}
                        <div className="flex-1">
                            <Box>
                                <p className="text-sm mb-2 font-bold ">
                                    Attachment (optional)
                                </p>

                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="text-sm  rounded-sm  p-2 bg-primary text-white"
                                />

                            </Box>
                        </div>
                    </div>
                    {/* Description (Full Width) */}


                    {/* Buttons */}
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
                            className="btn bg-primary text-alwaysWhite rounded-sm shadow-sm"
                        >
                            Save
                        </button>
                    </Box>
                </form>
            </div>

            {/* Pop Ups */}
            <Outlet/>
        </section>
    );
};

export default AddProposal;

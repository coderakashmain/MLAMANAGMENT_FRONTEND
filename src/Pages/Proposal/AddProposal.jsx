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
import api from "../../APIs/apiService";
import { useApiPromise } from "../../Hooks/useApi";
import { useFundsources } from "../../Context/FundSourceProvider";
import { useBlock } from "../../Context/BlocksProvider";
import { useGp } from "../../Context/GpProvider";
import { useVillage } from "../../Context/VillagePorvider";
import { useEffect } from "react";
import { useProposalList } from "../../Context/ProposalProvider";


const AddProposal = () => {
    const navigate = useNavigate();
    const { run, loading, error } = useApiPromise();
    const { blocksList } = useBlock();
    const { fundsourceList } = useFundsources();
    const { gpList, getGp, setGpList } = useGp();
    const { getVillage, villageList, setVillageList } = useVillage();
    const {setProposalList} = useProposalList();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        block: '',
        gramPanchayat: '',
        village: '',
        amount: "",
        fundSource: "",
        proposalType : "",
        attachment: null,
        status: "",
    });

    useEffect(() => {
        if (formData.block) {
            setFormData(prev => ({
                ...prev,
                gramPanchayat: ''
            }));
            setGpList([]);



            const matchedBlock = blocksList.find(e => e.name === formData.block);
            if (matchedBlock) {
                getGp(matchedBlock.id);
            } else {
                setGpList([]);
                setFormData(prev => ({
                    ...prev,
                    gramPanchayat: ''
                }));
            }
        }
    }, [formData.block]);

    useEffect(() => {
        if (formData.gramPanchayat) {

            setFormData(prev => ({
                ...prev,
                village: ''
            }));
            setVillageList([]);


            const matchGp = gpList.find(e => e.name === formData.gramPanchayat);
            if (matchGp) {
                getVillage(matchGp.id);
            } else {
                setVillageList([]);
                setFormData(prev => ({
                    ...prev,
                    village: ''
                }));
            }
        }
    }, [formData.gramPanchayat]);


  




    const statuses = ["Pending", "Approved", "Rejected","Initiated","Submitted"];
    const proposalTypes = [
        "Local / Community",
        "Commercial / Business",
        "Educational",
        "Health & Sanitation",
        "Environment",
        "Social Welfare",
        "Government Schemes / Grants"
    ];


    const optionsWithAddBlock = [...blocksList.map(b => b.name), "Add New"];
    const optionsWithAddGps = [...gpList.map(b => b.name), "Add New"];
    const optionsWithAddVillages = [...villageList.map(b => b.name), "Add New"];
    const optionsWithAddFunds = [...fundsourceList.map(b => b.name), "Add New"];
    const optionsWithAddStatuses = [...statuses, "Add New"];


    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("block", formData.block);
        data.append("gramPanchayat", formData.gramPanchayat);
        data.append("village", formData.village);
        data.append("amount", formData.amount);
        data.append("proposalType", formData.proposalType);
        data.append("fundSource", formData.fundSource);
        data.append("status", formData.status);


        if (formData.attachment) {
            data.append("attachment", formData.attachment);
        }
         const res = await run(() => api.post('/admin/proposal/newproposal', data, {
            headers: { "Content-Type": "multipart/form-data" },
            
        }),"Proposal added successfully.");
        
        setProposalList((prev) => [res.data,...prev]);
        setFormData({
            title: "",
            description: "",
            block: '',
            gramPanchayat: '',
            village: '',
            amount: "",
            fundSource: "",
            proposalType: "",
            attachment: null,
            status: "",
        });
    };

    const handleReset = () => {
        setFormData({
            title: "",
            description: "",
            block: '',
            gramPanchayat: '',
            village: '',
            amount: "",
            fundSource: "",
            proposalType: "",
            attachment: null,
            status: "",
        });
    };

    const handleAddClick = (path,block,gp) => {
        
        navigate(path,{state : {block,gp}});
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
                                onInputChange={(e, newInputValue) => {

                                    handleChange("block", newInputValue);
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
                                        handleAddClick("addGp",formData.block);
                                    } else {

                                        handleChange("gramPanchayat", newValue);
                                    }
                                }}
                                onInputChange={(e, newInputValue) => {

                                    handleChange("gramPanchayat", newInputValue);
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
                                        handleAddClick("addVillage",formData.block,formData.gramPanchayat);
                                    } else {

                                        handleChange("village", newValue);
                                    }
                                }}
                                onInputChange={(e, newInputValue) => {

                                    handleChange("village", newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Village" size="small" className="bg-white" />
                                )}
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
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
                                onInputChange={(e, newInputValue) => {

                                    handleChange("fundSource", newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Funds Source" size="small" className="bg-white" />
                                )}
                            />

                        </div>
                        {/* proposal types */}
                        <div className="w-full">
                            <p className="text-sm mb-2 font-bold">Proposal Type <span className="text-error">*</span> </p>
                            <Autocomplete
                                freeSolo
                                options={proposalTypes}
                                value={formData.proposalType || ""}
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

                                    handleChange("proposalType", newValue);

                                }}
                                onInputChange={(e, newInputValue) => {

                                    handleChange("proposalType", newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Proposal Type" size="small" className="bg-white" />
                                )}
                            />

                        </div>

                        {/* Amount */}
                        <div className="w-full">
                            <p className="text-sm mb-2 font-bold">Proposal Amount (₹)</p>
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
                                onInputChange={(e, newInputValue) => {

                                    handleChange("status", newInputValue);
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
                            disabled={loading}
                            className={`btn bg-primary text-alwaysWhite rounded-sm shadow-sm ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </Box>
                </form>
            </div>

            {/* Pop Ups */}
            <Outlet />
        </section>
    );
};

export default AddProposal;

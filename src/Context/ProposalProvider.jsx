


import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import { useRef } from 'react';
const ProposalContext = createContext();

export const useProposalList = () => {

    return useContext(ProposalContext);
}

const ProposalProvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [proposalList, setProposalList] = useState([]);
    const dataLoaded = useRef(false);
    const getProposal = async () => {
        const res = await run(() =>
            api.get('/admin/proposal/getproposal')
        )
        dataLoaded.current = true;
        setProposalList(res.data);
    }

    useEffect(() => {


        if (!dataLoaded.current) {

            getProposal();
        }

    }, []);




    return (
        <ProposalContext.Provider value={{ error, loading, proposalList, setProposalList ,getProposal}}>
            {children}
        </ProposalContext.Provider>
    )
}

export default ProposalProvider



import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import { useRef } from 'react';
const blockContext = createContext();

export const useBlock = () => {

    return useContext(blockContext);
}

const BlocksProvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [blocksList, setBlockList] = useState([]);
      const dataLoaded = useRef(false); 

    useEffect(() => {
        const getBlock = async () => {
            const res = await run(() =>
                api.get('/admin/add/getBlock')
            )
             dataLoaded.current = true;
            setBlockList(res.data);
        }
        if(!dataLoaded.current){

            getBlock();
        }

    }, []);

    


    return (
        <blockContext.Provider value={{error,loading,blocksList,setBlockList}}>
            {children}
        </blockContext.Provider>
    )
}

export default BlocksProvider
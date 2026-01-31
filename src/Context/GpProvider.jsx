

import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';


const gpContext = createContext();

export const useGp = () => {

    return useContext(gpContext);
}

const GpProvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [gpList, setGpList] = useState([]);

  
        const getGp = async (block) => {
            const res = await run(() =>
                api.get(`/admin/add/getgp?block=${block}`)
            )
            setGpList(res.data);
        }

   

    


    return (
        <gpContext.Provider value={{error,loading,gpList,getGp,setGpList}}>
            {children}
        </gpContext.Provider>
    )
}

export default GpProvider

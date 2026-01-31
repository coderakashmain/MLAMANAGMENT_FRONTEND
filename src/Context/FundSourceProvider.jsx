




import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import { useRef } from 'react';

const fundSourceContext = createContext();

export const useFundsources = () => {

    return useContext(fundSourceContext);
}

const FundSourceProvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [fundsourceList, setFundsourceList] = useState([]);
      const dataLoaded = useRef(false); 

    useEffect(() => {
        const getFundsouces = async () => {
            const res = await run(() =>
                api.get('/admin/add/getfundsources')
            )
             dataLoaded.current = true;
            setFundsourceList(res.data);
        }
        if(!dataLoaded.current){

            getFundsouces();
        }


    }, []);

    


    return (
        <fundSourceContext.Provider value={{error,loading,fundsourceList}}>
            {children}
        </fundSourceContext.Provider>
    )
}

export default FundSourceProvider
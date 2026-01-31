




import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';


const villageContext = createContext();

export const useVillage = () => {
    
    return useContext(villageContext);
}

const VillagePorvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [villageList, setVillageList] = useState([]);


    const getVillage = async (gp) => {
        const res = await run(() =>
            api.get(`/admin/add/getVillage?gp=${gp}`)
        )
        setVillageList(res.data);
    };

 






    return (
        <villageContext.Provider value={{ error, loading, villageList,getVillage,setVillageList }}>
            {children}
        </villageContext.Provider>
    )
}

export default VillagePorvider

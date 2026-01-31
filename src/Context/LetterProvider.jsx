



import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import { useRef } from 'react';
const LetterContext = createContext();

export const useLetterList = () => {

    return useContext(LetterContext);
}

const LetterProvider = ({ children }) => {
    const { run, loading, error } = useApiPromise();
    const [letterList, setLetterList] = useState([]);
    const dataLoaded = useRef(false);
    const getLetter = async () => {
        const res = await run(() =>
            api.get('/admin/letters/getletter')
        )
        dataLoaded.current = true;
        setLetterList(res.data);
    }

    useEffect(() => {


        if (!dataLoaded.current) {

            getLetter();
        }

    }, []);




    return (
        <LetterContext.Provider value={{ error, loading, letterList, setLetterList ,getLetter}}>
            {children}
        </LetterContext.Provider>
    )
}

export default LetterProvider
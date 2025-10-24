import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import AuthService from '../APIs/authService';

const AdminAuth = createContext();

export const useAuth = () => {

    return useContext(AdminAuth);
}

const AuthProvider = ({ children }) => {

    const [adminData, setAdminData] = useState(false);
    const { run, loading, error } = useApiPromise();

    const handleCheck = async () => {
        try {
            const response = await run(() =>
                api.get('/authcheck', { withCredentials: true })
            );

            if (response?.data?.status) {
                setAdminData(true);
                AuthService.setAccessToken(response.data?.data?.token);
            } else {
                setAdminData(false);
            }
        } catch (err) {
            setAdminData(false);
            console.error('Auth check failed:', err);
        }
    };

  

    return (
        <AdminAuth.Provider value={{ loading, error, adminData ,handleCheck}}>
            {children}
        </AdminAuth.Provider>
    )
}

export default AuthProvider
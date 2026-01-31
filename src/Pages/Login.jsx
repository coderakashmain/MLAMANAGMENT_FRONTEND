import React, { useId, useState } from 'react'
import api from '../APIs/apiService';
import { useApiPromise } from '../Hooks/useApi';
import { TextField } from '@mui/material';


const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState("");
    const { run, loading, error } = useApiPromise();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await run(() => api.post('/admin/login', { userId, password }), "Login Successfully.")
    };

    const style = {
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": { borderColor: "#99a1af" },
            "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
    };


    return (
        <section id='login'>
            <div className='container min-h-screen w-full  flex justify-center items-center '>

                <div className='w-80'>
                    <form onSubmit ={handleSubmit}>

                        <h1 className='text-xl mb-10'>Login to Your DashBoard</h1>
                        <TextField
                            required
                            type='text'
                            label="User Id"
                            size="small"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="rounded-sm bg-white w-full"
                            sx={style}
                        />
                        <TextField
                            required
                            label="Password"
                            type='password'
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-sm bg-white w-full "
                            sx={[style,{marginTop : '1rem'}]}

                        />

                        <button type='submit' disabled={loading} className={`btn bg-primary mt-5 w-full ${loading ? "opacity-50" : ""}`}>{`${loading ? "Log in ...":"Login"}`}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login

import React, { useState, createContext, useContext, useEffect } from "react";

export const SnackbarContext = createContext(); 

export const useSnackbar = ()=>{
    return useContext(SnackbarContext)
}

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });



  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

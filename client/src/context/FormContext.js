import React, { createContext, useContext, useState } from 'react';


const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('Type email and number');
  const [loading, setLoading] = useState(false);

  return (
    <MyContext.Provider value={{ data, setData, status, setStatus, loading, setLoading }}>
      {children}
    </MyContext.Provider>
  );
};
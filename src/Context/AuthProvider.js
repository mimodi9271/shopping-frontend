import React, { useState , useContext, useEffect } from "react";

const Authprovidercontext = React.createContext();
const Authprovidercontextdispather = React.createContext();

const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Auth"));
    setAuth(userdata);
  } , [])
  return (
    <Authprovidercontext.Provider value={auth}>
      <Authprovidercontextdispather.Provider value={setAuth}>
        {children}
      </Authprovidercontextdispather.Provider>
    </Authprovidercontext.Provider>
  );
};

export default Authprovider;

export const Authvalue = () => useContext(Authprovidercontext);

export const AuthvalueAction = () => useContext(Authprovidercontextdispather);

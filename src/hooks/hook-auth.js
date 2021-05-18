import React, { useState, useContext, createContext } from "react";


const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('reactUser')));

  const signin = (email, password) => {
    if (email === 'user' && password === 'user') {
        setUser(true);
        localStorage.setItem('reactUser', JSON.stringify(true));
        return true;
    } 

    setUser(false);
    return false;
  };

  const signout = () => {
    setUser(false);
    localStorage.setItem('reactUser', JSON.stringify(false));
  };


  return {
    user,
    signin,
    signout,
  };
}


// const authContext = createContext();

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export const useAuth = () => {
//   return useContext(authContext);
// };

// function useProvideAuth() {
//   const [user, setUser] = useState(false);

//   const signin = (email, password) => {
//     if (
//       email === 'user' &&
//       password === 'user'
//     ) {
//       localStorage.setItem("isAuthorized", "true");
//       setUser(true);
//       return true;
//     } else {
//       localStorage.setItem("isAuthorized", "false");
//       setUser(false);
//     }
//     return false;
//   };

//   const signout = () => {
//     localStorage.clear();
//     setUser(false);
//   };

//   return {
//     user,
//     signin,
//     signout,
//   };
// }

import React, { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode

export const CounterContext = createContext(null);

export function CounterContextProvider({children}) {
  let [user, setUser] = useState(null);

  function userToken() {
    let token = localStorage.getItem('userToken');
    let decoded = jwtDecode(token);
    setUser(decoded);
  }

  return (
    <CounterContext.Provider value={{ userToken, user }}>
      {children}
    </CounterContext.Provider>
  );
}
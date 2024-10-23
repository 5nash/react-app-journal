import { createContext } from "react";
import { useState } from "react";
import { useLocalStorage } from "../hooks/use-localstorage.hook";

export const UserContext = createContext({
  userId: 1,
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage("userId");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

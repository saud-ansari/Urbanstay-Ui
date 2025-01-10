import { useEffect, useState } from "react";

export const UseSessionStorage = (key , initialvalue) => {
   const [value ,setValue]  = useState(() => {
    const sessionStorageValue = sessionStorage.getItem(key);
    return sessionStorageValue ? JSON.parse(sessionStorageValue) : initialvalue;
   });

   useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
};
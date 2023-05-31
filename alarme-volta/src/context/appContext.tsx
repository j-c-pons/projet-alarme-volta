import React, { createContext, useContext, useState } from "react";
import {Alarm} from "../type/Alarm";

interface ctxProps{
  children: React.ReactNode;
}

export type ctxInterface = {
  data:Alarm[]
  setData:React.Dispatch<React.SetStateAction<Alarm[]>>
  timezone:string
  setTimezone:React.Dispatch<React.SetStateAction<string>>
  urlBack:string
}

export const AlarmContext = createContext<ctxInterface>({} as ctxInterface);

const ContextAlarmProvider = ({ children }:ctxProps) => {
  const [data, setData] = useState<Alarm[]>([]);
  const [timezone, setTimezone] = useState("Europe/Brussels");
  const urlBack = "http://127.0.0.1:8000/";
  return (
    <AlarmContext.Provider
      value={{
        data,
        setData,
        timezone, 
        setTimezone,
        urlBack
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}
export const useGlobalContext = () => useContext(AlarmContext)

export default ContextAlarmProvider;
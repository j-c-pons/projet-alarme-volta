import React, { createContext, useContext, useState } from "react";
import {Alarm} from "../type/Alarm";

interface Props{
  children: React.ReactNode;
}

export type ctxInterface = {
  data:Alarm[]
  setData:React.Dispatch<React.SetStateAction<Alarm[]>>
  timezone:string
  setTimezone:React.Dispatch<React.SetStateAction<string>>
}

export const AlarmContext = createContext<ctxInterface>({} as ctxInterface);

const ContextAlarmProvider = ({ children }:Props) => {
  const [data, setData] = useState<Alarm[]>([]);
  const [timezone, setTimezone] = useState("Europe/Brussels");

  return (
    <AlarmContext.Provider
      value={{
        data,
        setData,
        timezone, 
        setTimezone,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}
export const useGlobalContext = () => useContext(AlarmContext)

export default ContextAlarmProvider;
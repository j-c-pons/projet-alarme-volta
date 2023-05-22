// import React, { useState, useContext } from 'react';
// import AppContext from '../context/appContext';

// //const theme = useContext(AppContext);

// interface AlarmProps {
//   onSave: (alarm: Alarm) => void;
// }

// interface Alarm {
//   id: number;
//   time: string;
//   active: boolean;
// }

// const Alarm: React.FunctionComponent<AlarmProps> = ({ onSave }) => {
//   const [time, setTime] = useState('');
//   const [active, setActive] = useState(false);

//   const handleSave = () => {
//     const alarm: Alarm = {
//       id: Date.now(),
//       time,
//       active,
//     };

//     onSave(alarm);
//     setTime('');
//     setActive(false);
//   };

//   return (
//     <div>
//       <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
//       <label>
//         <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
//         Active
//       </label>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default Alarm;


import React, { useContext, useState } from "react";
// import "./AlarmOption.css";
import useSelect from "../hook/useSelect";
import { minutesNumber, hourNumber } from "../utils/functions";

import AlarmContext, {ctxInterface, useGlobalContext} from '../context/appContext';

interface AlarmProps {
    onSave: (alarm: Alarm) => void;
}

interface Alarm {
  id: number;
  time: string;
  active: boolean;
}
interface Test{
    hour:string
}

const Alarm: React.FunctionComponent<AlarmProps> = ({ onSave }) => {
    const alarmCtx= useGlobalContext();
    const [time, setTime] = useState('');
    const [active, setActive] = useState(false);
    
    const [hour, setHour] = useSelect("Hour");
    const [minutes, setMinutes] = useSelect("Minutes");
    const [amPmOption, setAmPmOption] = useSelect("Am-Pm");
    //const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } ;

    const handleSave = () => {
        const alarm: Alarm = {
        id: Date.now(),
        time,
        active,
        };

        onSave(alarm);
        setTime('');
        setActive(false);
    };

    const setAlarm = () => {
        if (alarmCtx?.hasAlarm) {
            alarmCtx.pauseAlarm();
            alarmCtx.setHasAlarm(false);
            return;
        }

    if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
        alarmCtx?.setHasAlarm(true);
        alarmCtx?.setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
    }
  };

  return (
        <div className="option-Container">
                 <div>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <label>
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            Active
        </label>
        <button onClick={handleSave}>Save</button>
        </div>
      <div className={`wrapper-option ${alarmCtx?.hasAlarm && "disable"}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour:string, index:number) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes:string, index:number) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${alarmCtx?.hasAlarm && "play"}`}
      >
        {alarmCtx?.hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>
    </div>
  );
}

export default Alarm;
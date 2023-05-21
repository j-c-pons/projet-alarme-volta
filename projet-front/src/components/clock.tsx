// import React, { useState, useEffect,  Dispatch, SetStateAction } from 'react';

// interface ClockProps {
//   format: string;
// }

// const Clock: React.FC<ClockProps> = ({ format }) => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

//   return <div>{formattedTime}</div>;
// };

// export default Clock;

import React,  { useState, useEffect,  Dispatch, SetStateAction } from "react";
// import "./DigitalClock.css";
import {useGlobalContext} from '../context/appContext';

interface ClockProps {
  format: string;
  selectedTimezone:string;
}

 const Clock: React.FunctionComponent<ClockProps> = ({ format, selectedTimezone }) => {
    const alarmCtx= useGlobalContext();


  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: selectedTimezone  });
  //toLocaleTimeString([], { timeZone: 'UTC' })

  return (
    <div>
      {/* <div className="clock__text">
        <div className="clock__text-hour">{`${alarmCtx?.hourDigital}:`}</div>
        <div className="clock__text-minutes">{alarmCtx?.minutesDigital}</div>
        <div className="clock__text-ampm">{alarmCtx?.amPm}</div>
      </div> */}
      <div>{formattedTime}</div>
      <div>Timezone: {selectedTimezone}</div>
      <div className="clock__date">
        <span>{`${alarmCtx?.dayNow} `}</span>
        <span>{`${alarmCtx?.monthNow} , `}</span>
        <span>{alarmCtx?.yearNow}</span>
      </div>
    </div>
  );
}

export default Clock;
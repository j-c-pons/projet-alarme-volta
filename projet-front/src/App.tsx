import React, { useState } from 'react';
import './style/App.css';
import Clock from './components/clock';
import Alarm from './todeletecomp/alarm';
import newAlarm from './todeletecomp/alarm';
import ContextAlarmProvider from './context/appContext';
import AddAlarm from './components/addAlarm';
import CurrentAlarms from './components/currentAlarms'
import TimeZone from './components/timezoneSelect';
import './style/clock.css';
import SelectTimezone from './components/timezones'
import AddItemModal from './components/addModal'
import {useGlobalContext} from './context/appContext';
import HasAlarmModal from './components/hasAlarmModal'
// interface ButtonProps {
//   // sum: (a: number, b: number) => number;
//   // logMessage: (message: string) => void;

//   // 👇️ turn off type checking
//   childToParent: (new: string) => void;
// }

const App: React.FunctionComponent = () => {
  const alarmCtx= useGlobalContext();
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [enabled, setEnabled] = useState(false)
  const [timezone, setTimezone] = useState("Europe/Brussels")


  const handleSaveAlarm = (alarm: Alarm) => {
    setAlarms([...alarms, alarm]);
  };
  
  const updateTZ = (newTz:string):void => {
    setTimezone(newTz)
  }
  
  
  return (
    <div className='App'>
      <ContextAlarmProvider>
      <Clock format="hh:mm:ss" selectedTimezone={timezone} />
      {/* <TimeZone updateTZ={updateTZ} /> */}
      <SelectTimezone updateTZ={updateTZ} />
      {/* <h2>Alarms</h2> */}
      <AddItemModal />
      {alarmCtx.hasAlarm &&(
        <HasAlarmModal />
      )}

      {/* {alarms.map((alarm) => (
        <div key={alarm.id}>
          {alarm.time} - {alarm.active ? 'Active' : 'Inactive'}
        </div>
      ))} */}
      {/* <Alarm onSave={handleSaveAlarm} /> */}
      {/* <AddAlarm /> */}
      <CurrentAlarms />
      {/* <Essai stat={service}/> */}
      </ContextAlarmProvider>

    </div>
  );
};

export default App;
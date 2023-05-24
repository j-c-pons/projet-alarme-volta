import React, { useState } from 'react';
import './style/App.css';
import Clock from './components/clock';
import ContextAlarmProvider from './context/appContext';
// import AddAlarm from './components/addAlarm';
import CurrentAlarms from './components/currentAlarms'
// import TimeZone from './components/timezoneSelect';
import './style/clock.css';
import SelectTimezone from './components/timezones'
import AddItemModal from './components/modals/addModal'
// import HasAlarmModal from './components/hasAlarmModal' 
import {useGlobalContext} from './context/appContext';

const App: React.FunctionComponent = () => {
  const alarmCtx= useGlobalContext();
  const [timezone, setTimezone] = useState("Europe/Brussels")
  
  const updateTZ = (newTz:string):void => {
    setTimezone(newTz)
  }
  
  
  return (
    <ContextAlarmProvider>
      <div className='App'>
        <Clock format="hh:mm:ss" />
        {/* <TimeZone updateTZ={updateTZ} /> */}
        <SelectTimezone />
        <AddItemModal />
        <CurrentAlarms />
      </div>
    </ContextAlarmProvider>

  );
};

export default App;
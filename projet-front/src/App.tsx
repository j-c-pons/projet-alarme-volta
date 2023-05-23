import React, { useState, useEffect } from 'react';
import './style/App.css';
import Clock from './components/clock';
import ContextAlarmProvider from './context/appContext';
import AddAlarm from './components/addAlarm';
import CurrentAlarms from './components/currentAlarms'
import TimeZone from './components/timezoneSelect';
import './style/clock.css';
import SelectTimezone from './components/timezones'
import AddItemModal from './components/addModal'
import HasAlarmModal from './components/hasAlarmModal' 

const App: React.FunctionComponent = () => {
  // const [alarms, setAlarms] = useState<Alarm[]>([]);
  // const [enabled, setEnabled] = useState(false)
  const [timezone, setTimezone] = useState("Europe/Brussels")


  // const handleSaveAlarm = (alarm: Alarm) => {
  //   setAlarms([...alarms, alarm]);
  // };
  
  const updateTZ = (newTz:string):void => {
    setTimezone(newTz)
  }
  
  
  return (
    <ContextAlarmProvider>
      <div className='App'>
        <Clock format="hh:mm:ss" selectedTimezone={timezone} />
        {/* <TimeZone updateTZ={updateTZ} /> */}
        <SelectTimezone updateTZ={updateTZ} />
        <AddItemModal />
        {/* {alarms.map((alarm) => (
          <div key={alarm.id}>
            {alarm.time} - {alarm.active ? 'Active' : 'Inactive'}
          </div>
        ))} */}
        {/* <Alarm onSave={handleSaveAlarm} /> */}
        {/* <AddAlarm /> */}
        <CurrentAlarms />
      </div>
    </ContextAlarmProvider>

  );
};

export default App;
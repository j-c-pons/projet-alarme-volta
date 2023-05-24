import React from 'react';
import Clock from './components/clock';
import ContextAlarmProvider from './context/appContext';
import CurrentAlarms from './components/currentAlarms'
// import TimeZone from './components/timezoneSelect';
import SelectTimezone from './components/timezones'
import AddItemModal from './components/modals/addItemModal'
import './style/App.css';
import './style/clock.css';

const App: React.FunctionComponent = () => {
  
  return (
    <ContextAlarmProvider>
      <div className='App'>
        <Clock />
        {/* <TimeZone updateTZ={updateTZ} /> */}
        <SelectTimezone />
        <AddItemModal />
        <CurrentAlarms />
      </div>
    </ContextAlarmProvider>

  );
};

export default App;
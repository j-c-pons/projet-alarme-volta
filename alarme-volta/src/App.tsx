import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";

import Clock from './components/clock';
import ContextAlarmProvider from './context/appContext';
import CurrentAlarms from './components/currentAlarms'
import SelectTimezone from './components/timezones'
import AddItemModal from './components/modals/addItemModal'
import './style/App.css';
import './style/clock.css';

const App: React.FunctionComponent = () => {
  return(
    <ContextAlarmProvider>
      <div className='App'>
        <Clock />
        <SelectTimezone />
        <AddItemModal />
        <CurrentAlarms />
      </div>
    </ContextAlarmProvider>
  );
};


const container = document.getElementById("root");
createRoot(container).render(<App />);
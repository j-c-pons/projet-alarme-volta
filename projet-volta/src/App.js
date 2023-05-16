/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */

import React, { useState } from 'react';
import Clock from './components/clock';
import Alarm from './components/alarm';

interface Alarm {
  id: number;
  time: string;
  active: boolean;
}

const App: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const handleSaveAlarm = (alarm: Alarm) => {
    setAlarms([...alarms, alarm]);
  };

  return (
    <div>
      <h1>Clock</h1>
      <Clock format="hh:mm:ss" />
      <h2>Alarms</h2>
      {alarms.map((alarm) => (
        <div key={alarm.id}>
          {alarm.time} - {alarm.active ? 'Active' : 'Inactive'}
        </div>
      ))}
      <Alarm onSave={handleSaveAlarm} />
    </div>
  );
};

export default App;

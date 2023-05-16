import React, { useState } from 'react';

interface AlarmProps {
  onSave: (alarm: Alarm) => void;
}

interface Alarm {
  id: number;
  time: string;
  active: boolean;
}

const Alarm: React.FC<AlarmProps> = ({ onSave }) => {
  const [time, setTime] = useState('');
  const [active, setActive] = useState(false);

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

  return (
    <div>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <label>
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        Active
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Alarm;

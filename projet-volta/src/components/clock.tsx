import React, { useState, useEffect } from 'react';

interface ClockProps {
  format: string;
}

const Clock: React.FC<ClockProps> = ({ format }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return <div>{formattedTime}</div>;
};

export default Clock;

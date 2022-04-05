import { useEffect, useState } from 'react';

const useInterval = (f, delay) => {
  const [timer, setTimer] = useState(null);

  const start = () => {
    if (timer) return;
    setTimer(setInterval(f, delay));
  };

  const stop = () => {
    if (!timer) return;
    setTimer(clearInterval(timer));
  };

  useEffect(() => stop, []);

  return [start, stop, timer != null];
};

export default useInterval;

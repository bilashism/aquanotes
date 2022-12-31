import moment from 'moment';
import React, { useCallback } from 'react';

const DigitalClock = () => {
  const [count, setCount] = React.useState(new Date().getTime());

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef(0);
  const previousTimeRef = React.useRef(0);

  const clock = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      setCount(new Date().getTime());
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(clock);
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(clock);
    return () => cancelAnimationFrame(requestRef?.current);
  }, [clock]);

  return (
    <figure className="">
      <div className="container px-4 mx-auto">Digital Clock</div>
      <p className="">{moment(count).format('LTS')}</p>
    </figure>
  );
};

export default DigitalClock;

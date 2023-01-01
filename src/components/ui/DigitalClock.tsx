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
    <figure className="font-['digital7'] py-8 drop-shadow ">
      <div className="container px-4 mx-auto">
        <div className="grid gap-4 xl:gap-12 p-4 xl:p-8 border-4 border-emerald-500 shadow-xl">
          <p className="text-gray-200 text-xl flex gap-4 flex-wrap justify-center sm:justify-between">
            {moment.weekdays().map((day, i) => (
              <span
                key={`day-${i + 1}`}
                className={`${
                  moment(count).format('dddd') === day
                    ? 'text-emerald-500 font-bold'
                    : ''
                }`}
              >
                {day}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-8 xl:gap-12 justify-around items-center">
            <div className="flex flex-wrap gap-4 items-center">
              <p className="relative isolate z-10 text-4xl xl:text-6xl">
                <span className="absolute top-0 left-0 text-gray-200 -z-10">
                  88
                </span>
                <span className="text-emerald-500">
                  {moment(count).format('DD')}
                </span>
              </p>
              <div className="flex flex-col gap-1">
                <p className="">{moment().format('MMM')}</p>
                <p className="">{moment().year()}</p>
              </div>
            </div>
            <div className="relative isolate text-6xl xl:text-8xl text-center">
              <p className="absolute top-0 left-0 text-gray-200 -z-10">
                88:88:88 88
              </p>
              <time
                className="text-emerald-500"
                dateTime={moment(count).toString()}
              >
                {moment(count).format('hh:mm:ss A')}
              </time>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default DigitalClock;

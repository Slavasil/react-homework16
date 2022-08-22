import clock_base from './clock_base.png';
import clock_sec from './clock_sec.png';
import clock_min from './clock_min.png';
import clock_hour from './clock_hour.png';
import { useEffect, useState } from 'react';

function Clock(props) {
  let [time, setTime] = useState([0,0,0]);
  let timeout;

  useEffect(function() {
    console.log('init');
    let startTime = new Date();
    let startHours = startTime.getUTCHours() + props.timeZone;
    if (startHours >= 24) startHours -= 24;
    let startMinutes = startTime.getUTCMinutes();
    let startSeconds = startTime.getSeconds();
    console.log(startHours);
    setTime([startHours, startMinutes, startSeconds]);
    timeout = setTimeout(tick, 1000);

    return function() {
      console.log('unmount')

      console.log('clear. timeout ', timeout);
      clearTimeout(timeout);
    };
  }, []);
  /*useEffect(function() {
    console.log('post render');
    setTickTimeout(setTimeout(tick));
  }, [time]);*/

  function tick() {
    setTime((oldTime) => {
      let seconds = oldTime[2] + 1;
      let minutes = oldTime[1];
      if (seconds >= 60) {
        seconds -= 60;
        minutes++;
      }
      let hours = oldTime[0];
      if (hours >= 60) {
        minutes -= 60;
        hours++;
      }
      console.log(hours+':'+minutes+':'+seconds);
      return [hours, minutes, seconds];
    });
    timeout = setTimeout(tick, 1000);
  }

  let hourAngle = (time[0] + time[1]/60) / 12;
  let minAngle = (time[1] + time[2]/60) / 60;
  let secAngle = time[2] / 60;

  return (
    <div>
    <div className="clock">
      <img src={clock_base}/>
      <img src={clock_hour} style={{transform: "rotate("+hourAngle+"turn)"}}/>
      <img src={clock_min} style={{transform: "rotate("+minAngle+"turn)"}}/>
      <img src={clock_sec} style={{transform: "rotate("+secAngle+"turn)"}}/>
    </div>
    </div>
  );
}

export default Clock;
import Clock from "./Clock.js";
import {useState, useRef} from 'react';

function ClocksControl() {
  const [clocks, setClocks] = useState([]);
  let nameInputRef = useRef();
  let timeZoneInputRef = useRef();

  let clockElements = clocks.map((clock, index) => {
    return (
      <div key={clock.id} className="clocks-control-clock">
        <div>{clock.name}</div>
        <Clock timeZone={parseInt(clock.timeZone)}/>
        <button onClick={()=>deleteClock(index)} className="clocks-control-close-button">X</button>
      </div>
    );
  });
  function addClock() {
    let name = nameInputRef.current.value;
    let timeZone = timeZoneInputRef.current.value;
    setClocks((oldClocks) => {
      return [...oldClocks, {id: name+Math.random(), name: name, timeZone: timeZone}];
    });
  }
  function deleteClock(index) {console.log('delete clock '+index)
    setClocks((oldClocks) => {
      return oldClocks.filter((clock, idx) => idx === index ? false : true);
    });
  }
  return (
    <div>
      <table>
        <thead>
        <tr>
          <td>Название</td>
          <td>Временная зона</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><input ref={nameInputRef} type="text"/></td>
            <td><input ref={timeZoneInputRef} type="number"/></td>
            <td><button onClick={addClock}>Добавить</button></td>
          </tr> 
        </tbody>
      </table>
      <div>
        {clockElements}
      </div>
    </div>
  );
}

export default ClocksControl;
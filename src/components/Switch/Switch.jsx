import React, { useState } from 'react';
import style from './switch.module.css';

const Switch = ({ initialState, action, labels = { on: 'On', off: 'Off' } }) => {
  const [isOn, setIsOn] = useState(initialState);

  function toggleSwitch() {
      const newState = !isOn;
      setIsOn(newState)
      action(newState)
  }

  return (
    <div onClick={toggleSwitch} className={style.switchContainer} onMouseEnter={()=>console.log(isOn)}>
      <div className={`${style.switch} ${isOn ? style.on : ''}`}>
        <div className={style.switchHandle} />
      </div>
      <span className={style.switchLabel}>{isOn ? labels.on : labels.off}</span>
    </div>
  );
};

export default Switch;
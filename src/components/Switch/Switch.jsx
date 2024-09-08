import React, { useState } from 'react';
import style from './switch.module.css';

const Switch = ({ initialState, action, label}) => {
  const [isOn, setIsOn] = useState(initialState);

  function toggleSwitch() {
      const newState = !isOn;
      setIsOn(newState)
      if (action !== undefined){
        action(newState)
      }
  }

  return (
    <div onClick={toggleSwitch} className={style.switchContainer}>
      <span>{label}</span>
      <div className={`${style.switch} ${isOn ? style.on : ''}`}>
        <div className={style.switchHandle} />
      </div>
    </div>
  );
};

export default Switch;
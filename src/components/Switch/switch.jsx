import React, { useState } from 'react';
import style from './switch.module.css';

const Switch = ({ initialState, onChange }) => {
    const [isOn, setIsOn] = useState(initialState);
  
    const toggleSwitch = () => {
      const newState = !isOn;
      setIsOn(newState);
      onChange(newState);
    };
  
    return (
        <div onClick={toggleSwitch} className={style.switchContainer}>
          <div className={`${style.switch} ${isOn ? style.on : ''}`}>
            <div className={style.switchHandle} />
          </div>
          <span className={style.switchLabel}>{isOn ? 'On' : 'Off'}</span>
        </div>
      );
  };
  
  export default Switch;
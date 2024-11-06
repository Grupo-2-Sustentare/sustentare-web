import React, { useState, useEffect } from 'react';
import style from './switch.module.css';

const Switch = ({ initialState, action, label, storageKey }) => {
  const storedState = sessionStorage.getItem(storageKey);
  const initial = storedState ? JSON.parse(storedState) : initialState;

  const [isOn, setIsOn] = useState(initial);

  useEffect(() => {
    // Salva o estado no sessionStorage sempre que o isOn mudar
    sessionStorage.setItem(storageKey, JSON.stringify(isOn));
    if (action !== undefined) {
      action(isOn);
    }
  }, [isOn, action, storageKey]);

  function toggleSwitch() {
    setIsOn(prevState => !prevState);
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

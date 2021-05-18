import { useState } from "react";
import styles from "./styles.module.css";

export function CountFillter({ values, selectedFillters, setFillter }) {

  function addFillter(value) {
    if (selectedFillters.includes(value)) {
      let newArr = [...selectedFillters];
      newArr.splice(selectedFillters.indexOf(value), 1);
      newArr.length > 0 ? setFillter([...newArr]) : setFillter([]);
    } else {
      setFillter([...selectedFillters, value]);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{values.title}</h3>
      {values.inputs.map((value, i) => (
        <div className={styles.inputWrapper} key={value} >
          <input
            type="checkbox"
            name={i}
            id={value}
            className={styles.input}
            onChange={(e) => addFillter(parseInt(e.target.name))}
          />
          <label htmlFor={value} className={styles.lable}>
            {value}
          </label>
        </div>
      ))}
    </div>
  );
}

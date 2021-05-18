import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export function TicketsFilter({
  filterTicket,
  sortByPrice,
  findOptimalTicket
}) {
  useEffect(() => {
    sortByPrice(filterTicket);
  }, [filterTicket]);

  return (
    <div className={styles.section}>
      <button
        type="button"
        name="chipper"
        className={styles.button}
        onClick={(e) => sortByPrice(e.target.name)}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={styles.button}
        name="fastest"
        onClick={(e) => sortByPrice(e.target.name)}
      >
        самый быстрый
      </button>
      <button type="button" className={styles.button} onClick={findOptimalTicket}>
        оптимальный
      </button>
    </div>
  );
}

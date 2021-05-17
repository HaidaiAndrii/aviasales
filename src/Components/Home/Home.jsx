import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { getId } from "../../API/API";
import { getTickets } from "../../API/API";
import { CountFillter } from './components/count-fillter/count-fillter'
import { Card } from './components/Card/Card'

export const Home = () => {
  let [searchId, setSearchId] = useState('');
  let [tickets, setTickets] = useState([]);
  let [selectedFillters, setFillter] = useState([]);
  let ecrinizedTickets = tickets;

  if(selectedFillters.length) {
    ecrinizedTickets = tickets.filter(ticket => selectedFillters.includes(ticket.segments[1].stops.length));
    console.log(selectedFillters)
  }

  useEffect(() => {
    if(!searchId) {
        getId().then((data) => setSearchId(data.searchId));
    }
    if(searchId) {
        getTickets(searchId).then(data => setTickets(data.tickets.splice(0,10))); //splice
    }

}, [searchId]);

let countFillterValues = {
    title: 'Количество персадок',
    inputs: ['Без пересадок', '1 Пересадка ', '2 Пересадки', '3 Пересадки']
}

  return (
    <div className={styles.main}>
      <CountFillter values={countFillterValues} selectedFillters={selectedFillters} setFillter={setFillter} />
      <div>
          {ecrinizedTickets.map(ticket => (
            <div className={styles.cards}>
                  <Card ticket={ticket} />
              </div>
          ))}
          </div>
    </div>
  );
};

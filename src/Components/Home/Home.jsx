import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { getId } from "../../API/API";
import { getTickets } from "../../API/API";
import { FilterByStops } from "./components/FilterByStops/FilterByStops";
import { Card } from "./components/Card/Card";
import { SortTickets } from "./components/SortTickets/SortTickets";
import { STOPSFILTER } from '../../Consts/Consts'

export const Home = () => {
  let [searchId, setSearchId] = useState("");
  let [tickets, setTickets] = useState([]);
  let [selectedFillters, setFillter] = useState([]);
  let [ecrinizedTickets, setEcrinizedTickets] = useState([]);
  let [ticketsCount, setTicketsCount] = useState(5);

  useEffect(() => {
    if (!searchId) {
      getId().then((data) => setSearchId(data.searchId));
    }
    if (searchId && tickets.length === 0) {
      getTickets(searchId).then((data) =>
        setTickets(data.tickets)
      );
    }

    ecrinizeTickets(tickets);
  }, [searchId, tickets, selectedFillters]);

  function ecrinizeTickets(tickets) {
    if (tickets && ecrinizedTickets.length === 0) {
      return setEcrinizedTickets([...tickets]);
    }

    if (selectedFillters.length) {
      return setEcrinizedTickets(tickets.filter((ticket) =>
          selectedFillters.includes(ticket.segments[1].stops.length)
        )
      );
    }

    return  setEcrinizedTickets([...tickets]);
  }



  function sortBy(value) {
    let sordetarr = [];
    switch (value) {
      case "chipper":
        sordetarr = ecrinizedTickets.sort((ticketA, ticketB) => ticketA.price - ticketB.price); break;
      case "fastest":
        sordetarr = ecrinizedTickets.sort((ticketA, ticketB) =>ticketA.segments[0].duration - ticketB.segments[0].duration); break;
      case "optimal":
        sordetarr =  findOptimalTicket(); break;
      default: return value;
    }
    setEcrinizedTickets([...sordetarr]);
  }

  function findOptimalTicket() {
    let sorted = ecrinizedTickets.sort((ticketA, ticketB) => ticketA.price - ticketB.price);
    sorted.forEach((el, i) => (el.priceIndex = i));
    sorted = sorted.sort((ticketA, ticketB) => ticketA.segments[0].duration - ticketB.segments[0].duration);
    sorted.forEach((el, i) => (el.ticketIndex = i + el.priceIndex));
    sorted = sorted.sort((ticketA, ticketB) => ticketA.ticketIndex - ticketB.ticketIndex
    );

    return sorted;
  }

  function addTickets() {
    setTicketsCount(ticketsCount += 5);
  }

  return (
    <div className={styles.main}>
      <FilterByStops
        values={STOPSFILTER}
        selectedFillters={selectedFillters}
        setFillter={setFillter}
      />
      <div>
        <SortTickets
          sortBy={sortBy}
          findOptimalTicket={findOptimalTicket}
        />
        {ecrinizedTickets.slice(0, ticketsCount).map((ticket, index) => (
          <div className={styles.cards} key={index}>
            <Card ticket={ticket} />
          </div>
        ))}
        <button className={styles.addButton} type="button" onClick={addTickets}>Добавить ещё 5 билетов</button>
      </div>
    </div>
  );
};

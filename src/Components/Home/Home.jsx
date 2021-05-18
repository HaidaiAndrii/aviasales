import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { getId } from "../../API/API";
import { getTickets } from "../../API/API";
import { CountFillter } from "./components/count-fillter/count-fillter";
import { Card } from "./components/Card/Card";
import { TicketsFilter } from "./components/TicketsFilter/TicketsFilter";

export const Home = () => {
  let [searchId, setSearchId] = useState("");
  let [tickets, setTickets] = useState([]);
  let [selectedFillters, setFillter] = useState([]);
  let [filterToSortTicket, setTicketsFilter] = useState([]);
  let [ecrinizedTickets, setEcrinizedTickets] = useState([]);
  let [ticketsCount, setTicketsCount] = useState(5);

  useEffect(() => {
    if (!searchId) {
      getId().then((data) => setSearchId(data.searchId));
    }
    if (searchId && tickets.length === 0) {
      getTickets(searchId).then((data) =>
        setTickets(data.tickets)
      ); //splice
    }

    if (tickets && ecrinizedTickets.length === 0) {
      setEcrinizedTickets([...tickets]);
    }

    if (selectedFillters.length) {
      setEcrinizedTickets(
        tickets.filter((ticket) =>
          selectedFillters.includes(ticket.segments[1].stops.length)
        )
      );
    } else {
      setEcrinizedTickets([...tickets]);
    }
  }, [searchId, tickets, selectedFillters]);

  let countFillterValues = {
    title: "Количество персадок",
    inputs: ["Без пересадок", "1 Пересадка ", "2 Пересадки", "3 Пересадки"],
  };

  function sortByPrice(value) {
    let sordetarr = [];
    // console.log("tryToFilter", value);
    switch (value) {
      case "chipper":
        sordetarr = ecrinizedTickets.sort((ticketA, ticketB) => {
          return ticketA.price - ticketB.price;
        });
        break;
      case "fastest":
        sordetarr = ecrinizedTickets.sort((ticketA, ticketB) => {
          return ticketA.segments[0].duration - ticketB.segments[0].duration;
        });
    }
    setEcrinizedTickets([...sordetarr]);
  }

  function findOptimalTicket() {
    let sorted = ecrinizedTickets.sort((ticketA, ticketB) => {
      return ticketA.price - ticketB.price;
    });

    sorted.forEach((el, i) => (el.priceIndex = i));

    sorted = sorted.sort((ticketA, ticketB) => {
      return ticketA.segments[0].duration - ticketB.segments[0].duration;
    });

    sorted.forEach((el, i) => (el.speedIndex = i));

    sorted.forEach((el) => (el.generalIndex = el.speedIndex + el.priceIndex));

    sorted = sorted.sort(
      (ticketA, ticketB) => ticketA.generalIndex - ticketB.generalIndex
    );
    // console.log(sorted);

    setEcrinizedTickets([...sorted]);
  }

  function addTickets() {
    setTicketsCount(ticketsCount += 5);
    // console.log(ticketsCount)
  }

  return (
    <div className={styles.main}>
      <CountFillter
        values={countFillterValues}
        selectedFillters={selectedFillters}
        setFillter={setFillter}
      />
      <div>
        <TicketsFilter
          filterToSortTicket={filterToSortTicket}
          sortByPrice={sortByPrice}
          findOptimalTicket={findOptimalTicket}
        />
        {ecrinizedTickets.splice(0, ticketsCount).map((ticket, index) => (
          <div className={styles.cards} key={index}>
            <Card ticket={ticket} />
          </div>
        ))}
        <button className={styles.addButton} type="button" onClick={addTickets}>Добавить ещё 5 билетов</button>
      </div>
    </div>
  );
};

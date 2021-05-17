import { useState } from "react";
import styles from "./styles.module.css";
import { InfoSection } from "../InfoSection/InfoSection";

export function Card({ ticket }) {
  console.log(ticket);

  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}ч ${seconds}м`;
  };

  function getTimeObj(dateFormat) {
    let date = new Date(dateFormat.date);
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let endHour =
      parseInt(`${dateFormat.duration}`.toHHMMSS().slice(0, 2)) +
      parseInt(hour);
    let endMinutes =
      parseInt(`${dateFormat.duration}`.toHHMMSS().slice(4, 6)) +
      parseInt(minutes);

    while (endMinutes >= 60) {
      endMinutes = endMinutes - 60;
      endHour++;
    }

    while (endHour >= 24) {
      endHour -= 24;
    }

    console.log(
      endMinutes,
      minutes,
      parseInt(`${dateFormat.duration}`.toHHMMSS().slice(4, 6))
    );

    if (endHour < 10) {
      endHour = `0${endHour}`;
    }
    if (endMinutes < 10) {
      endMinutes = `0${endMinutes}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hour}:${minutes} - ${endHour}:${endMinutes}`;
  }

  function getDatetitle(segments) {
    return `${segments.origin} - ${segments.destination}`;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.price}>{ticket.price} P</p>
        <div className={styles.Cardlogo}></div>
      </div>

      <div className={styles.ticketinfo}>
        <div>
          <InfoSection
            value={getTimeObj(ticket.segments[0])}
            title={getDatetitle(ticket.segments[0])}
          />
          <InfoSection
            value={getTimeObj(ticket.segments[1])}
            title={getDatetitle(ticket.segments[1])}
          />
        </div>

        <div>
          <InfoSection
            title={`в пути`}
            value={`${ticket.segments[0].duration}`.toHHMMSS()}
          />
          <InfoSection
            title={`в пути`}
            value={`${ticket.segments[1].duration}`.toHHMMSS()}
          />
          {/* <InfoSection  /> */}
        </div>

        <div>
          <InfoSection
            value={ticket.segments[0].stops.join(", ")}
            title={`${ticket.segments[0].stops.length} Остановки`}
          />
          <InfoSection
            value={ticket.segments[1].stops.join(", ")}
            title={`${ticket.segments[1].stops.length} Остановки`}
          />
        </div>
      </div>
    </div>
  );
}

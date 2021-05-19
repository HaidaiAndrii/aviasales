import styles from "./styles.module.css";
import { InfoSection } from "../InfoSection/InfoSection";

export function Card({ ticket }) {

  function toHHMMSS(value) {
    var sec_num = parseInt(value, 10);
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

  function checkTime(value) {
    return  value > 10 ? value : `0${value}`;
  }

  function getTime(dateFormat) {
    let date = new Date(dateFormat.date);
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let endHour =
      parseInt(toHHMMSS(`${dateFormat.duration}`).slice(0, 2)) +
      parseInt(hour);
    let endMinutes =
      parseInt(toHHMMSS(`${dateFormat.duration}`).slice(4, 6)) +
      parseInt(minutes);

    while (endMinutes >= 60) {
      endMinutes = endMinutes - 60;
      endHour++;
    }

    while (endHour >= 24) {
      endHour -= 24;
    }

    return `${checkTime(hour)}:${checkTime(minutes)} - ${checkTime(endHour)}:${checkTime(endMinutes)}`;
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
            value={getTime(ticket.segments[0])}
            title={getDatetitle(ticket.segments[0])}
          />
          <InfoSection
            value={getTime(ticket.segments[1])}
            title={getDatetitle(ticket.segments[1])}
          />
        </div>

        <div>
          <InfoSection
            title={`в пути`}
            value={toHHMMSS(`${ticket.segments[0].duration}`)}
          />
          <InfoSection
            title={`в пути`}
            value={toHHMMSS(`${ticket.segments[1].duration}`)}
          />
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

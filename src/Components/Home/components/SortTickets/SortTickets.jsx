import styles from "./styles.module.css";
import { SORTBUTTONS } from '../../../../Consts/Consts';
import { SortButton } from './components/SortButton/SortButton';

export function SortTickets({ sortBy }) {

  return (
    <div className={styles.section}>
      {SORTBUTTONS.map(button => 
        <SortButton sortBy={sortBy} name={button.name} title={button.title} />
      )}
    </div>
  );
}

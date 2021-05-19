import styles from "./styles.module.css";

export function SortButton({ title, name, sortBy }) {

  return (
      <button
        type="button"
        name={name}
        className={styles.button}
        onClick={(e) => sortBy(e.target.name)}
      >
        {title}
      </button>
  );
}

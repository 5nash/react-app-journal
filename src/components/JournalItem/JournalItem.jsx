import styles from "./JournalItem.module.css";

function JournalItem({ data }) {
  const title = data.title;
  const text = data.text;
  const date = data.date.toLocaleDateString("ru-RU");

  return (
    <>
      <h3 className={styles["journal-item__title"]}>{title}</h3>
      <div className={styles["journal-item__content"]}>
        <div className={styles["journal-item__date"]}>{date}</div>
        <p className={styles["journal-item__text"]}>{text}</p>
      </div>
    </>
  );
}

export default JournalItem;

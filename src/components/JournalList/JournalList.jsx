import styles from "./JournalList.module.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { UserContext } from "../../context/user.context.jsx";
import { useContext, useMemo } from "react";

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  const sortDate = (i1, i2) => (i1.date < i2.date ? 1 : -1);

  const filteredItems = useMemo(
    () => items.filter((i) => i.userId === userId).sort(sortDate),
    [items, userId]
  );

  if (filteredItems.length === 0) {
    return (
      <p className={styles["no-tasks"]}>Записей пока нету, добавьте первую!</p>
    );
  }

  return (
    <div className={styles["journal-list"]}>
      {filteredItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem data={el} />
        </CardButton>
      ))}
    </div>
  );
}

export default JournalList;

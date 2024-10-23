import styles from "./SelectUser.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);
  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select
      name="user"
      id={styles["user"]}
      value={userId}
      onChange={changeUser}
    >
      <option value="1">User#1</option>
      <option value="2">User#2</option>
    </select>
  );
}

export default SelectUser;

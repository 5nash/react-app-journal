import styles from "./Logo.module.css";
import SelectUser from "../SelectUser/SelectUser";

function Logo() {
  return (
    <>
      <a href="#" className={styles["logo"]}>
        <img src="/logo.svg" alt="logo" />
        <p>My Journal</p>
      </a>
      <SelectUser></SelectUser>
    </>
  );
}

export default Logo;

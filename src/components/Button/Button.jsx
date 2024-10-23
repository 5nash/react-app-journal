import styles from "./Button.module.css";
import cn from "classnames";

function Button({ children, className, ...props }) {
  return (
    <button {...props} className={cn(className, styles["button"])}>
      {children}
    </button>
  );
}

export default Button;

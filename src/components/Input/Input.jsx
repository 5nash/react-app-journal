import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
  { className, isValid = true, appearance, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles["form-input"], {
        [styles["form-input__settings"]]:
          appearance === "date" || appearance === "tag",
        [styles["form-input__title"]]: appearance === "title",
        [styles["invalid-form"]]: !isValid,
      })}
    />
  );
});

export default Input;

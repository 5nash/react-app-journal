import styles from "./CardButton.module.css";

function CardButton({ children, className, ...props }) {
  const cls = styles["card-button"] + (className ? " " + className : "");

  return (
    <button {...props} className={cls}>
      {children}
    </button>
  );
}

export default CardButton;

import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, reduceForm } from "./JournalForm.state.js";
import Input from "../Input/Input.jsx";
import { UserContext } from "../../context/user.context.jsx";

function JournalForm({ renderNote, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(reduceForm, INITIAL_STATE);
  const { isValid, isReadyFormToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusInvalid = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let idTime;

    if (!isValid.title || !isValid.date || !isValid.text) {
      focusInvalid(isValid);
      idTime = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDATE" });
      }, 1000);
    }

    return () => {
      clearTimeout(idTime);
    };
  }, [isValid]);

  useEffect(() => {
    if (isReadyFormToSubmit) {
      renderNote(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isReadyFormToSubmit, values, renderNote]);

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
    }
    dispatchForm({ type: "SET_VALUE", payload: data });
  }, [data]);

  const newNote = (e) => {
    e.preventDefault();

    dispatchForm({ type: "SUBMIT", payload: values, userId: userId });
  };

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
  };

  return (
    <form action="submit" className={styles["journal-form"]} onSubmit={newNote}>
      <Input
        type="text"
        name="title"
        ref={titleRef}
        isValid={isValid.title}
        onChange={onChange}
        value={values.title}
        appearance="title"
        placeholder="Создать заголовок"
      />
      <Input
        type="date"
        name="date"
        ref={dateRef}
        isValid={isValid.date}
        onChange={onChange}
        value={
          values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
        }
        appearance="date"
      />
      <div id={styles["form-tag"]}>
        <Input
          type="text"
          name="tag"
          onChange={onChange}
          value={values.tag}
          appearance="tag"
        />
      </div>
      <textarea
        name="text"
        ref={textRef}
        id={styles["post_text"]}
        onChange={onChange}
        value={values.text}
        className={cn(styles["form-input"], {
          [styles["invalid-form"]]: !isValid.text,
        })}
      ></textarea>
      <div className={styles["control-panel"]}>
        <Button>Сохранить</Button>
        <Button
          onClick={deleteJournalItem}
          className={styles["delete-button"]}
          type="button"
        >
          <img src="./delete.svg" alt="delete" />
        </Button>
      </div>
    </form>
  );
}

export default JournalForm;

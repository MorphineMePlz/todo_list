import { useCallback, useState } from "react";
import React from "react";
import styles from "./index.module.scss";

interface InputPlustProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlustProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);
  return (
    <div className={styles.inputPlus}>
      <input
        className={styles.inputPlusValue}
        placeholder="some words"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button
        onClick={addTask}
        className={styles.inputPlusButton}
        aria-label="Add"
      ></button>
    </div>
  );
};

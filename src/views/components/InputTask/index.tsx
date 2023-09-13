import { useState, useRef, useEffect } from "react";
import React from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  cheked: boolean;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  cheked,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(cheked);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  console.log(checked);
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label
        className={styles.inputTaskLabel}
        style={checked ? { textDecoration: "line-through" } : undefined}
      >
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />

        {isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(e) => setValue(e.target.value)}
            className={styles.inputTaskTitleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{value}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => setIsEditMode(true)}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};

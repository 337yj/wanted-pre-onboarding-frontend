import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../../../api/Todo";
import { Todo } from "../../../types";
import {
  faCheck,
  faXmark,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./todoItem.module.scss";

interface TodoItemProps {
  todo: Todo;
  onEdit: () => void;
}

const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>(todo);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateTodo(editedTodo.id, editedTodo);
    onEdit();
    setIsEditing(false);
  };

  const onCompleteTodo = async () => {
    if (!isEditing) {
      const updatedTodo = {
        ...editedTodo,
        isCompleted: !editedTodo.isCompleted,
      };
      setEditedTodo(updatedTodo);
      await updateTodo(updatedTodo.id, updatedTodo);
      onEdit();
    }
  };

  const onUpdateTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTodo(todo);
  };

  const onEditTodo = () => {
    setIsEditing(!isEditing);
  };

  const onDeleteTodo = async () => {
    await deleteTodo(todo.id);
    onEdit();
  };

  return (
    <li className={styles.wrapper}>
      <label htmlFor={`${todo.id}`}>
        <input
          id={`${todo.id}`}
          type="checkbox"
          checked={editedTodo.isCompleted}
          onChange={onCompleteTodo}
        />
      </label>
      {!isEditing ? (
        <span>{todo.todo}</span>
      ) : (
        <form onSubmit={onSubmit} className={styles.editForm}>
          <input
            type="text"
            name="todo"
            value={editedTodo.todo}
            data-testid="modify-input"
            onChange={onUpdateTodo}
            className={styles.editInput}
          />

          <button type="submit" data-testid="submit-button">
            <FontAwesomeIcon icon={faCheck} className={styles.icon} />
          </button>
          <button
            type="button"
            data-testid="cancel-button"
            onClick={cancelEdit}
          >
            <FontAwesomeIcon icon={faXmark} className={styles.icon} />
          </button>
        </form>
      )}

      {!isEditing && (
        <>
          <button
            type="button"
            data-testid="modify-button"
            onClick={onEditTodo}
          >
            <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
          </button>
          <button
            type="button"
            data-testid="delete-button"
            onClick={onDeleteTodo}
          >
            <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;

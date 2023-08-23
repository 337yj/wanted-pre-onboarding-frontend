import React, { useEffect, useState } from "react";
import { getTodos, createTodo } from "../../api/Todo";
import { Todo } from "../../types";
import TodoItem from "./TodoItem";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./todoList.module.scss";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const onGetTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo) return;

    const newTodoObj: Partial<Todo> = {
      todo: newTodo,
    };

    await createTodo(newTodoObj as Todo);

    setNewTodo("");
    onGetTodos();
  };

  useEffect(() => {
    onGetTodos();
  }, []);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  console.log(formattedDate);

  return (
    <section className={styles.wrapper}>
      <h2>{formattedDate}</h2>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={onChange}
          placeholder="오늘 할 일은?"
        />
        <button
          type="submit"
          data-testid="new-todo-add-button"
          disabled={!newTodo}
        >
          <FontAwesomeIcon icon={faAdd} className={styles.icon} />
        </button>
      </form>

      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={onGetTodos} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;

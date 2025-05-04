import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export function useTodos() {
  // ✅ 状態（todos）を定義
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });

  // ✅ ローカルストレージに保存（副作用）
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ 追加する関数
  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  //   input（ユーザー入力） → addTodo(input)
  //              ↓
  //          addTodo(text) {
  //          text → newTodo.text
  //          newTodo → todosに追加！
  //          }

  // ✅ 削除する関数
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ 完了を切り替える関数
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ✅ 最後に「使ってもらう値と関数を return」
  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
}

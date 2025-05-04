import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

function App() {
  const [input, setInput] = useState("");

  //初期値をlocalStorageから読み込んで使う
  const [add, setAdd] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });

  // addが変わるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(add));
  }, [add]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleAdd = () => {
    const newTodo = {
      id: uuidv4(), // ← ここでユニークIDを作る！
      text: input,
      completed: false,
    };
    const newArray = [...add, newTodo];
    if (input.trim() === "") return;
    setAdd(newArray);
    setInput("");
  };
  const handleDelete = (id) => {
    const newArray = add.filter((item) => item.id !== id);
    setAdd(newArray);
    console.log(newArray);
  };

  const handleCompleted = (id) => {
    const complete = add.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    console.log(complete); // ✅ここでまず新しく作った配列を確認！！
    setAdd(complete);
  };

  return (
    <>
      <h1>TODO APP</h1>
      <input value={input} onChange={handleInput} />
      <button onClick={handleAdd}>追加</button>

      <h2>📋 未完了リスト</h2>
      <ul>
        {add
          .filter((item) => item.completed === false)
          .map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
              onCompleted={() => handleCompleted(item.id)}
            />
          ))}
      </ul>

      <h2>✅ 完了リスト</h2>
      <ul>
        {add
          .filter((item) => item.completed === true)
          .map((item, id) => (
            <li
              key={id}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
              <button onClick={() => handleDelete(item.id)}>削除</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;

// useStateでaddを管理している

// handleAddでTODOを追加

// handleDeleteでTODOを削除

// handleCompletedでTODOを完了に切り替え

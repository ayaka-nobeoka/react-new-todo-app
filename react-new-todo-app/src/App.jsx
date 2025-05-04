import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [input, setInput] = useState("");
  const [add, setAdd] = useState([]);
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

      <h2>未完了リスト</h2>
      <ul>
        {add
          .filter((item) => item.completed === false)
          .map((item, id) => (
            <li
              key={id}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
              <button onClick={() => handleDelete(item.id)}>削除</button>
              <button onClick={() => handleCompleted(item.id)}>完了</button>
            </li>
          ))}
      </ul>

      <h2>完了リスト</h2>
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
              <button onClick={() => handleCompleted(item.id)}>完了</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;

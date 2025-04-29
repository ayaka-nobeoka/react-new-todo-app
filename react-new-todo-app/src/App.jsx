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
  const handleCompleted = () => {};
  return (
    <>
      <h1>TODO APP</h1>
      <input value={input} onChange={handleInput} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {add.map((item, id) => (
          <li key={id}>
            {item.text}
            <button onClick={() => handleDelete(item.id)}>削除</button>
            <button onClick={handleCompleted}>完了</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

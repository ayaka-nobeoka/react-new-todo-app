import { useState } from "react";
import "./App.css";
// import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [input, setInput] = useState("");

  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();
  console.log(useTodos());

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTodo(input); // ← カスタムフックの関数を呼ぶだけ！
    // ここで実行しているのは：

    // input（ユーザーが入力した文字列）を addTodo 関数の引数として渡す

    // addTodo の中でその値を text という名前で受け取る

    // その text を newTodo の中に入れる（text: inputの値）

    // それを setTodos() で state に追加
    setInput("");
  };

  return (
    <>
      <h1>TODO APP</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>追加</button>

      <h2>📋 未完了リスト</h2>
      <ul>
        {todos
          .filter((todo) => !todo.completed) // 未完了のものだけ取り出す
          .map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              onDelete={() => deleteTodo(todo.id)}
              onCompleted={() => toggleTodo(todo.id)}
            />
          ))}
      </ul>
      <h2>✅ 完了リスト</h2>
      <ul>
        {todos
          .filter((todo) => todo.completed) // 完了したものだけ
          .map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              onDelete={() => deleteTodo(todo.id)}
              onCompleted={() => toggleTodo(todo.id)}
            />
          ))}
      </ul>
    </>
  );
}

export default App;

// 依存配列とは？
// 「この中に書いた変数が変わったときだけ、中の処理を実行してね」という意味のリスト（配列）です！

// useStateでaddを管理している

// handleAddでTODOを追加

// handleDeleteでTODOを削除

// handleCompletedでTODOを完了に切り替え

//カスタムフック前

// 🧠 それぞれの役割
// state名	何を管理してる？	いつ使う？
// input	「いま入力欄に入ってる文字」	入力フォームの中だけ
// add	「TODOとして登録されたリスト全部」

// const handleInput = (e) => {
//   setInput(e.target.value);
// };

// //初期値をlocalStorageから読み込んで使う
// const [add, setAdd] = useState(() => {
//   const data = localStorage.getItem("todos");
//   return data ? JSON.parse(data) : [];
// });

// // addが変わるたびにローカルストレージに保存
// useEffect(() => {
//   localStorage.setItem("todos", JSON.stringify(add));
// }, [add]);

// 「useState の初期値に localStorage.getItem() の結果を関数で入れることで、一度だけ保存データを読み込んで使う」
// 「その後は useEffect を使って、状態が変わるたびに保存する」
// ＝ これでデータが消えないTODOアプリになる！

// ✅ 削除する関数
// const handleDelete = (id) => {
//   const newArray = add.filter((item) => item.id !== id);
//   setAdd(newArray);
//   console.log(newArray);
// };
// ✅ 完了を切り替える関数
// const handleCompleted = (id) => {
//   const complete = add.map((item) => {
//     if (item.id === id) {
//       return { ...item, completed: !item.completed }; // 👈 ここで状態を反転！
//     }
//     return item; // 👈 それ以外はそのまま
//   });
//   console.log(complete); // ✅ここでまず新しく作った配列を確認！！
//   setAdd(complete); // 👈 新しい配列に差し替え

// やっていること：
// add 配列を .map() で一つずつ見ていく

// id が一致したアイテムだけ completed を反転する

// true → false

// false → true

// それ以外のアイテムは何も変えずにそのまま

// 最終的に 新しい配列 を setAdd で更新する
// };

//   return (
//     <>
//       <h1>TODO APP</h1>
//       <input value={input} onChange={handleInput} />
//       <button onClick={handleAdd}>追加</button>

//       <h2>📋 未完了リスト</h2>
//       <ul>
//         {/* {add
//           .filter((item) => item.completed === false)
//           .map((item) => ( */}
//             // 🟡 add 配列の中から completed が false のものだけ .filter() で取り出して .map() で表示
//             <TodoItem
//               key={item.id}
//               item={todo}
//               onDelete={() => deleteTodo(item.id)}
//               onCompleted={() => toggleTodo(item.id)}
//             />
//           {/* ))} */}
//       </ul>

//       <h2>✅ 完了リスト</h2>
//       <ul>
//         {add
//           .filter((item) => item.completed === true)
//           .map((item) => (
//             <TodoItem
//               key={item.id}
//               item={item}
//               onDelete={() => handleDelete(item.id)}
//               onCompleted={() => handleCompleted(item.id)}
//             />
//           ))}
//       </ul>
//     </>
//   );

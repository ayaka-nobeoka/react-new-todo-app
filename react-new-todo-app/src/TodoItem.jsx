function TodoItem({ item, onDelete, onCompleted }) {
  console.log("propsで受け取ったitem:", item);

  return (
    <div>
      <li
        style={{
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        {item.text}
        <button onClick={onDelete}>削除</button>
        <button onClick={onCompleted}>
          {item.completed ? "未完了に戻す" : "完了"}
        </button>
      </li>
    </div>
  );
}

// onDelete は「関数」という「props」

//💡やっていること：
// item.completed の値によってボタンの中の文字を変える

// true のとき → 未完了に戻す

// false のとき → 完了

export default TodoItem;

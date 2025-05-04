function TodoItem({ item, onDelete, onCompleted }) {
  return (
    <div>
      <li
        style={{
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        {item.text}
        <button onClick={onDelete}>削除</button>
        <button onClick={onCompleted}>完了</button>
      </li>
    </div>
  );
}

export default TodoItem;

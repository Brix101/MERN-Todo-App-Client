import TodoItem from './TodoItem'

const Todos = ({ todos, onDelete, onToggle, onUpdate }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} />
      ))}
    </>
  )
}

export default Todos

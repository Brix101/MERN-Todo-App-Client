
const Header = ({onAdd}) => {

  return (
    <header className="d-flex justify-content-between noTodo">
        <h1>Todo</h1>
        <button className="btn btn-primary"
        onClick={onAdd}>Add</button>
    </header>
  )
}

export default Header

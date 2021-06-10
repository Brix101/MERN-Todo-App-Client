import { useState } from 'react'

const AddTodo = ({ onAdd,onAddClose }) => {
  const [todo, setTodo] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      alert('Please add a task');
      return;
    };

    onAdd({ todo });
    onAddClose();
    setTodo('');
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="d-flex justify-content-between"> 
        <h1>New Todo</h1>
        <button className="btn btn-danger"
        onClick={onAddClose}>Close</button>
      </div>
      <div className='form-control'>
        <input
          type='text'
          placeholder='New Todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Todo' className='btn btn-block btn-primary' />
    </form>
  )
}

export default AddTodo;

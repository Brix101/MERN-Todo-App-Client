import { useState } from 'react'

const UpdateTodo = ({onUpdate,onUpdateData,onUpdateclose}) => {

  const [todo, setTodo] = useState(onUpdateData.todo);


  const onSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      alert('Please add a task');
      return;
    };

    onUpdate({ todo });
    onUpdateclose();
    setTodo('');
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="d-flex justify-content-between"> 
        <h1>Update Todo</h1>
        <button className="btn btn-danger"
        onClick={onUpdateclose}>Close</button>
      </div>
      <div className='form-control'>
        <input
          type='text'
          placeholder='Todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>

      <input type='submit' value='Update Todo' className='btn btn-block btn-primary' />
    </form>
  )
}

export default UpdateTodo;

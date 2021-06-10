import { FaTimes  } from 'react-icons/fa'
import { ImCheckboxUnchecked,ImCheckboxChecked} from 'react-icons/im'
import {FiEdit} from 'react-icons/fi'
import { useState } from 'react'

const TodoItem = ({ todo, onDelete, onToggle,onUpdate }) => {
  
  const[fallId,setFallId]= useState(todo._id);
  const[fall,setFall]= useState('unFall');


  const onClickDelete=()=>{
    setFallId(todo._id);

    if(todo._id===fallId){
      setFall('fall');
      var timeleft = 10;
      var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          setFall('unFall');
          onDelete(todo._id);
        }
        timeleft -= 1;
      }, 60);
    }else{
      setFall('unFall');
    }


  }



  return (
    <div className={`d-flex justify-content-between task ${todo.completed} ${fall}`}>
      <h3>
          { todo.completed === true &&(
            <ImCheckboxChecked
            className="btn-container btn-dark"
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => onToggle(todo._id)}
            />
          )}
          { todo.completed === false &&(
            <ImCheckboxUnchecked
            className="btn-container btn-success"
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => onToggle(todo._id)}
            />
          )}

        {todo.todo}

      </h3>
      <h3>
        <FiEdit
          className="btn-container btn-primary"
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => onUpdate(todo._id)}
        />
        {' '}
        <FaTimes
        className="btn-container btn-danger"
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={onClickDelete}
        />
      </h3>
    </div>
  )
}

export default TodoItem

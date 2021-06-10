import React from 'react'

function SearchTodo({onSearch,setStatus}) {
    return (
        <div className='d-inline-flex form-control'>
            <input
                type='text'
                placeholder='Search Todo'
                onChange={(e) => onSearch(e.target.value)}
            />
            <div >
            <select onChange={(e) => setStatus(e.target.value)}  className="btn btn-primary">
                    <option className="dropdown-item" value="all">All</option>
                    <option className="dropdown-item" value="completed">Completed</option>
                    <option className="dropdown-item" value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </div>
    )
}

export default SearchTodo

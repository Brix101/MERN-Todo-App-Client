import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import AddTodo from './layout/AddTodo';
import TodoList from './layout/TodoList';
import UpdateTodo from './layout/UpdateTodo';
import SearchTodo from './layout/SearchTodo';
import axios from 'axios';
import Pagination from './layout/Pagination';

axios.defaults.withCredentials = true;
function Todo({onLogin}) {

    const [showAddTodo, setShowAddTodo] = useState(false);
    const [showUpdateTodo, setShowUpdateTodo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [onUpdateTodo, setOnUpdateTodo] = useState('');
    const [status, setStatus] = useState('all');
    const [todoSearch, setTodoSearch] = useState('');
    const [filteredTodos, setFilteredTodos] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);



      // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentTodo = filteredTodos.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  
    useEffect(() => {
      const statusFilterHander = () =>{
        switch(status){
          case 'completed':
            if(!todoSearch){
              setFilteredTodos(todos.filter((todo) => todo.completed===true));
            }else{
              setFilteredTodos(todos.filter((todo) => todo.completed===true && todo.todo===todoSearch));
            }
            break;
          case 'uncompleted':
            if(!todoSearch){
              setFilteredTodos(todos.filter((todo) => todo.completed===false));
            }else{
              setFilteredTodos(todos.filter((todo) => todo.completed===false && todo.todo===todoSearch))
            }
            break;
          default:
            if(!todoSearch){
              setFilteredTodos(todos);
            }else{
              setFilteredTodos(todos.filter((todo) => todo.todo===todoSearch));
            }
            break;
        }
      }

       const getTodo = async () => {
        await axios.get('http://localhost:5000/todo/todos')
        .then((response)=>setTodos(response.data));
      }
      getTodo();
      statusFilterHander();
      onLogin();
    }, [todos,status,todoSearch,onLogin]);


  // Add todo
  const addTodo = async (todo) => {
    try {
      await axios.post("http://localhost:5000/todo/create", todo);
      setShowAddTodo(!showAddTodo);
    } catch (err) {
      console.error(err);
    }
  }

  // // Delete Todo
  const deleteTodo = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/todo/${id}`);
    } catch (err) {
      console.error(err);
    }
  }
    // Fetch Todo
  const fetchTodo = async (id) => {
    const res = await axios.get(`http://localhost:5000/todo/${id}`);
    return res.data;
  }

  // // Toggle Reminder
  const toggleCompleted = async (id) => {

    const todoToToggle = await fetchTodo(id)

    const updateCompleted = {completed: !todoToToggle.completed }

    try{
        await axios.put(`http://localhost:5000/todo/${id}`,updateCompleted);
    }catch (err) {
      console.error(err);
    }
  }
  const toUpdateTodo = async (todo) => {
    const id = onUpdateTodo._id;
    try{
      await axios.put(`http://localhost:5000/todo/${id}`,todo);
    }catch (err) {
      console.error(err);
    }
  }
  const onUpdateTodoClick = async (id)=>{
    const resTodo = await fetchTodo(id);
    setOnUpdateTodo(resTodo);

    
    setShowAddTodo(false);
    setShowUpdateTodo(true);
  }
  const updateClose = ()=>{
    setShowUpdateTodo(false);
  }
  const addShow = ()=>{
    setShowAddTodo(true);
    setShowUpdateTodo(false);
  }
  const addClose =()=>{
    setShowAddTodo(false);
  }

    return (
    <Router>
      <div className='container'>
        {showUpdateTodo && <UpdateTodo onUpdate ={toUpdateTodo} onUpdateData={onUpdateTodo} onUpdateclose={updateClose} />}

        {showAddTodo && <AddTodo onAdd={addTodo} onAddClose={addClose}/>}
        
        {!showUpdateTodo && !showAddTodo &&
        <Route
          path='/'
          exact
          render={(props) => (
            <>
            <Header onAdd={addShow}/>
            {todos.length > 0 &&
            <SearchTodo 
              onSearch={setTodoSearch} 
              setStatus={setStatus}
              />
            }
            {todos.length > 0 ? (
                <TodoList 
                  todos={currentTodo}
                  onDelete={deleteTodo}
                  onToggle={toggleCompleted}
                  onUpdate={onUpdateTodoClick}
                  />
                  
            ) : (
              <div className='form-control d-flex justify-content-center noTodo'>
                <h1>No Todos To Show</h1>
            </div>
            )}
            <div>
              <Pagination
              postsPerPage={postsPerPage}
              totalPosts={todos.length}
              paginate={paginate}
              />
            </div>

            </>
          )}
        />
        }
        <Footer />
      </div>
    </Router>
    )
}

export default Todo

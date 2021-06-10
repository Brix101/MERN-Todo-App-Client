import axios from 'axios';
import React, { useContext, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Todo from './components/Todo';
import AuthContext from './context/AuthContext';


function Routers() {
    const { loggedIn } = useContext(AuthContext);

    const [user, setUser] = useState('');
  
    const getUser = async ()=> {
        await axios.get('http://localhost:5000/auth/user')
        .then((response) =>setUser(response.data))
        .catch((error)=>{ console.log(error)});
    }

    
    return (
        <BrowserRouter>
        <Navbar user={user} />
        <Switch>
          {loggedIn === false && (
            <>
              <Route exact path="/register">
                <Register/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/">
                <Redirect to='/login' />
              </Route>
            </>
          )}
          {loggedIn === true && (
            <>
              <Route exact path="/">
                <Todo onLogin={getUser}/>
              </Route>
            </>
          )}
        </Switch>
      </BrowserRouter>
    )
}

export default Routers

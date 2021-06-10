import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar({user}) {

  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <div className="">
        <Link to='/' className="navbar-brand">Todo App</Link>
        </div>
        <form className="form-inline my-2 my-lg-0">
          {loggedIn === false && (
            <>
              <Link to='/register'  className="btn btn-outline-primary my-2 my-sm-0" type="submit">Register</Link>
              <Link to='/login'  className="btn btn-outline-primary my-2 my-sm-0" type="submit">Login</Link>
            </>
          )}
          {loggedIn === true && (
            <div className="d-flex justify-content-between">
              <h1 className="navbar-brand mb-0 h1">{user}</h1>
              <Link to='/login' component={LogOutBtn} />
            </div>
          )}
        </form>
        </nav>
    </div>
  );
}

export default Navbar;

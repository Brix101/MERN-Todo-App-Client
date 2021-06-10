import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    history.push("/login");
  }

  return <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={logOut}>Log out</button>;
}

export default LogOutBtn;

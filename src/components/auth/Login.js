import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Footer from "../layout/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    if (!email&&!password) {
      alert('Please input');
      return;
    };

    try {
      const loginData = {
        email,
        password,
      };
      const response = await axios.post("http://localhost:5000/auth/login", loginData)
        if(!response.data.message){
          await getLoggedIn();
          history.push("/");
        }else{
          alert(response.data.message);
        }

    } catch (error) {
      console.error(error);
    }


  }

  return (
    <div  className="container">
      <h1>Log in to your account</h1>
      <form className='add-form' onSubmit={login}>
      <div className='form-control'>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className='form-control'>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
        <button type="submit" className='btn btn-block btn-primary' >Log in</button>
      </form>
      <Footer/>
    </div>
  );
}

export default Login;

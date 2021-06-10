import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Footer from "../layout/Footer";

function Register() {
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    if (!name&&!email && !password&&!passwordVerify) {
      alert('Please input');
      return;
    };


    try {
      const registerData = {
        name,
        email,
        password,
        passwordVerify,
      };

      await axios.post("http://localhost:5000/auth/register", registerData);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div  className="container">
      <h1>Register a new account</h1>
      <form className='add-form' onSubmit={register}>
      <div className='form-control'>
        <input
          type="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
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
      <div className='form-control'>
        <input
          type="password"
          placeholder="Verfiry Password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
      </div>
        <button type="submit"className='btn btn-block btn-primary'>Register</button>
      </form>
      <Footer/>
    </div>
  );
}

export default Register;

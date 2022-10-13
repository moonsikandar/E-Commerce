import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseAuth";
import { useDispatch } from "react-redux";
import { authUser } from "../action/action";

import SIGNcss from "./sign.module.css";
const SignIn = () => {

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");

  const [loggeduser, setLoggedUser] = useState("");

  const dispatch = useDispatch();

  dispatch(authUser(loggeduser));

  const signin = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setLoggedUser(user);
    } catch (error) {
      console.log(error.messsage);
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
  };
 
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={SIGNcss.sign}>
          <div>
            <h3>Login Form </h3>
            <label>Enter your LoginEmail</label>
            <br></br>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label>Enter your Password</label>
            <br></br>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            ></input>
            <br></br>
            <button onClick={signin}>Sign In</button>
          </div>
        </div>

       
      </form>
    </div>
  );
};

export default SignIn;

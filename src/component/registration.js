import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebaseAuth";
import SignIn from "./signIn";
import REGcss from "./registration.module.css";
const Registration = () => {
  const [registerEmail, setRegisterEmial] = useState("");
  const [registerPassword, setRegisterPssword] = useState("");
  const [loginUser, setLoginUSer] = useState("");
  const register = async (e) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setLoginUSer(user);
    } catch (error) {
      console.log(error.messsage);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {loginUser ? (
        <SignIn />
      ) : (
        <form onSubmit={submitHandler}>
          <div className={REGcss.reg}>
            <h3>registeration</h3>
            <div>
              <label>Enter your Email</label>
              <br></br>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmial(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>Enter your Password</label>
              <br></br>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => {
                  setRegisterPssword(e.target.value);
                }}
              ></input>

              <button onClick={register}>Create Account</button>
            </div>
          </div>
        </form>
      )}
      
    </div>
  );
};

export default Registration;

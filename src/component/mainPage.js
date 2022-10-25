import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Registration from "./registration";
import SignIn from "./signIn";
import Main from "./mainpage.module.css";
const MainPage = () => {
  const [register, setRegister] = useState(false);
  const user = useSelector((state) => state.product.user);

  return (
    <div className={Main.main}>
      {user ? "" : register ? <Registration /> : <SignIn />}
      {user ? (
        ""
      ) : (
        <Link to="/register">
          Do you have an Account?
          <button
            className={Main.btn}
            onClick={() => {
              setRegister(!register);
            }}
          >
            {register ? "Sign in" : "Sign up Now"}
          </button>
        </Link>
      )}
    </div>
  );
};

export default MainPage;

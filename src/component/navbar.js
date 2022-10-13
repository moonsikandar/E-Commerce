import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {SelectionFilter} from "../action/action"
const Navbar = () => {
  const [navigation, setNavigation] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setNavigation(navigate(`/${e.target.value}`));
    dispatch(SelectionFilter(e.target.value))
  };
  
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <select value={navigation} onChange={changeHandler}>
              <option value="">CATEGORIES</option>
              <option value="men">Men's Clothing</option>
              <option value="women">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">electronics</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

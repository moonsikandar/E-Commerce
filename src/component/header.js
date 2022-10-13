import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import style from "./header.module.css";
import Badge from "@mui/material/Badge";
import { Menu } from "@mui/material";
import logo from "../images/starbucks.png";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { searchItem } from "../action/action";
import { Link } from "react-router-dom";
import { DLT, Decrease, ADD } from "../action/action";
import { auth } from "../firebase/firebaseAuth";
import { signOut } from "firebase/auth";
const Header = () => {
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartProduct.items);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const del = (id) => {
    dispatch(DLT(id));
  };

  const addQuantity = (e) => {
    dispatch(ADD(e));
  };
  const removeQuantity = (e) => {
    dispatch(Decrease(e));
  };
  const searchHandler = (e) => {
    dispatch(searchItem(e.target.value));
  };
  const signout = async () => {
    await signOut(auth).then(() => {
      window.location.reload();
    });
  };

  const priceByQuantity = () => {
    let totalItemPrice = 0;
    getData.map((e) => {
      totalItemPrice += e.quantity * e.price;
    });
    setPrice(totalItemPrice);
  };
  useEffect(() => {
    priceByQuantity();
  }, [priceByQuantity]);

  return (
    <div className={style.header}>
      <button onClick={signout}>LogOut</button>
      <div className={style.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={style.search}>
        <input className={style.input} type="search" onChange={searchHandler} />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <Navbar />
      <div>
        <Badge
          badgeContent={getData.length}
          color="primary"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i className="fa-solid fa-cart-shopping" />
        </Badge>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {getData.length ? (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>photo</th>
                  <th>Article name</th>
                  <button onClick={handleClose}>
                    <i className="fas fa-close" onClose={handleClose}></i>
                  </button>
                </tr>
              </thead>
              <tbody>
                {getData.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <Link to={`/specific/${e.id}`} state={e}>
                            <img
                              src={e.image}
                              style={{ width: "5rem", height: "5rem" }}
                              alt="products"
                            />
                          </Link>
                        </td>
                        <td>
                          <p>{e.title}</p>
                          <p>${e.quantity * e.price}</p>
                          <p>
                            <button onClick={() => removeQuantity(e)}>-</button>{" "}
                            {e.quantity}{" "}
                            <button onClick={() => addQuantity(e)}>+</button>
                          </p>
                          <button onClick={() => del(e.id)}>
                            {" "}
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <p>Total:{price.toFixed(2)}</p>
            </Table>
          </div>
        ) : (
          <div className="cart_detail">
            <button onClick={handleClose}>
              <i className="fas fa-close" onClose={handleClose}></i>
            </button>
            <p>your cart is empty</p>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default Header;

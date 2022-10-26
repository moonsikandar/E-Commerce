import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebaseAuth";
import  "./placeOrder.module.css"
const PlaceOrder = () => {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState();
  const [userDetail, SetUserDetail] = useState({});
  const [price, setPrice] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const getData = useSelector((state) => state.cartProduct.items);
  useEffect(() => {
    const curr_user = JSON.parse(localStorage.getItem("user"));
    if (curr_user) {
      setCurrentUser(curr_user);
    }
  }, []);
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };
  const numberChangeHandler = (e) => {
    setNumber(e.target.value);
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

  const submitHandler = async () => {
    SetUserDetail({
      name,
      address,
      number,
      articles: getData,
      totalPrice: price,
    });
    if (name !=="" && address !=="" && number !=="") {
      setShowForm(true);
      await setDoc(doc(db, "User_Oder_Detail", currentUser.uid), {
        userDetail,
      });
      setName("");
      setAddress("");
      setNumber("");
    }
  };
  const orderHandler = () => {
    setShow(false);
    alert(
      " SucessFul ! your order will be delivered within three working days, be in Touch "
    );
  };

  return (
    <div>
      <div style={{ margin: "0 0 10px 0" }}>
        {getData.map((e) => {
          return (
            <img
              src={e.image}
              style={{ width: "10rem", height: "10rem", margin: "15px" }}
              alt="products"
            />
          );
        })}
      </div>
      {showForm ? (
        <div style={{ margin: "0 0 15px 0" }}>
          <h2>{userDetail.name}</h2>
          <h5>{userDetail.number}</h5>
          <span>Total Amount : {userDetail.totalPrice}</span>
          {userDetail.articles.map((e) => {
            return <li>{e.title}</li>;
          })}
          <span>Your Address: {userDetail.address}</span>

        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label>Name:</label><br></br>
            <input
              type="text"
              value={name}
              placeholder="please enter your fullname"
              onChange={nameChangeHandler}
              required
            />
          </div>
          <div>
            <label>Address:</label><br></br>
            <input
              type="text"
              value={address}
              placeholder="please enter your complete address"
              onChange={addressChangeHandler}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label><br></br>
            <input
              type="number"
              value={number}
              placeholder="contact number"
              onChange={numberChangeHandler}
              required
            />
          </div>
          <button  onClick={submitHandler}>confirm your order</button>
        </form>
      )}
      <div>
        {showForm ? (
          <Button variant="primary" onClick={handleShow}>
            pay now
          </Button>
        ) : (
          ""
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment </Modal.Title>
          </Modal.Header>
          <Modal.Body>pay your amount through credit card</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Link to="/">
              {" "}
              <Button variant="primary" onClick={orderHandler}>
                confirm
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PlaceOrder;

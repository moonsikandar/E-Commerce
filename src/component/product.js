import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD, View } from "../action/action";

const Product = ({ products, selectedProducts }) => {
  const [query, setQuery] = useState("");

  const getData = useSelector((state) => state.product.search);
  // const itemsInCart = useSelector((state) => state.product.items);
  const dispatch = useDispatch();
  const sendData = (e) => {
    const newitem = e;
    // if (!itemsInCart.includes(newitem)) {
      dispatch(ADD(newitem));
    // }
  };
  const viewData = (e) => {
    dispatch(View(e));
  };

  useEffect(() => {
    setQuery(getData);
  }, [getData]);

  var filterItems = [...products];

  if (query.length > 0) {
    filterItems = filterItems.filter((e) => {
      return e.title.toLowerCase().includes(query) || e.id === query;
    });
  }

  return (
    <>
      {filterItems?.map((e) => {
        return (
          <Card key={e.id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={e.image}
              alt=" "
              style={{ width: "11rem", height: "15rem", margin: "0 auto" }}
            />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
              <Button variant="primary mb-3" onClick={() => sendData(e)}>
                Add to Cart
              </Button>
              <br></br>
              <Link state={e} to={`/specific/${e.id}`}>
                <Button variant="primary" onClick={() => viewData(e)}>
                  View in Detail
                </Button>{" "}
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default Product;

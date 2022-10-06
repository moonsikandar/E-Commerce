import { integerPropType } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CartDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log("data",data)
  const getData = useSelector((state) => state.carts.items);
  const compare = () => {
    let compareData = getData.filter((e) => {
 
      return e.id ==parseInt(id);
      
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      {data.map((e) => {
        return (
          <div key={e.id} style={{ width: "50%", margin: "0 auto" }}>
            <div>
              <img src={e.image} style={{ width: "10rem", height: "15rem" }} alt="item"/>
            </div>
            <h3>{e.title}</h3>
            <div
              style={{ display: "flex", gap: "45px", justifyContent: "center" }}
            >
              <span>PRICE: ${e.price}</span>
              <span>RATING: {e.rating.rate}</span>
            </div>
            <p>{e.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default CartDetail;

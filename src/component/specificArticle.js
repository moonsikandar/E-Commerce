import React from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const getData = useSelector((state) => state.carts.item);
  return (
    <>
      {getData.map((e) => {
        return (
          <div key={e.id} style={{ width: "50%", margin: "0 auto" }}>
            <div>
              <img
                src={e.image}
                style={{ width: "10rem", height: "15rem" }}
                alt="pro"
              />
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

export default Article;

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Electronics = ({ products }) => {
  const [data, setData] = useState([]);
  const getData = useSelector((state) => state.carts.select);

  const comparison = () => {
    let comparingName = products.filter((e) => {
      return e.category === getData;
    });
    setData(comparingName);
  };
  useEffect(() => {
    comparison();
  }, [getData]);
  return (
    <div style={{display:"flex",justifyContent:"space-evenly", flexWrap:"wrap" }}>
      {data?.map((e) => {
        return (
          <Card key={e.id} style={{ width: "18rem",}}>
            <Card.Img
              variant="top"
              src={e.image}
              alt=" "
              style={{ width: "11rem", height: "15rem", margin: "0 auto" }}
            />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
                        
            </Card.Body>
          </Card>
        );
      })}
   </div>
  );
};

export default Electronics;

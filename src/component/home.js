import React from "react";
import Product from "./product";


const Home = ({products}) => {

  return (
    <div className="Card-container">
    <Product products={products}/>
    
    
    </div>
  );
};

export default Home;

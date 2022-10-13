import React from "react";
import Product from "../../component/product";

const Home = ({ products, selectedProducts }) => {
  return (
    <div className="Card-container">
      {products ? (
        <Product products={products} />
      ) : (
        <Product products={selectedProducts} />
      )}
    </div>
  );
};

export default Home;

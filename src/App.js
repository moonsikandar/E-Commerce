import "./App.css";
import Header from "./component/header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import About from "./Pages/About/about";
import Contact from "./Pages/Contact/contact";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./component/mainPage";
import Article from "./component/specificArticle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const user = useSelector((state) => state.product.user);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) =>
        setProducts(
          json.map((it) => {
            return { ...it, quantity: 1 };
          })
        )
      );
  }, []);

  const choosenData = useSelector((state) => state.product.select);
  const comparison = () => {
    let comparingName = products.filter((e) => {
      return e.category.includes(choosenData);
    });
    setSelectedData(comparingName);
  };
  useEffect(() => {
    comparison();
  }, [choosenData]);

  return (
    <>
      {user ? (
        <div className="container">
          <Header products={products} />
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/electronics"
              element={<Home selectedProducts={selectedData} />}
            />
            <Route
              path="/jewelery"
              element={<Home selectedProducts={selectedData} />}
            />
            <Route
              path="/men"
              element={<Home selectedProducts={selectedData} />}
            />
            <Route
              path="/women"
              element={<Home selectedProducts={selectedData} />}
            />
            <Route
              path="/specific/:id"
              element={<Article products={products} />}
            />
          </Routes>
        </div>
      ) : (
        <MainPage />
      )}
    </>
  );
}

export default App;

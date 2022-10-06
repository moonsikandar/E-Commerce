import "./App.css";
import Header from "./component/header";
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import About from "./component/about";
import Contact from "./component/contact";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./component/mainPage";
import Category from "./component/categories";
import Article from "./component/specificArticle";
import { useState,useEffect } from "react";
import CartDetail from "./component/cartDetail";
import { useSelector } from "react-redux";

function App() {

  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.carts.user);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  
  return (
    
     <>   
       {user? <div className="container">
          <Header products={products}/>
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/electronics" element={<Category products={products}/>} />
            <Route path="/jewelery" element={<Category products={products}/>} />
            <Route path="/men's clothing"  element={<Category products={products}/>} />
            <Route path="/women's clothing"  element={<Category products={products}/>} />
            <Route path="/cartdetail/:id" element={<CartDetail />} />
            <Route path="/specific/:id" element={<Article  products={products}/>} />
          </Routes>
        </div>:<MainPage/>}

     </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
import CartList from "./components/CartList";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios.get("/posts/get").then((res) => {
      if (res.data.code === "00") {
        setPosts(res.data.content);
        console.log(res.data.content, " API response content");
      }
    });
  }

  const toggleCartVisibility = () => {
    setIsCartVisible((prevState) => !prevState);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = posts.filter(
    (post) => post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (cardDetails) => {
    setCart([...cart, { ...cardDetails, quantity: 1 }]);
  };

  function filteredData(selected, query) {
    let filteredPosts = posts;

    if (query) {
      filteredPosts = filteredItems;
    }

    if (selected) {
      filteredPosts = filteredPosts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredPosts.map(({ img, title, star, reviews, prevPrice, newPrice, company, category }) => (
      <Card
        key={Math.random()}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        prevPrice={prevPrice}
        newPrice={newPrice}
        company={company}
        category={category}
        onAddToCart={handleAddToCart}
      />
    ));
  }

  const result = filteredData(selectedCategory, query);

  return (
    <>
      {!isCartVisible && <Sidebar handleChange={handleChange} />}
      <Navigation
        query={query}
        handleInputChange={handleInputChange}
        count={cart.length}
        toggleCartVisibility={toggleCartVisibility}
      />
      {!isCartVisible && <Recommended handleClick={handleClick} />}
      {isCartVisible && <CartList cart={cart} />}
      {!isCartVisible && <Products result={result} />}
    </>
  );


  
}

export default App;
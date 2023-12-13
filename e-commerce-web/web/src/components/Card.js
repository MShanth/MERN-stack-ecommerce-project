import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, star, reviews, prevPrice, newPrice,company,category, onAddToCart  }) => {
  
  // Function to handle the "Add to cart" button click
  const handleAddToCartClick = () => {
    // Prepare the card details object
    const cardDetails = {
      img,
      title,
      star,
      reviews,
      prevPrice,
      newPrice,
      company,
      category
    };

    // Call the onAddToCart function passed from the parent component
    onAddToCart(cardDetails);
  };
  
  
  
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">

              <button onClick={handleAddToCartClick}>
                <BsFillBagFill className="bag-icon" />
                <span>Add to cart</span>
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
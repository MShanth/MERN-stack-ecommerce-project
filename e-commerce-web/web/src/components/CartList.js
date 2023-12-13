import React, { useState, useEffect } from 'react';
import Modal from './Modal';

function CartItem({ cartItem, handleDecreaseQuantity, handleIncreaseQuantity }) {
   return (
    <div className='cart-single-list'>
      <img src={cartItem.img} width={40} alt={cartItem.title} className='img-cart-single' />
      <span className='img-cart-single'>{cartItem.title}</span>
      <span className='img-cart-company'>{cartItem.company}</span>
      <span className='img-cart-category'>{cartItem.category}</span>
      <button onClick={() => handleDecreaseQuantity(cartItem)} className='cart-quantity-btn'> - </button>
      <span className='img-cart-quantity'>{cartItem.quantity}</span>
      <button onClick={() => handleIncreaseQuantity(cartItem)} className='cart-quantity-btn'> + </button>
      <span className='img-cart-price'>{(cartItem.newPrice * cartItem.quantity).toFixed(2)}</span>
    </div>
  );
}

function CartList({ cart }) {
  const [CART, setCART] = useState([]);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [payment, setPayment] = useState('');
  const [purchaseAlert, setPurchaseAlert] = useState(false);
  const [isCheckoutClicked, setCheckoutClicked] = useState(false); // New state to track checkout button click

  useEffect(() => {
    setCART(cart);
  }, [cart]);

  const getTotalCartValue = () => {
    return cart.reduce((total, item) => total + parseFloat(item.newPrice) * item.quantity, 0);
  };

  const handleDecreaseQuantity = (cartItem) => {
    if (cartItem.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCART(updatedCart);
    }
  };

  const handleIncreaseQuantity = (cartItem) => {
    const updatedCart = cart.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCART(updatedCart);
  };

  const handleCheckoutClick = () => {
    setCheckoutModalOpen(true);
    setCheckoutClicked(true); // Set the checkout button clicked
  };

  const handlePurchaseClick = () => {
    if (address && contact && payment) {
      setCART([]); // Clear the cart by setting an empty array
      setPurchaseAlert(true); // Show the purchase success alert
    }
  };

  const closeModal = () => {
    setCheckoutModalOpen(false);
    setPurchaseAlert(false);
  };

  return (
    <div className="cart-list-container">
      {CART.map((cartItem, cartIndex) => (
        <CartItem
          key={cartIndex}
          cartItem={cartItem}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
        />
      ))}

      <p className='img-cart-total'>
        Total Cart Value: {getTotalCartValue().toFixed(2)}
      </p>
      {/* {isCheckoutClicked ? null : ( // Hide the checkout button if it's clicked once
        <p>
          <button onClick={handleCheckoutClick} className='cart-checkout-button'>Check Out</button>
        </p>
      )} */}

      <Modal onClose={closeModal}>
          <div>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
              Contact:
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            </label>
            <label>
              Payment:
              <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </label>
            <button onClick={handlePurchaseClick}>Purchase</button>
          </div>
        </Modal>
      

      {purchaseAlert && (
        <div className="purchase-alert">
          Your purchase is successful!
        </div>
      )}
    </div>
    
  );
}

export default CartList;
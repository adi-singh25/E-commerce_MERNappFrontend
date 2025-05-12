
import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, setCartItems } = useContext(ShopContext);

  const handleCheckout = async () => {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) {
      alert("❌ Name and email are required!");
      return;
    }

    const confirmCOD = window.confirm("✅ Please confirm that you accept 'Cash on Delivery' as the payment method.");

    if (!confirmCOD) {
      alert("❌ You must confirm Cash on Delivery to proceed.");
      return;
    }

    const orderedItems = all_product
      .filter((e) => cartItems[e.id] > 0)
      .map((e) => ({
        productId: e.id,
        name: e.name,
        quantity: cartItems[e.id],
        price: e.new_price,
        total: e.new_price * cartItems[e.id],
      }));

    const totalAmount = getTotalCartAmount();

    const orderDetails = {
      customerName: name,
      customerEmail: email,
      items: orderedItems,
      totalAmount: totalAmount,
      timestamp: new Date(),
    };

    try {
      const response = await fetch("http://localhost:4000/placeorder", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
                alert("✅ Order Placed Successfully!");
             } else {
               alert("❌ Order Failed. Try again.");
             }
          } catch (err) {
            console.error("Order placement error:", err);
           alert("❌ Order Failed.");
          }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className='cart-remove-icon'
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;


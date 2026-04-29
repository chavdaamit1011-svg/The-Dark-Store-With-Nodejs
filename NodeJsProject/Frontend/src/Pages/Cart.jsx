import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../Api';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeUser, setActiveUser] = useState(null);

  const fetchCart = async (user) => {
      try {
          const res = await Api.get(`/cart/${user.email}`);
          if (res.data.success) {
              const mapped = res.data.cart.items.map(item => ({
                  ...(item.product || {}),
                  quantity: item.quantity,
                  selectedSize: item.selectedSize,
                  selectedColor: item.selectedColor
              })).filter(i => i._id);
              setCart(mapped);
              calculateTotal(mapped);
          }
      } catch (err) {
          console.error("Error fetching cart", err);
      }
  };

  useEffect(() => {
     const storedStr = localStorage.getItem('user');
     if (!storedStr) return;
     const user = JSON.parse(storedStr);
     setActiveUser(user);
     fetchCart(user);
  }, []);

  const calculateTotal = (items) => {
      let sum = 0;
      items.forEach(item => {
          if (!item.price) return;
          const priceStr = String(item.price).replace(/[^0-9.]/g, '');
          sum += (Number(priceStr) * item.quantity);
      });
      setTotal(sum);
  };

  const updateQuantity = async (idx, increment) => {
      if (!activeUser) return;
      const item = cart[idx];
      
      const action = increment ? "inc" : "dec";
      if (!increment && item.quantity <= 1) return;

      try {
          await Api.post("/cart/update", {
              userEmail: activeUser.email,
              productId: item._id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
              action
          });
          
          window.dispatchEvent(new Event('cartUpdated'));
          fetchCart(activeUser);
      } catch (err) {
          console.error(err);
          toast.error("Error updating quantity");
      }
  };

  const removeItem = async (idx) => {
      if (!activeUser) return;
      const item = cart[idx];

      try {
          await Api.post("/cart/remove", {
              userEmail: activeUser.email,
              productId: item._id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor
          });
          
          window.dispatchEvent(new Event('cartUpdated'));
          fetchCart(activeUser);
          toast.success("Item removed");
      } catch (err) {
          console.error(err);
          toast.error("Error removing item");
      }
  };

  return (
    <div className="cart-container">
      <style>{`
          body {
             background-color: #050505;
             color: white;
          }
          .cart-container {
             max-width: 1200px;
             margin: 50px auto;
             padding: 0 20px;
          }
          .cart-title {
             font-size: 32px;
             font-weight: 700;
             margin-bottom: 30px;
             color: #00d4ff;
          }
          .cart-grid {
             display: grid;
             grid-template-columns: 1fr;
             gap: 40px;
          }
          @media(min-width: 992px) {
             .cart-grid { grid-template-columns: 2fr 1fr; }
          }
          .cart-items {
             background: #111;
             border: 1px solid #222;
             border-radius: 16px;
             padding: 20px;
          }
          .cart-item-row {
             display: flex;
             align-items: center;
             gap: 20px;
             padding: 20px 0;
             border-bottom: 1px solid #222;
          }
          .cart-item-row:last-child {
             border-bottom: none;
          }
          .cart-item-img {
             width: 100px;
             height: 100px;
             object-fit: cover;
             border-radius: 12px;
          }
          .cart-item-details h4 {
             font-size: 18px;
             margin-bottom: 5px;
          }
          .cart-item-details p {
             font-size: 14px;
             color: #aaa;
             margin-bottom: 0;
          }
          .cart-qty-controls {
             display: flex;
             align-items: center;
             background: #000;
             border: 1px solid #333;
             border-radius: 8px;
             padding: 5px 10px;
             margin-top: 10px;
             width: fit-content;
          }
          .cart-qty-btn {
             background: transparent;
             border: none;
             color: #fff;
             cursor: pointer;
             font-size: 18px;
             padding: 0 10px;
          }
          .cart-item-actions {
             margin-left: auto;
             text-align: right;
          }
          .cart-item-price {
             font-size: 18px;
             font-weight: bold;
             color: #00d4ff;
             display: block;
             margin-bottom: 15px;
          }
          .cart-remove-btn {
             background: rgba(255, 51, 102, 0.1);
             border: 1px solid rgba(255, 51, 102, 0.3);
             color: #ff3366;
             border-radius: 8px;
             padding: 6px 15px;
             cursor: pointer;
             font-size: 13px;
             transition: 0.3s;
          }
          .cart-remove-btn:hover {
             background: #ff3366;
             color: white;
          }
          
          .cart-summary {
             background: #111;
             border: 1px solid #222;
             border-radius: 16px;
             padding: 30px;
             height: fit-content;
          }

          @media(max-width: 768px) {
             .cart-item-row {
                 flex-direction: column;
                 text-align: center;
             }
             .cart-item-actions {
                 margin: 10px auto 0;
                 text-align: center;
             }
             .cart-qty-controls {
                 justify-content: center;
                 margin: 10px auto;
             }
          }
          .summary-row {
             display: flex;
             justify-content: space-between;
             margin-bottom: 15px;
             font-size: 16px;
             color: #bbb;
          }
          .summary-total {
             display: flex;
             justify-content: space-between;
             margin-top: 20px;
             padding-top: 20px;
             border-top: 1px solid #333;
             font-size: 24px;
             font-weight: 700;
             color: #fff;
          }
          .checkout-btn {
             width: 100%;
             background: #00d4ff;
             color: #000;
             border: none;
             padding: 18px;
             border-radius: 12px;
             font-size: 16px;
             font-weight: bold;
             margin-top: 30px;
             cursor: pointer;
             transition: 0.3s;
          }
          .checkout-btn:hover {
             transform: translateY(-3px);
             box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
          }
          
          .empty-cart {
             text-align: center;
             padding: 80px 20px;
          }
          .empty-icon {
             font-size: 60px;
             color: #333;
             margin-bottom: 20px;
          }
      `}</style>

      <h1 className="cart-title">Your Shopping Bag</h1>

      {cart.length === 0 ? (
          <div className="empty-cart">
              <i className="bi bi-bag-x empty-icon"></i>
              <h3>Your cart is completely empty</h3>
              <p className="text-muted mb-4">You have not added any premium items securely to your checkout buffer.</p>
              <Link to="/" className="checkout-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '15px 40px' }}>
                  Explore Products
              </Link>
          </div>
      ) : (
          <div className="cart-grid">
              <div className="cart-items">
                  {cart.map((item, idx) => (
                      <div className="cart-item-row" key={idx}>
                          <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} className="cart-item-img" />
                          <div className="cart-item-details">
                              <h4>{item.name}</h4>
                              <p>Color: {item.selectedColor || "Standard"}</p>
                              {item.selectedSize && <p style={{marginTop: '2px'}}>Size: {item.selectedSize}</p>}
                              <div className="cart-qty-controls">
                                  <button onClick={() => updateQuantity(idx, false)} className="cart-qty-btn">-</button>
                                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                  <button onClick={() => updateQuantity(idx, true)} className="cart-qty-btn">+</button>
                              </div>
                          </div>
                          <div className="cart-item-actions">
                              <span className="cart-item-price">₹ {(String(item.price).replace(/[^0-9.]/g, '') * item.quantity).toLocaleString()}</span>
                              <button onClick={() => removeItem(idx)} className="cart-remove-btn">
                                  Remove
                              </button>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="cart-summary">
                  <h3 className="mb-4">Order Summary</h3>
                  <div className="summary-row">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹ {total.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                      <span>Shipping Estimate</span>
                      <span style={{ color: '#00d4ff' }}>Free</span>
                  </div>
                  <div className="summary-row">
                      <span>Authenticity Tax</span>
                      <span>Included</span>
                  </div>
                  
                  <div className="summary-total">
                      <span>Total</span>
                      <span>₹ {total.toLocaleString()}</span>
                  </div>

                  <Link to="/checkout" style={{ textDecoration: 'none' }}>
                      <button className="checkout-btn" style={{ width: '100%' }}>
                          Secure Checkout
                      </button>
                  </Link>
                  <p className="text-center mt-3 text-muted" style={{ fontSize: '12px' }}>
                      <i className="bi bi-shield-lock-fill me-1"></i> Data encrypted & authenticated securely via MongoDB
                  </p>
              </div>
          </div>
      )}
    </div>
  )
}

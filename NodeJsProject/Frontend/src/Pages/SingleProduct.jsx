import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import Api from "../../Api";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartAdding, setCartAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Obsidian Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const colors = [
      { name: "Obsidian Black", code: "#111" },
      { name: "Arctic White", code: "#f4f4f4" },
      { name: "Navy Blue", code: "#0B1D3A" },
      { name: "Gunmetal", code: "#4f4f4f" }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await Api.get(`/product/${id}`);
        setProduct(res.data);
        
        // Fetch suggested products (max 4 from same category, randomized)
        if (res.data && res.data.category) {
            const catRes = await Api.get(`/category/${res.data.category}`);
            const filtered = catRes.data.filter(item => item._id !== id);
            // Shuffle the array to get random suggestions
            const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
            setSuggested(shuffled);
        }
      } catch (err) {
        console.error("Error fetching product details", err);
      }
      setLoading(false);
    };
    fetchProduct();
    
    const storedStr = localStorage.getItem('user');
    if (storedStr) {
        setActiveUser(JSON.parse(storedStr));
    }
    
    // reset states when navigating
    setQuantity(1);
    setInWishlist(false);
    setActiveImageIndex(0);
    setSelectedSize("M");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
      if (activeUser && product) {
          Api.get(`/wishlist/${activeUser.email}`).then(res => {
              if (res.data.success && res.data.wishlist) {
                  const existing = res.data.wishlist.items.find(
                      item => item.product?._id === product._id && 
                              item.selectedSize === selectedSize && 
                              item.selectedColor === selectedColor
                  );
                  setInWishlist(!!existing);
              }
          }).catch(console.error);
      }
  }, [activeUser, product, selectedSize, selectedColor]);

  const galleryImages = product ? (
      Array.isArray(product.image) ? product.image : [product.image || "https://via.placeholder.com/600"]
  ) : [];

  const handleQtyChange = (type) => {
      if (type === "dec" && quantity > 1) setQuantity(q => q - 1);
      if (type === "inc" && quantity < 10) setQuantity(q => q + 1);
  };

  const toggleWishlist = async () => {
      if(!activeUser) {
          toast.error("Please log in to manage your Wishlist!");
          return;
      }

      const nextStatus = !inWishlist;
      setInWishlist(nextStatus);

      try {
          if (nextStatus) {
              await Api.post("/wishlist/add", {
                  userEmail: activeUser.email,
                  productId: product._id,
                  quantity,
                  selectedSize,
                  selectedColor
              });
              toast.success(`Added to Wishlist! (${selectedSize} • ${selectedColor} • Qty: ${quantity})`);
          } else {
              await Api.post("/wishlist/remove", {
                  userEmail: activeUser.email,
                  productId: product._id,
                  selectedSize,
                  selectedColor
              });
              toast.success("Removed from Wishlist!");
          }
          window.dispatchEvent(new Event('cartUpdated'));
      } catch (err) {
          console.error(err);
          toast.error("Error updating wishlist");
          setInWishlist(!nextStatus); // revert on error
      }
  };

  const handleAddToCart = async () => {
      if(!activeUser) {
          toast.error("Please log in to checkout!");
          return;
      }

      setCartAdding(true);
      try {
          await Api.post("/cart/add", {
              userEmail: activeUser.email,
              productId: product._id,
              quantity,
              selectedSize,
              selectedColor
          });
          
          window.dispatchEvent(new Event('cartUpdated'));
          toast.success("Item secured in your Cart!");
      } catch (err) {
          console.error(err);
          toast.error("Error adding to cart");
      }
      setCartAdding(false);
  }

  const handleBuyNow = async () => {
      if(!activeUser) {
          toast.error("Please log in to checkout!");
          navigate('/Users');
          return;
      }

      setCartAdding(true);
      try {
          await Api.post("/cart/add", {
              userEmail: activeUser.email,
              productId: product._id,
              quantity,
              selectedSize,
              selectedColor
          });
          
          window.dispatchEvent(new Event('cartUpdated'));
          navigate('/checkout');
      } catch (err) {
          console.error(err);
          toast.error("Error processing request");
          setCartAdding(false);
      }
  }

  if (loading) {
      return (
          <>
            <style>{`
              body {
                background-color: #0d0d0d !important;
                color: white;
                overflow-x: hidden;
              }
              .skeleton-container { max-width: 1300px; margin: 50px auto; padding: 0 20px; }
              .product-main-row { display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 80px; }
              @media (min-width: 992px) { .product-main-row { grid-template-columns: 1fr 1fr; gap: 60px; } }
              .pulse {
                  background: linear-gradient(90deg, #111 25%, #222 50%, #111 75%);
                  background-size: 200% 100%;
                  animation: skeletonLoading 1.5s infinite;
                  border-radius: 12px;
              }
              @keyframes skeletonLoading {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
              }
              .skeleton-img { width: 100%; height: 500px; }
              @media (min-width: 992px) { .skeleton-img { height: 700px; } }
              .skeleton-thumb { width: 80px; height: 80px; }
              .skeleton-line { border-radius: 6px; }
              .skeleton-box { border-radius: 12px; }
              .skeleton-btn-group { display: flex; gap: 15px; margin-top: 30px; }
              .skeleton-btn { height: 60px; flex: 1; border-radius: 12px; }
            `}</style>
            <div className="skeleton-container">
               <div className="product-main-row">
                   <div className="left-column">
                       <div className="skeleton-img pulse"></div>
                       <div className="thumbnails-row" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                           <div className="skeleton-thumb pulse"></div>
                           <div className="skeleton-thumb pulse"></div>
                           <div className="skeleton-thumb pulse"></div>
                       </div>
                   </div>
                   <div className="product-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                       <div className="skeleton-line pulse" style={{width: '30%', height: '20px', marginBottom: '20px'}}></div>
                       <div className="skeleton-line pulse" style={{width: '80%', height: '40px', marginBottom: '30px'}}></div>
                       <div className="skeleton-line pulse" style={{width: '40%', height: '30px', marginBottom: '40px'}}></div>
                       <div className="skeleton-box pulse" style={{width: '100%', height: '150px', marginBottom: '30px'}}></div>
                       <div className="skeleton-btn-group">
                           <div className="skeleton-btn pulse"></div>
                           <div className="skeleton-btn pulse"></div>
                       </div>
                   </div>
               </div>
            </div>
          </>
      );
  }

  if (!product) {
      return (
          <>
            <style>{`
              body {
                background-color: #0d0d0d !important;
                color: white;
                overflow-x: hidden;
              }
            `}</style>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-state">
                <h2>Product Not Found</h2>
                <Link to="/">Return to Home</Link>
            </motion.div>
          </>
      );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <style>{`
        body {
          background-color: #0d0d0d;
          color: white;
          overflow-x: hidden;
        }

        .single-product-container {
            max-width: 1300px;
            margin: 50px auto;
            padding: 0 20px;
        }

        .product-main-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 80px;
        }

        @media (min-width: 992px) {
            .product-main-row {
                grid-template-columns: 1fr 1fr;
                gap: 60px;
            }
        }

        /* 🔥 IMAGE SECTION */
        .image-gallery {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            background: #111;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.05);
        }

        .main-image {
            width: 100%;
            height: 500px;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        @media (min-width: 992px) {
            .main-image {
                height: 700px;
            }
        }

        .image-gallery:hover .main-image {
            transform: scale(1.05);
        }

        .thumbnails-row {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }

        .thumbnail-img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 12px;
            cursor: pointer;
            border: 2px solid transparent;
            opacity: 0.6;
            transition: 0.3s;
            background: #111;
        }

        .thumbnail-img:hover {
            opacity: 1;
        }

        .thumbnail-img.active {
            opacity: 1;
            border-color: #00d4ff;
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
        }

        .wishlist-btn-absolute {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.3s;
            z-index: 10;
        }

        .wishlist-btn-absolute:hover {
            background: rgba(0, 212, 255, 0.2);
            transform: scale(1.1);
        }

        .wishlist-icon {
            font-size: 20px;
            color: #fff;
            transition: 0.3s;
        }

        .wishlist-icon.active {
            color: #ff3366;
            animation: popHeart 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popHeart {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); }
            100% { transform: scale(1); }
        }

        /* 🔥 DETAILS SECTION */
        .product-details {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .category-badge {
            color: #00d4ff;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .product-title {
            font-size: 38px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 20px;
        }

        .product-price {
            font-size: 28px;
            font-weight: 600;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 30px;
        }

        .product-price .tax-info {
            font-size: 14px;
            color: #777;
            font-weight: 400;
        }

        .divider {
            height: 1px;
            background: rgba(255,255,255,0.1);
            margin: 30px 0;
            width: 100%;
        }

        /* 🔥 COLORS */
        .colors-container {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
        }

        .color-circle {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #333;
            transition: 0.3s;
            position: relative;
        }

        .color-circle.active {
            border-color: #00d4ff;
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
        }

        /* 🔥 SIZE SELECTOR */
        .sizes-container {
            display: flex;
            gap: 12px;
            margin-bottom: 25px;
        }

        .size-box {
            width: 45px;
            height: 45px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #111;
            border: 1px solid #333;
            cursor: pointer;
            transition: 0.3s;
            font-weight: 600;
            color: #ccc;
        }

        .size-box:hover {
            border-color: #555;
            color: #fff;
        }

        .size-box.active {
            border-color: #ff3366;
            color: #ff3366;
            background: rgba(255, 51, 102, 0.1);
            box-shadow: 0 0 15px rgba(255, 51, 102, 0.2);
        }

        /* 🔥 QUANTITY SELECTOR */
        .action-label {
            font-size: 14px;
            color: #aaa;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .qty-selector {
            display: flex;
            align-items: center;
            background: #111;
            border: 1px solid #333;
            border-radius: 12px;
            width: fit-content;
            overflow: hidden;
            margin-bottom: 40px;
        }

        .qty-btn {
            background: transparent;
            border: none;
            color: #fff;
            font-size: 20px;
            padding: 10px 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .qty-btn:hover {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
        }

        .qty-value {
            font-size: 18px;
            font-weight: 600;
            width: 40px;
            text-align: center;
            color: #fff;
        }

        /* 🔥 ACTION BUTTONS */
        .btn-group-custom {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        @media (min-width: 576px) {
            .btn-group-custom {
                flex-direction: row;
            }
        }

        .add-cart-btn, .buy-now-btn {
            flex: 1;
            padding: 18px 20px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            border: none;
        }

        .add-cart-btn {
            background: #111;
            color: #fff;
            border: 1px solid #333;
        }

        .add-cart-btn:hover {
            background: #1a1a1a;
            border-color: #00d4ff;
            color: #00d4ff;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
        }

        .buy-now-btn {
            background: #00d4ff;
            color: #000;
        }

        .buy-now-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        }

        /* Button Loading Animation */
        .btn-text {
            transition: 0.3s;
        }

        .adding .btn-text {
            opacity: 0;
        }

        .adding::after {
            content: "ADDING...";
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 1s infinite alternate;
        }

        /* 🔥 SUGGESTED PRODUCTS */
        .suggested-section {
            margin-top: 80px;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 60px;
        }

        .suggested-title {
            text-align: center;
            font-size: 28px;
            margin-bottom: 40px;
            font-weight: 600;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 30px;
          }
        }

        .product-card {
          background: #111;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s;
          display: block;
          text-decoration: none;
          color: white;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 15px rgba(0,212,255,0.25);
          color: white;
        }

        .s-product-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .product-info {
          padding: 15px;
        }
        
        .product-info h3 {
           font-size: 16px;
           margin-bottom: 8px;
        }

        .product-divider {
          margin: 10px 0;
          height: 2px;
          border: none;
          background: linear-gradient(90deg, transparent, #00d4ff, transparent);
          background-size: 200% 100%;
          animation: moveLine 2s linear infinite;
        }

        .s-product-price {
          color: #00d4ff;
          font-weight: 600;
          font-size: 15px;
        }

        /* Utilities */
        .loading-state, .error-state {
            height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #00d4ff;
            font-size: 20px;
        }
        .error-state { color: #ff3366; }
        .error-state a { color: #fff; margin-top: 20px; }
      `}</style>

      <div className="single-product-container">
          <div className="product-main-row">
              {/* Left: Image */}
              <div className="left-column">
                  <div className="image-gallery">
                      <div className="wishlist-btn-absolute" onClick={toggleWishlist}>
                          {inWishlist ? (
                              <i className="bi bi-heart-fill wishlist-icon active"></i>
                          ) : (
                              <i className="bi bi-heart wishlist-icon"></i>
                          )}
                      </div>
                      <AnimatePresence mode="wait">
                          <motion.img 
                              key={activeImageIndex}
                              src={galleryImages[activeImageIndex]} 
                              alt={product.name} 
                              className="main-image"
                              initial={{ opacity: 0, filter: "blur(5px)", scale: 0.98 }}
                              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                              exit={{ opacity: 0, filter: "blur(5px)", scale: 1.02 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                      </AnimatePresence>
                  </div>
                  <div className="thumbnails-row">
                      {galleryImages.map((img, idx) => (
                          <img 
                              key={idx} 
                              src={img} 
                              alt="thumbnail" 
                              className={`thumbnail-img ${activeImageIndex === idx ? 'active' : ''}`}
                              onClick={() => setActiveImageIndex(idx)}
                          />
                      ))}
                  </div>
              </div>

              {/* Right: Details */}
              <div className="product-details">
                  <div className="category-badge">{product.category} {product.subcategory && `• ${product.subcategory}`}</div>
                  <h1 className="product-title">{product.name}</h1>
                  
                  <div className="product-price">
                      ₹ {product.price}
                      <span className="tax-info">(Incl. of all taxes)</span>
                  </div>

                  {product.description && (
                      <div className="product-description" style={{ color: "#aaa", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
                          {product.description}
                      </div>
                  )}

                  <div className="divider"></div>

                  <div className="action-label" style={{ marginBottom: "5px" }}>Color : <span style={{color: "#fff"}}>{selectedColor}</span></div>
                  <div className="colors-container">
                      {colors.map((c, i) => (
                          <div 
                              key={i} 
                              className={`color-circle ${selectedColor === c.name ? 'active' : ''}`}
                              style={{ background: c.code }}
                              onClick={() => setSelectedColor(c.name)}
                              title={c.name}
                          ></div>
                      ))}
                  </div>

                  <div className="action-label" style={{ marginBottom: "5px" }}>Size : <span style={{color: "#fff"}}>{selectedSize}</span></div>
                  <div className="sizes-container">
                      {['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                          <div 
                             key={sz}
                             className={`size-box ${selectedSize === sz ? 'active' : ''}`}
                             onClick={() => setSelectedSize(sz)}
                          >
                             {sz}
                          </div>
                      ))}
                  </div>

                  <div className="action-label">Quantity</div>
                  <div className="qty-selector">
                      <button className="qty-btn" onClick={() => handleQtyChange("dec")}>-</button>
                      <span className="qty-value">{quantity}</span>
                      <button className="qty-btn" onClick={() => handleQtyChange("inc")}>+</button>
                  </div>

                  <div className="btn-group-custom">
                      <button 
                         className={`add-cart-btn ${cartAdding ? "adding" : ""}`} 
                         onClick={handleAddToCart}
                         disabled={cartAdding}
                      >
                          <span className="btn-text">Add to Cart</span>
                      </button>
                      <button 
                         className={`buy-now-btn ${cartAdding ? "adding" : ""}`}
                         onClick={handleBuyNow}
                         disabled={cartAdding}
                      >
                          <span className="btn-text">Buy it Now</span>
                      </button>
                  </div>
              </div>
          </div>

          {/* Suggested Products */}
          {suggested.length > 0 && (
              <div className="suggested-section">
                  <h3 className="suggested-title">You May Also Like</h3>
                  <div className="products-grid">
                      {suggested.map((item, i) => (
                          <Link to={`/product/${item._id}`} className="product-card" key={i}>
                              <img src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/320")} className="s-product-image" alt={item.name} />
                              <div className="product-info">
                                  <h3>{item.name}</h3>
                                  <hr className="product-divider" />
                                  <p className="s-product-price">₹ {item.price}</p>
                              </div>
                          </Link>
                      ))}
                  </div>
              </div>
          )}
      </div>
    </motion.div>
  );
}

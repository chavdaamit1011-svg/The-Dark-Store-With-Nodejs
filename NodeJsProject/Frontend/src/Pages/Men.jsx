import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import Api from "../../Api";

export default function Men() {
  const sliderRef = useRef();
  const [product, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [availability, setAvailability] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await Api.get("/category/Men");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMenProducts();
  }, []);

  const fetchSubCategory = async (sub) => {
    try {
      const res = await Api.post(`/subcategory/${sub}`, {
        category: "Men"
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let index = 0;
    const totalSlides = 4;

    const interval = setInterval(() => {
      index = (index + 1) % totalSlides;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSortedProducts = () => {
    let filtered = [...product];

    if (availability === "in-stock") {
        filtered = filtered.filter(item => item.available !== false && item.stock !== 0);
    } else if (availability === "out-of-stock") {
        filtered = filtered.filter(item => item.available === false || item.stock === 0);
    }

    if (sortOrder === "low-high") {
        return filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
        return filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  };
  const sortedProducts = getSortedProducts();

  return (
    <>
      <style>{`
        body {
          background: #0d0d0d;
          color: white;
          overflow-x: hidden;
        }

        /* 🔥 SLIDER */
        .custom-slider-wrapper {
          overflow: hidden;
        }

        .custom-slider {
          display: flex;
          transition: transform 0.7s ease-in-out;
        }

        .slide {
          min-width: 100%;
        }

        .slide img {
          width: 100%;
          height: 520px;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .slide img {
            height: 200px;
            object-fit: cover;
          }
        }

        /* 🔥 FILTER SECTION (CLEAN + GLOW) */
        .collection-filters {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 30px 0;
          flex-wrap: wrap;
          padding: 15px 20px;
          

          background: rgba(255,255,255,0.02);
          box-shadow: 
            0 0 20px rgba(0,212,255,0.15),
            inset 0 0 10px rgba(0,212,255,0.05);
        }

        .filter-btn {
          padding: 10px 20px;
          border-radius: 25px;
          border: 1px solid #222;
          background: #111;
          color: #ccc;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .filter-btn:hover {
          color: #00d4ff;
          border-color: #00d4ff;
        }

        .filter-btn.active {
          background: #00d4ff;
          color: black;
          border-color: #00d4ff;
        }

        .count-text {
            color: #00d4ff;
            font-weight: bold;
            margin-left: 20px;
        }

        .offcanvas-btn {
            background: #111;
            color: #fff;
            border: 1px solid #333;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .offcanvas-btn:hover {
            border-color: #00d4ff;
            color: #00d4ff;
        }

        .offcanvas.bg-dark {
            background-color: #111 !important;
            border-right: 1px solid #333;
        }

        .offcanvas-filter-btn {
            width: 100%;
            text-align: left;
            padding: 12px 20px;
            border: 1px solid transparent;
            background: rgba(255,255,255,0.05);
            color: #ccc;
            border-radius: 12px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: 0.3s;
            display: block;
        }
        
        .offcanvas-filter-btn:hover {
            color: #00d4ff;
            background: rgba(0, 212, 255, 0.1);
        }

        .offcanvas-filter-btn.active {
            background: rgba(0, 212, 255, 0.15);
            color: #00d4ff;
            border-color: #00d4ff;
        }

        .filter-section-title {
            color: #aaa;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            margin-top: 10px;
        }

        @media (max-width: 768px) {
          .collection-filters {
            padding: 10px;
            gap: 10px;
          }
          .filter-btn {
            padding: 8px 14px;
            font-size: 13px;
          }
          .desktop-category-filters {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .desktop-category-filters { display: flex !important; }
          .mobile-only-section { display: none !important; }
        }

        /* 🔥 PRODUCTS */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          padding: 20px 15px;
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 30px;
            padding: 40px 60px;
          }
        }

        .product-card {
          background: #111;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 15px rgba(0,212,255,0.2);
        }

        .product-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .product-image {
            height: 180px;
          }
        }

        .product-info {
          padding: 10px;
        }

        .product-title {
          font-size: 14px;
        }

        /* 🔥 ANIMATED LINE */
        .product-divider {
          margin: 8px 0;
          height: 2px;
          border: none;
          background: linear-gradient(90deg, transparent, #00d4ff, transparent);
          background-size: 200% 100%;
          animation: moveLine 2s linear infinite;
        }

        @keyframes moveLine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .product-price {
          color: #00d4ff;
          font-size: 15px;
          font-weight: 600;
        }
      
      .page-wrapper {
  padding: 0 16px;
  margin-top: 50px;
    margin-bottom: 50px;
}

/* 🔥 TABLET */
@media (min-width: 768px) {
  .page-wrapper {
    padding: 0 40px;
  }
}

/* 🔥 DESKTOP (main fix 👇) */
@media (min-width: 1200px) {
  .page-wrapper {
    padding: 0 120px;  /* 👉 isko 100-160 adjust kar sakta hai */
  }
}

/* 🔥 BIG SCREENS */
@media (min-width: 1440px) {
  .page-wrapper {
    padding: 0 160px;
  }
}


/* 🔥 COLLECTION SECTION */
.collection-section {
  margin-top: 50px;
  margin-bottom:50px
}

.collection-container {
  padding: 0 16px;
}

@media (min-width: 768px) {
  .collection-container {
    padding: 0 40px;
  }
}

@media (min-width: 1200px) {
  .collection-container {
    padding: 0 120px;
  }
}

.collection-header {
  text-align: center;
  margin-bottom: 40px;
}

.collection-header h2 {
  font-size: 32px;
}

.collection-header p {
  color: #aaa;
}

/* GRID */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .collection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .collection-grid {
    grid-template-columns: 1fr;
  }
}

/* CARD */
.collection-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  display: block;
}

.collection-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: 0.5s;
}

.collection-item:hover .collection-image {
  transform: scale(1.1);
}

.collection-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.collection-category {
  font-size: 12px;
  color: #00d4ff;
}

.collection-name {
  font-size: 18px;
  font-weight: 600;
}


      `}</style>

      {/* ✅ SLIDER */}
      <div className="custom-slider-wrapper">
        <div className="custom-slider" ref={sliderRef}>
          <div className="slide">
            <Link to="/collections/cool-quirky">
              <img src="https://cdn.shopify.com/s/files/1/0943/5221/2257/files/banner_shirt_1_1.png?v=1769112144" />
            </Link>
          </div>

          <div className="slide">
            <Link to="/collections/men-hoodies">
              <img src="https://cdn.shopify.com/s/files/1/0943/5221/2257/files/shirt_banner_1_1.png?v=1769112143" />
            </Link>
          </div>

          <div className="slide">
            <Link to="/collections/mini-tees">
              <img src="https://cdn.shopify.com/s/files/1/0943/5221/2257/files/hoodie_banner_1_1.png?v=1769112143" />
            </Link>
          </div>

          <div className="slide">
            <Link to="/collections/mini-hoodies">
              <img src="https://cdn.shopify.com/s/files/1/0943/5221/2257/files/car_1_1.png?v=1769112143" />
            </Link>
          </div>
        </div>
      </div>




      {/* 🔥 CATEGORY & PRICE FILTERS */}
      <div className="collection-filters" style={{ alignItems: 'center' }}>
        <div className="desktop-category-filters" style={{ gap: '10px', flexWrap: 'wrap' }}>
          {["all", "Men T-shirt", "Men Hoodies", "Men Shirts", "Men Sweatshirts"].map((item, i) => (
            <button
              key={i}
              className={`filter-btn ${activeCategory === item ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(item);
                fetchSubCategory(item);
              }}
            >
              {item === "all" ? "All Products" : item}
            </button>
          ))}
        </div>

        <button className="offcanvas-btn" onClick={() => setShowFilter(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
            Filters
        </button>
        <div className="count-text" style={{ margin: 0 }}>Products: {product.length}</div>
      </div>

      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="start" className="bg-dark text-white">
        <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

            {/* Category for mobile */}
            <div className="mobile-only-section">
                <div className="filter-section-title">Category</div>
                {["all", "Men T-shirt", "Men Hoodies", "Men Shirts", "Men Sweatshirts"].map((item, i) => (
                    <button
                        key={i}
                        className={`offcanvas-filter-btn ${activeCategory === item ? "active" : ""}`}
                        onClick={() => { setActiveCategory(item); fetchSubCategory(item); setShowFilter(false); }}
                    >
                        {item === "all" ? "All Products" : item}
                    </button>
                ))}
            </div>

            <div className="filter-section-title" style={{ marginTop: '10px' }}>Availability</div>
            <button 
                className={`offcanvas-filter-btn ${availability === "all" ? "active" : ""}`}
                onClick={() => { setAvailability("all"); setShowFilter(false); }}
            >
                All
            </button>
            <button 
                className={`offcanvas-filter-btn ${availability === "in-stock" ? "active" : ""}`}
                onClick={() => { setAvailability("in-stock"); setShowFilter(false); }}
            >
                In Stock
            </button>
            <button 
                className={`offcanvas-filter-btn ${availability === "out-of-stock" ? "active" : ""}`}
                onClick={() => { setAvailability("out-of-stock"); setShowFilter(false); }}
            >
                Out of Stock
            </button>

            <div className="filter-section-title" style={{ marginTop: '25px' }}>Sort By Price</div>
            <button 
                className={`offcanvas-filter-btn ${sortOrder === "" ? "active" : ""}`}
                onClick={() => { setSortOrder(""); setShowFilter(false); }}
            >
                Default
            </button>
            <button 
                className={`offcanvas-filter-btn ${sortOrder === "low-high" ? "active" : ""}`}
                onClick={() => { setSortOrder("low-high"); setShowFilter(false); }}
            >
                Price: Low to High
            </button>
            <button 
                className={`offcanvas-filter-btn ${sortOrder === "high-low" ? "active" : ""}`}
                onClick={() => { setSortOrder("high-low"); setShowFilter(false); }}
            >
                Price: High to Low
            </button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* 🔥 PRODUCTS */}
      {product.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="products-grid page-wrapper">
          {sortedProducts.map((item, i) => (
            <Link to={`/product/${item._id}`} className="product-card" key={i} style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
              <img src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/320")} className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{item.name}</h3>
                <hr className="product-divider" />
                <p className="product-price">₹ {item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
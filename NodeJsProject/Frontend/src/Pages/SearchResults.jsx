import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../Api";

export default function SearchResults() {
  const { query } = useParams();
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Fetch all products to filter client-side
        const res = await Api.get("/category/all");
        const lowerQuery = query.toLowerCase();
        
        // Filter everything (name, category, subcategory) case-insensitively
        const filtered = res.data.filter((item) => 
            (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
            (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
            (item.subcategory && item.subcategory.toLowerCase().includes(lowerQuery))
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <>
      <style>{`
        body {
          background: #0d0d0d;
          color: white;
        }
        
        .page-wrapper {
          padding: 0 16px;
          margin-top: 50px;
          margin-bottom: 50px;
        }

        @media (min-width: 768px) {
          .page-wrapper {
            padding: 0 40px;
          }
        }

        @media (min-width: 1200px) {
          .page-wrapper {
            padding: 0 120px;
          }
        }

        .search-header {
            text-align: center;
            margin-bottom: 40px;
            color: #ccc;
        }
        
        .search-header h2 {
            font-size: 32px;
            color: #fff;
            margin-bottom: 15px;
        }

        .search-header span {
            color: #00d4ff;
        }

        /* 🔥 PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          padding: 20px 0;
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

        .product-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .product-image {
            height: 180px;
          }
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

        @keyframes moveLine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .product-price {
          color: #00d4ff;
          font-weight: 600;
          font-size: 15px;
        }

        .no-results {
            text-align: center;
            font-size: 18px;
            color: #aaa;
            margin-top: 50px;
        }

        .loading-text {
            text-align: center;
            font-size: 20px;
            color: #00d4ff;
            margin-top: 50px;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="search-header">
            <h2>Search Results</h2>
            <p>Showing results for: <span>"{query}"</span></p>
        </div>

        {loading ? (
            <div className="loading-text">Searching...</div>
        ) : product.length === 0 ? (
            <div className="no-results">
                No products found matching "{query}".
                <div style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none', borderBottom: '1px solid #00d4ff' }}>Return Home</Link>
                </div>
            </div>
        ) : (
            <div className="products-grid">
                {product.map((item, i) => (
                    <Link to={`/product/${item._id}`} className="product-card" key={i}>
                        <img src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/320")} className="product-image" alt={item.name} />
                        <div className="product-info">
                            <h3>{item.name}</h3>
                            <hr className="product-divider" />
                            <p className="product-price">₹ {item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </>
  );
}

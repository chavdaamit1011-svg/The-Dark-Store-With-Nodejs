import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Api from '../../Api';

export default function Whislist() {
  const [wishlist, setWishlist] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  const fetchWishlist = async (user) => {
    try {
      const res = await Api.get(`/wishlist/${user.email}`);
      if (res.data.success) {
        const mapped = res.data.wishlist.items.map(item => ({
          ...(item.product || {}),
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        })).filter(i => i._id);
        setWishlist(mapped);
      }
    } catch (err) {
      console.error("Error fetching wishlist", err);
    }
  };

  useEffect(() => {
    const storedStr = localStorage.getItem('user');
    if (!storedStr) return;
    const user = JSON.parse(storedStr);
    setActiveUser(user);
    fetchWishlist(user);
  }, []);

  /* ── Move to cart preserving saved size & color ── */
  const moveToCart = async (item, idx) => {
    if (!activeUser) {
      toast.error('Session expired. Please log in to purchase items!');
      return;
    }

    const size  = item.selectedSize  || 'M';
    const color = item.selectedColor || 'Standard';
    const qty   = item.quantity || 1;

    try {
      // Add to cart
      await Api.post("/cart/add", {
        userEmail: activeUser.email,
        productId: item._id,
        quantity: qty,
        selectedSize: size,
        selectedColor: color
      });

      // Remove from wishlist
      await Api.post("/wishlist/remove", {
        userEmail: activeUser.email,
        productId: item._id,
        selectedSize: size,
        selectedColor: color
      });

      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Moved to Cart!');
      fetchWishlist(activeUser);
    } catch (err) {
      console.error(err);
      toast.error("Error moving to cart");
    }
  };

  const removeItem = async (idx) => {
    if (!activeUser) return;
    const item = wishlist[idx];

    try {
      await Api.post("/wishlist/remove", {
        userEmail: activeUser.email,
        productId: item._id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      });

      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Removed from Wishlist!');
      fetchWishlist(activeUser);
    } catch (err) {
      console.error(err);
      toast.error("Error removing item");
    }
  };

  return (
    <div className="wl-page">
      <style>{`
        body { background: #050505; color: #fff; }

        /* ── PAGE WRAPPER ── */
        .wl-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 16px 80px;
        }

        /* ── HEADER ── */
        .wl-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .wl-title {
          font-size: 28px;
          font-weight: 700;
          color: #ff3366;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }
        .wl-count-badge {
          background: rgba(255,51,102,0.12);
          border: 1px solid rgba(255,51,102,0.25);
          color: #ff3366;
          font-size: 13px;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 20px;
        }

        /* ── EMPTY STATE ── */
        .empty-wl {
          text-align: center;
          padding: 80px 20px;
          background: #111;
          border: 1px solid #222;
          border-radius: 20px;
        }
        .empty-icon { font-size: 60px; color: #333; margin-bottom: 20px; }
        .explore-btn {
          background: #ff3366; color: #fff; border: none;
          padding: 14px 40px; border-radius: 12px;
          font-size: 15px; font-weight: 700;
          text-decoration: none; display: inline-block; transition: 0.3s;
        }
        .explore-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255,51,102,0.2);
          color: #fff;
        }

        /* ── GRID ── */
        .wl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 576px) {
          .wl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 992px) {
          .wl-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
        @media (min-width: 1200px) {
          .wl-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── CARD ── */
        .wl-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }
        .wl-card:hover {
          border-color: #ff3366;
          box-shadow: 0 8px 28px rgba(255,51,102,0.12);
        }

        /* ── IMAGE ── */
        .wl-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #0d0d0d;
        }
        .wl-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .wl-card:hover .wl-img { transform: scale(1.04); }

        /* Remove button */
        .wl-remove {
          position: absolute; top: 12px; right: 12px;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,51,102,0.2);
          color: #ff3366;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px;
          transition: background 0.25s, transform 0.25s;
        }
        .wl-remove:hover {
          background: #ff3366; color: #fff; transform: scale(1.1);
        }

        /* ── BODY ── */
        .wl-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }

        .wl-name {
          font-size: 15px; font-weight: 600;
          color: #fff; text-decoration: none;
          display: block; margin-bottom: 4px;
          line-height: 1.35;
        }
        .wl-name:hover { color: #ff3366; }

        .wl-price {
          color: #ff3366; font-weight: 700;
          font-size: 16px; margin-bottom: 12px;
        }

        /* Size + Color chips */
        .wl-chips {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .wl-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600;
          padding: 4px 11px; border-radius: 20px;
        }
        .chip-size {
          background: rgba(255,51,102,0.1);
          color: #ff3366;
          border: 1px solid rgba(255,51,102,0.25);
        }
        .chip-color {
          background: rgba(0,212,255,0.08);
          color: #00d4ff;
          border: 1px solid rgba(0,212,255,0.2);
        }

        /* No selection fallback chip */
        .chip-none {
          background: rgba(255,255,255,0.05);
          color: #666;
          border: 1px solid rgba(255,255,255,0.08);
          font-style: italic;
        }

        /* ── ACTIONS ── */
        .wl-actions { display: flex; gap: 10px; margin-top: auto; }
        .wl-move-btn {
          flex: 1;
          background: transparent;
          border: 1px solid #333; color: #fff;
          border-radius: 8px; padding: 11px 8px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; transition: 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .wl-move-btn:hover {
          background: #00d4ff; border-color: #00d4ff; color: #000;
        }
        .wl-view-btn {
          background: transparent;
          border: 1px solid #333; color: #aaa;
          border-radius: 8px; padding: 11px 12px;
          font-size: 16px; cursor: pointer; transition: 0.25s;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
        }
        .wl-view-btn:hover { border-color: #555; color: #fff; }
      `}</style>

      {/* ── Header ── */}
      <div className="wl-header">
        <h1 className="wl-title">
          <i className="bi bi-heart-fill"></i> My Wishlist
        </h1>
        {wishlist.length > 0 && (
          <span className="wl-count-badge">{wishlist.length} item{wishlist.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* ── Empty state ── */}
      {wishlist.length === 0 ? (
        <div className="empty-wl">
          <div><i className="bi bi-hearts empty-icon"></i></div>
          <h3 className="mb-2">No items saved yet</h3>
          <p className="text-muted mb-4">
            Pick your size &amp; color on a product page, then tap ♡ to save it here.
          </p>
          <Link to="/men" className="explore-btn">Start Exploring</Link>
        </div>
      ) : (
        <div className="wl-grid">
          {wishlist.map((item, idx) => (
            <div className="wl-card" key={idx}>

              {/* Image + remove */}
              <div className="wl-img-wrap">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : (item.image || 'https://via.placeholder.com/320x420')}
                  alt={item.name}
                  className="wl-img"
                />
                <div className="wl-remove" onClick={() => removeItem(idx)} title="Remove">
                  <i className="bi bi-trash3-fill"></i>
                </div>
              </div>

              {/* Body */}
              <div className="wl-body">
                <Link to={`/product/${item._id}`} className="wl-name">{item.name}</Link>
                <div className="wl-price">₹ {item.price?.toLocaleString('en-IN')}</div>

                {/* ── Size & Color chips ── */}
                <div className="wl-chips">
                  {item.selectedSize ? (
                    <span className="wl-chip chip-size">
                      <i className="bi bi-rulers"></i> {item.selectedSize}
                    </span>
                  ) : (
                    <span className="wl-chip chip-none">No size saved</span>
                  )}

                  {item.selectedColor && item.selectedColor !== 'Standard' ? (
                    <span className="wl-chip chip-color">
                      <i className="bi bi-palette-fill"></i> {item.selectedColor}
                    </span>
                  ) : (
                    <span className="wl-chip chip-none">No color saved</span>
                  )}
                  
                  {item.quantity && item.quantity > 1 && (
                    <span className="wl-chip chip-none" style={{color: '#fff', borderColor: '#fff'}}>
                      Qty: {item.quantity}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="wl-actions">
                  <button className="wl-move-btn" onClick={() => moveToCart(item, idx)}>
                    <i className="bi bi-bag-plus-fill"></i> Move to Cart
                  </button>
                  <Link to={`/product/${item._id}`} className="wl-view-btn" title="View product">
                    <i className="bi bi-eye"></i>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

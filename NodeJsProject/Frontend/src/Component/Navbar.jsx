import React, { useState, useEffect } from "react";
import {
  Navbar, Container, Nav, Modal, Form, Dropdown,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Api from "../../Api";

export default function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wlCount, setWlCount] = useState(0);

  const refreshCounts = async (user) => {
    const u = user || activeUser;
    if (!u) return;
    try {
        const cartRes = await Api.get(`/cart/${u.email}`);
        if (cartRes.data.success && cartRes.data.cart) {
            const validCartItems = cartRes.data.cart.items.filter(item => item.product);
            setCartCount(validCartItems.length);
        }
        
        const wlRes = await Api.get(`/wishlist/${u.email}`);
        if (wlRes.data.success && wlRes.data.wishlist) {
            const validWlItems = wlRes.data.wishlist.items.filter(item => item.product);
            setWlCount(validWlItems.length);
        }
    } catch (err) {
        console.error("Error refreshing counts", err);
    }
  };

  const navigate  = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const parsedUser = stored ? JSON.parse(stored) : null;
    setActiveUser(parsedUser);
    if (parsedUser) refreshCounts(parsedUser);

    const onStorage = () => {
      const latest = localStorage.getItem("user");
      const u = latest ? JSON.parse(latest) : null;
      setActiveUser(u);
      if (u) refreshCounts(u);
    };
    window.addEventListener("storage", onStorage);
    
    const onCartUpdated = () => {
      const u = localStorage.getItem("user");
      if (u) refreshCounts(JSON.parse(u));
    };
    window.addEventListener("cartUpdated", onCartUpdated);

    Api.get("/category/all")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error("Search load failed", err));

    return () => { 
        window.removeEventListener("storage", onStorage); 
        window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] = i === 0 ? j : Math.min(
          arr[i-1][j]+1, arr[i][j-1]+1,
          arr[i-1][j-1] + (s[j-1] === t[i-1] ? 0 : 1)
        );
      }
    }
    return arr[t.length][s.length];
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
    if (!query.trim()) { setSearchResults([]); return; }
    const lq = query.toLowerCase();
    const matches = allProducts.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const cat  = (item.category || "").toLowerCase();
      const sub  = (item.subcategory || "").toLowerCase();
      if (name.includes(lq) || cat.includes(lq) || sub.includes(lq)) return true;
      return name.split(" ").some((w) => levenshteinDistance(w, lq) <= (w.length > 4 ? 2 : 1));
    });
    setSearchResults(matches.slice(0, 6));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    navigate(`/search/${searchText}`);
    setExpanded(false);
    setShowSearch(false);
    setSearchText("");
  };

  const close    = () => setExpanded(false);
  const doLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        /* ══ BASE ══ */
        .custom-navbar {
          background: #000 !important;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* ══ LOGO ══ */
        .nb-logo { height: 60px; object-fit: contain; display: block; }
        @media (max-width: 991.98px) { .nb-logo { height: 44px; } }

        /* ══ DESKTOP NAV LINKS ══ */
        .nb-link {
          color: #fff !important;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.4px;
          position: relative;
          padding: 4px 0 !important;
          text-decoration: none;
          transition: color 0.25s;
        }
        .nb-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 2px;
          background: #00d4ff;
          transition: width 0.3s;
        }
        .nb-link:hover, .nb-link.active { color: #00d4ff !important; }
        .nb-link:hover::after, .nb-link.active::after { width: 100%; }

        /* ══ ICON BUTTON (desktop + mobile) ══ */
        .nb-icon {
          color: #fff;
          font-size: 1.3rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          line-height: 1;
          transition: color 0.25s, transform 0.25s;
        }
        .nb-icon:hover { color: #00d4ff; transform: translateY(-2px); }

        /* ══ BADGE ══ */
        .nb-badge {
          position: absolute;
          top: -7px; right: -10px;
          background: #ff3366; color: #fff;
          font-size: 10px; font-weight: 800;
          min-width: 17px; height: 17px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px; pointer-events: none;
          animation: badgePop .3s cubic-bezier(.175,.885,.32,1.275) forwards;
        }
        @keyframes badgePop { from{transform:scale(0)} to{transform:scale(1)} }

        /* ══ DESKTOP GRID ══ */
        .nb-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
          padding: 5px 0;
        }

        /* ══ TOGGLER ══ */
        .navbar-toggler {
          border: 1px solid rgba(255,255,255,0.25) !important;
          border-radius: 8px !important;
          padding: 5px 10px !important;
          box-shadow: none !important;
        }
        .navbar-toggler:focus { box-shadow: none !important; }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255%2C255%2C255%2C0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }

        /* ══ MOBILE TOPBAR — only on <992 ══ */
        .nb-mobile-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 5px 0;
          position: relative;
        }
        @media (min-width: 992px) { .nb-mobile-bar { display: none !important; } }

        .nb-mobile-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }

        /* Right side: only 2 icons on mobile to avoid logo overlap */
        .nb-mobile-right {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-shrink: 0;
          z-index: 2;
        }

        /* ══ DESKTOP ONLY ══ */
        .nb-desktop-only { display: none; }
        @media (min-width: 992px) { .nb-desktop-only { display: flex !important; } }

        /* ══ COLLAPSED MENU STYLES ══ */
        .nb-collapse-nav {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 6px 0 14px;
          background: #080808;
          animation: slideDown .25s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Section header */
        .mob-section {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #444;
          padding: 12px 20px 5px;
        }

        /* Nav link row */
        .mob-link {
          display: flex !important;
          align-items: center;
          gap: 14px;
          color: #ddd !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          padding: 13px 20px !important;
          border-bottom: 1px solid rgba(255,255,255,0.04) !important;
          text-decoration: none !important;
          border-left: 3px solid transparent !important;
          transition: background .2s, color .2s !important;
        }
        .mob-link:hover {
          color: #00d4ff !important;
          background: rgba(0,212,255,0.05) !important;
        }
        .mob-link.active {
          color: #00d4ff !important;
          border-left: 3px solid #00d4ff !important;
          background: rgba(0,212,255,0.07) !important;
          padding-left: 17px !important;
        }

        /* Quick-action row (wishlist + cart with labels) in collapsed */
        .mob-action-row {
          display: flex;
          align-items: center;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .mob-action-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #ccc;
          text-decoration: none;
          font-size: 11px;
          padding: 13px 8px;
          transition: color .2s, background .2s;
          border-radius: 10px;
          cursor: pointer;
          background: none;
          border: none;
          position: relative;
        }
        .mob-action-btn i { font-size: 1.25rem; }
        .mob-action-btn:hover { color: #00d4ff; background: rgba(0,212,255,0.06); }

        /* Badge inside action row */
        .mob-action-badge {
          position: absolute;
          top: 8px; right: calc(50% - 20px);
          background: #ff3366; color: #fff;
          font-size: 9px; font-weight: 800;
          min-width: 16px; height: 16px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px; pointer-events: none;
        }

        /* User / logout in collapsed */
        .mob-user-box {
          margin: 10px 16px 0;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .mob-user-name {
          font-size: 12px; color: #555;
          margin-bottom: 8px; padding-left: 4px;
        }
        .mob-logout {
          width: 100%; padding: 10px 16px;
          background: rgba(255,51,102,0.08);
          border: 1px solid rgba(255,51,102,0.25);
          border-radius: 8px; color: #ff3366;
          font-weight: 600; font-size: 13px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background .2s;
        }
        .mob-logout:hover { background: rgba(255,51,102,0.15); }

        /* ══ DROPDOWN ══ */
        .dropdown-menu {
          animation: fdrop .3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          transform-origin: top right;
          border-radius: 12px; 
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,.9);
          background: rgba(17, 17, 17, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08) !important;
          padding: 8px 0;
          margin-top: 14px !important;
        }
        .dropdown-item { 
          transition: all 0.2s ease;
          padding: 10px 20px;
          font-size: 14px;
        }
        .dropdown-item:hover { 
          background: rgba(0,212,255,.1) !important; 
          color: #00d4ff !important; 
          transform: translateX(5px);
        }
        @keyframes fdrop {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ══ SEARCH MODAL ══ */
        .search-modal .modal-content {
          background: #111; border: 1px solid #333;
          border-radius: 20px; overflow: hidden;
        }
        .search-modal .modal-header { border-bottom: 1px solid #333; padding: 20px; }
        .search-modal .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        .search-modal .modal-body { padding: 0; }
        .search-input-wrapper { padding: 20px; border-bottom: 1px solid #222; }
        .live-search-input {
          width: 100%; background: transparent; border: none;
          color: #fff; font-size: 22px; outline: none;
        }
        .live-search-input::placeholder { color: #444; }
        .search-results-container { max-height: 400px; overflow-y: auto; padding: 10px 0; }
        .search-results-container::-webkit-scrollbar { width: 6px; }
        .search-results-container::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .search-suggestion-item {
          display: flex; align-items: center; gap: 14px;
          padding: 10px 20px; border-bottom: 1px solid #222;
          cursor: pointer; transition: .25s; text-decoration: none; color: #fff;
        }
        .search-suggestion-item:last-child { border-bottom: none; }
        .search-suggestion-item:hover { background: rgba(0,212,255,.05); color: #00d4ff; }
        .search-item-img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; }
        .search-item-info h4 { font-size: 14px; margin: 0 0 3px; font-weight: 600; }
        .search-item-info p  { font-size: 13px; color: #00d4ff; margin: 0; }
        .fuzzy-badge {
          font-size: 10px; padding: 2px 6px; border-radius: 10px;
          background: rgba(0,212,255,.1); color: #00d4ff;
          margin-left: 8px; vertical-align: middle;
        }
      `}</style>

      {/* ════════════ NAVBAR ════════════ */}
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        sticky="top"
        variant="dark"
        className="custom-navbar py-0"
      >
        <Container>

          {/* ── DESKTOP LAYOUT (≥992px): 3-column grid ── */}
          <div className="nb-grid d-none d-lg-grid">
            {/* Left nav links */}
            <Nav className="d-flex gap-4 align-items-center">
              <NavLink to="/"      end   className="nb-link">Home</NavLink>
              <NavLink to="/men"         className="nb-link">Men</NavLink>
              <NavLink to="/women"       className="nb-link">Women</NavLink>
            </Nav>

            {/* Center logo */}
            <Link to="/"><img
              src="https://www.thedarkstore.in/cdn/shop/files/kling_20250921_Image_to_Video_in_this_lo_1072_0.mp4.gif?v=1758399499&width=600"
              alt="The Dark Store" className="nb-logo"
            /></Link>

            {/* Right icons */}
            <div className="d-flex align-items-center justify-content-end gap-4">
              <button className="nb-icon" onClick={() => setShowSearch(true)}>
                <i className="bi bi-search"></i>
              </button>
              <Link to="/Whislist" className="nb-icon">
                <i className="bi bi-heart"></i>
                {wlCount > 0 && <span className="nb-badge">{wlCount}</span>}
              </Link>
              <Link to="/Cart" className="nb-icon">
                <i className="bi bi-bag"></i>
                {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
              </Link>
              {activeUser ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as="span" className="nb-icon" style={{ cursor: "pointer" }}>
                    <i className="bi bi-person-circle" style={{ color: "#00d4ff", filter: "drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))" }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Header style={{ color: "#fff", fontSize: "15px" }}>
                      <i className="bi bi-person-circle me-2"></i>Hello, {activeUser.name}
                    </Dropdown.Header>
                    <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <Dropdown.Item as={Link} to="/Users" className="d-flex align-items-center gap-2" style={{ color: "#ccc" }}>
                      <i className="bi bi-grid"></i> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders" className="d-flex align-items-center gap-2" style={{ color: "#ccc" }}>
                      <i className="bi bi-box-seam"></i> My Orders
                    </Dropdown.Item>
                    {activeUser.role === "Admin" && (
                      <Dropdown.Item as={Link} to="/admin" className="d-flex align-items-center gap-2" style={{ color: "#00d4ff", fontWeight: "bold" }}>
                        <i className="bi bi-rocket-takeoff-fill"></i> Admin Panel
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <Dropdown.Item onClick={doLogout} className="d-flex align-items-center gap-2" style={{ color: "#ff3366" }}>
                      <i className="bi bi-box-arrow-right"></i> Secure Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/Users" className="nb-icon">
                  <i className="bi bi-person"></i>
                </Link>
              )}
            </div>
          </div>

          {/* ── MOBILE TOPBAR (<992px): Hamburger | Logo | Search + Profile ── */}
          {/* Wishlist & Cart moved to collapsed menu to avoid logo overlap */}
          <div className="nb-mobile-bar d-lg-none">
            {/* Hamburger — Bootstrap's */}
            <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

            {/* Centered logo (absolute) */}
            <Link to="/" className="nb-mobile-logo" onClick={close}>
              <img
                src="https://www.thedarkstore.in/cdn/shop/files/kling_20250921_Image_to_Video_in_this_lo_1072_0.mp4.gif?v=1758399499&width=600"
                alt="The Dark Store" className="nb-logo"
              />
            </Link>

            {/* Right — ONLY Search + Profile (2 icons max to protect logo space) */}
            <div className="nb-mobile-right">
              <button className="nb-icon" onClick={() => setShowSearch(true)}>
                <i className="bi bi-search"></i>
              </button>

              {activeUser ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as="span" className="nb-icon" style={{ cursor: "pointer" }}>
                    <i className="bi bi-person-circle" style={{ color: "#00d4ff", filter: "drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))" }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Header style={{ color: "#fff", fontSize: "15px" }}>
                      <i className="bi bi-person-circle me-2"></i>Hello, {activeUser.name}
                    </Dropdown.Header>
                    <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <Dropdown.Item as={Link} to="/Users" onClick={close} className="d-flex align-items-center gap-2" style={{ color: "#ccc" }}>
                      <i className="bi bi-grid"></i> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders" onClick={close} className="d-flex align-items-center gap-2" style={{ color: "#ccc" }}>
                      <i className="bi bi-box-seam"></i> My Orders
                    </Dropdown.Item>
                    {activeUser.role === "Admin" && (
                      <Dropdown.Item as={Link} to="/admin" onClick={close} className="d-flex align-items-center gap-2" style={{ color: "#00d4ff", fontWeight: "bold" }}>
                        <i className="bi bi-rocket-takeoff-fill"></i> Admin Panel
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <Dropdown.Item onClick={doLogout} className="d-flex align-items-center gap-2" style={{ color: "#ff3366" }}>
                      <i className="bi bi-box-arrow-right"></i> Secure Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/Users" className="nb-icon" onClick={close}>
                  <i className="bi bi-person"></i>
                </Link>
              )}
            </div>
          </div>

          {/* ── COLLAPSED MENU: Nav links + Wishlist + Cart + Logout ── */}
          <Navbar.Collapse id="main-collapse">
            <div className="nb-collapse-nav d-lg-none w-100">

              {/* Nav links */}
              <div className="mob-section">Navigation</div>
              <NavLink to="/" end
                className={({ isActive }) => `mob-link${isActive ? " active" : ""}`}
                onClick={close}
              >
                <i className="bi bi-house-door" style={{ color: "#00d4ff" }}></i> Home
              </NavLink>
              <NavLink to="/men"
                className={({ isActive }) => `mob-link${isActive ? " active" : ""}`}
                onClick={close}
              >
                <i className="bi bi-person-standing" style={{ color: "#00d4ff" }}></i> Men
              </NavLink>
              <NavLink to="/women"
                className={({ isActive }) => `mob-link${isActive ? " active" : ""}`}
                onClick={close}
              >
                <i className="bi bi-person-standing-dress" style={{ color: "#00d4ff" }}></i> Women
              </NavLink>

              {/* Wishlist + Cart — icon+label tiles */}
              <div className="mob-section" style={{ marginTop: "4px" }}>Quick Access</div>
              <div className="mob-action-row">
                <Link to="/Whislist" className="mob-action-btn" onClick={close}>
                  {wlCount > 0 && <span className="mob-action-badge">{wlCount}</span>}
                  <i className="bi bi-heart"></i>
                  Wishlist
                </Link>
                <Link to="/Cart" className="mob-action-btn" onClick={close}>
                  {cartCount > 0 && <span className="mob-action-badge">{cartCount}</span>}
                  <i className="bi bi-bag"></i>
                  Cart
                </Link>
              </div>

              {/* User info + logout */}
              {activeUser && (
                <div className="mob-user-box">
                  <div className="mob-user-name">
                    Logged in as&nbsp;<strong style={{ color: "#00d4ff" }}>{activeUser.name}</strong>
                  </div>
                  <button className="mob-logout" onClick={doLogout}>
                    <i className="bi bi-box-arrow-right"></i> Secure Logout
                  </button>
                </div>
              )}
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* ════════════ SEARCH MODAL ════════════ */}
      <Modal
        show={showSearch}
        onHide={() => { setShowSearch(false); setSearchText(""); setSearchResults([]); }}
        size="lg" centered className="search-modal"
      >
        <Modal.Header closeButton>
          <h5 className="mb-0 text-white fw-semibold">Global Search</h5>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSearchSubmit} className="search-input-wrapper">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-search text-white fs-4"></i>
              <input
                type="text" className="live-search-input"
                placeholder="Type 'shrt' to search shirts..."
                value={searchText} onChange={handleSearchChange} autoFocus
              />
            </div>
          </Form>
          <div className="search-results-container">
            {searchText.trim().length > 0 && searchResults.length === 0 ? (
              <div className="text-center py-4 text-muted">
                No similar products found. Try adjusting your spelling!
              </div>
            ) : (
              searchResults.map((item, i) => (
                <div key={i} className="search-suggestion-item"
                  onClick={() => {
                    setShowSearch(false); setSearchText(""); setSearchResults([]);
                    navigate(`/search/${encodeURIComponent(item.name)}`);
                  }}
                >
                  <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="search-item-img" />
                  <div className="search-item-info">
                    <h4>
                      {item.name}
                      {!item.name.toLowerCase().includes(searchText.toLowerCase()) && searchText.length > 2 && (
                        <span className="fuzzy-badge">Did you mean this?</span>
                      )}
                    </h4>
                    <p>₹ {item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
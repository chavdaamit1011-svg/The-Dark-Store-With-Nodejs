import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Api from "../../Api";
import "./Home.css"
import "./Collection"

export default function Home() {
    const slides = [
        "https://cdn.shopify.com/s/files/1/0943/5221/2257/files/hoodie_mainpage.png?v=1769029445",
        "https://cdn.shopify.com/s/files/1/0943/5221/2257/files/women_hoodie_banner_1.png?v=1769028885",
        "https://cdn.shopify.com/s/files/1/0943/5221/2257/files/camera.png?v=1768924856",
        "https://cdn.shopify.com/s/files/1/0943/5221/2257/files/tshirt_banner.png?v=1769086387",
    ];
    const [product, setProducts] = useState([]);
    const [category, setCategory] = useState("all");

    const newInStore = product.slice(0, 6);
    const trendingItems = product.slice(6, 12);

    const duplicatedProducts = product.length > 0 ? [...newInStore, ...newInStore] : [];
    const duplicatedTrending = product.length > 0 ? [...trendingItems, ...trendingItems] : [];

    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);

    const trendingRef = useRef(null);
    const trendingAuto = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || duplicatedProducts.length === 0) return;

        const startAutoScroll = () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
            autoScrollRef.current = setInterval(() => {
                if (container) {
                    container.scrollLeft += 1;
                    // Reset to start when halfway point reached (since we duplicated items)
                    if (container.scrollLeft >= (container.scrollWidth / 2) - 1) {
                        container.scrollLeft = 0;
                    }
                }
            }, 20);
        };

        const stopAutoScroll = () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };

        startAutoScroll();
        container.addEventListener("mouseenter", stopAutoScroll);
        container.addEventListener("mouseleave", startAutoScroll);
        container.addEventListener("touchstart", stopAutoScroll, { passive: true });
        container.addEventListener("touchend", startAutoScroll);

        return () => {
            stopAutoScroll();
            container.removeEventListener("mouseenter", stopAutoScroll);
            container.removeEventListener("mouseleave", startAutoScroll);
            container.removeEventListener("touchstart", stopAutoScroll);
            container.removeEventListener("touchend", startAutoScroll);
        };
    }, [duplicatedProducts.length]);

    useEffect(() => {
        const container = trendingRef.current;
        if (!container || duplicatedTrending.length === 0) return;

        const start = () => {
            if (trendingAuto.current) clearInterval(trendingAuto.current);
            trendingAuto.current = setInterval(() => {
                if (container) {
                    container.scrollLeft += 1;
                    if (container.scrollLeft >= (container.scrollWidth / 2) - 1) {
                        container.scrollLeft = 0;
                    }
                }
            }, 20);
        };

        const stop = () => {
            if (trendingAuto.current) clearInterval(trendingAuto.current);
        };

        start();
        container.addEventListener("mouseenter", stop);
        container.addEventListener("mouseleave", start);
        container.addEventListener("touchstart", stop, { passive: true });
        container.addEventListener("touchend", start);

        return () => {
            stop();
            container.removeEventListener("mouseenter", stop);
            container.removeEventListener("mouseleave", start);
            container.removeEventListener("touchstart", stop);
            container.removeEventListener("touchend", start);
        };
    }, [duplicatedTrending.length]);

    const handleAddToCart = async (item) => {
        const storedStr = localStorage.getItem('user');
        if(!storedStr) {
            toast.error("Please log in to add items to your cart!");
            return;
        }
        const activeUser = JSON.parse(storedStr);

        try {
            await Api.post("/cart/add", {
                userEmail: activeUser.email,
                productId: item._id,
                quantity: 1,
                selectedSize: "M",
                selectedColor: "Standard"
            });
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${item.name} safely secured in your Cart!`);
        } catch (err) {
            console.error(err);
            toast.error("Error adding to cart");
        }
    };


    useEffect(() => {
        fetchCategory("all");
    }, []);

    const fetchCategory = async (cat) => {
        setCategory(cat)
        const res = await Api.get(`/category/${cat}`)
        setProducts(res.data)
    }

    const navigate = useNavigate()
    const handle = (name) => {
        navigate(`/collections?subcategory=${name}`)
    }


    return (
        <div className="home-page text-white">
            <style>{`
                .product-divider {
                    margin: 12px 0;
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

                .store-product-price, .trending-product-price {
                    color: #00d4ff;
                    font-weight: 700;
                    font-size: 1.1rem;
                    margin-top: 5px;
                }

                .store-product-title a, .trending-product-title a {
                    color: #fff;
                    text-decoration: none;
                    transition: 0.3s;
                }

                .store-product-title a:hover, .trending-product-title a:hover {
                    color: #00d4ff;
                }

                .store-slider-track, .trending-slider-track {
                    display: flex !important;
                    flex-wrap: nowrap !important;
                }
            `}</style>
            <section className="hero-slider">
                <img
                    src={slides[currentSlide]}
                    alt={`slide-${currentSlide}`}
                    className="slider-image"
                />
            </section>

            <div className="top-marquee">
                <Container fluid className="px-0">
                    <div className="marquee-track">
                        {[...Array(8)].map((_, index) => (
                            <span className="marquee-item" key={index}>
                                <span className="marquee-icon">⚡</span>
                                <span>Break the internet. Not the bank. 50% off</span>
                            </span>
                        ))}
                        {[...Array(8)].map((_, index) => (
                            <span className="marquee-item" key={`duplicate-${index}`}>
                                <span className="marquee-icon">⚡</span>
                                <span>Break the internet. Not the bank. 50% off</span>
                            </span>
                        ))}
                    </div>
                </Container>
            </div>

           <section className="category-section">
    <Container>
        <div className="text-center mb-5">
            <h1 className="section-title fs-1">EXPLORE BY CATEGORY</h1>
        </div>

        <Row className="g-4">
            {/* HOODIES */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("Hoodies")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/1_7b6e91f9-83ba-4575-90c6-6b983451ba1b.png?v=1767614701" className="category-image" alt="Hoodies" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">Hoodies</h3>
                    </div>
                </div>
            </Col>

            {/* SHIRTS */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("Shirts")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/Gemini_Generated_Image_c7fh92c7fh92c7fh_1.png?v=1769112980" className="category-image" alt="Shirts" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">Shirts</h3>
                    </div>
                </div>
            </Col>

            {/* SWEATSHIRTS */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("Sweatshirts")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/sweatshirt_corrected.png?v=1765017663" className="category-image" alt="Sweatshirts" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">Sweatshirts</h3>
                    </div>
                </div>
            </Col>

            {/* T-SHIRT */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("T-Shirt")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/tee_4211c2d9-de09-4df0-aaed-29abbff55962.png?v=1769148318" className="category-image" alt="T-Shirt" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">T-Shirt</h3>
                    </div>
                </div>
            </Col>

            {/* BABY TEES */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("Baby Tee")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/2_5ac4b738-043d-48d6-870c-7485803dd5d1.png?v=1763457351" className="category-image" alt="Baby Tees" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">Baby Tees</h3>
                    </div>
                </div>
            </Col>

            {/* MINI HOODIES */}
            <Col xl={2} lg={4} md={4} sm={6} xs={6}>
                <div className="category-card" onClick={() => handle("Mini Hoodies")} style={{ cursor: 'pointer' }}>
                    <div className="category-image-wrap">
                        <img src="https://www.thedarkstore.in/cdn/shop/collections/mini_hoodie.png?v=1767619610" className="category-image" alt="Mini Hoodies" />
                    </div>
                    <div className="text-center py-3 px-2">
                        <h3 className="category-title">Mini Hoodies</h3>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</section>


            <section className="new-store-section py-2">
                <Container fluid className="px-lg-4 px-3">
                    <div className="text-center mb-4 mb-md-5">
                        <h2 className="section-title fs-1">NEW IN STORE</h2>
                    </div>

                    <div className="store-slider-track" ref={scrollRef}>
                        {duplicatedProducts.map((item, index) => (
                            <div className="store-product-card" key={index}>
                                <Link to={`/product/${item._id}`} className="store-image-wrap">
                                    <img
                                        src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/320")}
                                        alt={item.name}
                                        className="store-product-img"
                                    />
                                    <div className="store-overlay">
                                        <Button
                                            className="store-cart-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(item);
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Link>

                                <div className="text-center pt-3">
                                    <h3 className="store-product-title fs-6 fw-semibold mb-2">
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </h3>
                                    <hr className="product-divider" />
                                    <p className="store-product-price">₹ {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="curated-section">
                <Container fluid className="curated-container">
                    <div className="text-center mb-5">
                        <h2 className="section-title curated-title-size">
                            CURATED COLLECTIONS
                        </h2>
                    </div>

                    <Row className="justify-content-center g-4">

                        <Col lg={4} md={6} sm={10} xs={12}>
                            <Link to="/men" className="curated-card" onClick={() => fetchCategory("men")}>
                                <div className="curated-image-wrap">
                                    <img src="https://www.thedarkstore.in/cdn/shop/files/trendy-relaxed-fit-t-shirt-mockup-ideal-for-casual-looks-and-simple-streetwear-style-02490.jpg?v=1763387753" className="curated-image" />
                                    <div className="curated-overlay">
                                        <div className="curated-text-box">
                                            <span className="curated-text">MEN</span>
                                            <span className="curated-arrow">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                        <Col lg={4} md={6} sm={10} xs={12}>
                            <Link to="/Women" className="curated-card">
                                <div className="curated-image-wrap">
                                    <img src="https://www.thedarkstore.in/cdn/shop/files/stylish-relaxed-fit-hoodie-mockup-for-womens-loungewear-and-casual-wardrobe-01169_6d67caca-c9c5-4a99-8176-de01c8254e14.jpg?v=1763387808" className="curated-image" />
                                    <div className="curated-overlay">
                                        <div className="curated-text-box">
                                            <span className="curated-text">WOMEN</span>
                                            <span className="curated-arrow">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </Container>
            </section>

            <section className="trending-section py-2">
                <Container fluid className="px-lg-4 px-3">
                    <div className="text-center mb-4 mb-md-5">
                        <h2 className="section-title fs-1">TRENDING NOW</h2>
                    </div>

                    <div className="trending-slider-track" ref={trendingRef}>
                        {duplicatedTrending.map((item, index) => (
                            <div className="trending-product-card" key={index}>
                                <Link to={`/product/${item._id}`} className="trending-image-wrap">
                                    <img
                                        src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/320")}
                                        alt={item.name}
                                        className="trending-product-img"
                                    />
                                    <div className="trending-overlay">
                                        <Button
                                            className="trending-cart-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(item);
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Link>

                                <div className="text-center pt-3">
                                    <h3 className="trending-product-title fs-6 fw-semibold mb-2">
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </h3>
                                    <hr className="product-divider" />
                                    <p className="trending-product-price">₹ {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="style-section py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={5} md={6}>
                            <div className="style-image-wrap">
                                <img
                                    src="https://www.thedarkstore.in/cdn/shop/files/casual-soccer-jersey-mockup-male-model-laughing-holding-ball-black-background-custom-design-display-059.jpg?v=1749796547"
                                    alt="style"
                                    className="style-image"
                                />
                            </div>
                        </Col>

                        <Col lg={6} md={6}>
                            <div className="style-content">
                                <h2 className="style-heading">Your Style, Our Spotlight</h2>

                                <p className="style-text">
                                    Main character energy starts here. Snap a photo of your new
                                    look, tag @thedarkstore.in, and let’s make you famous on our
                                    feed. We’re always on the lookout for the best looks to
                                    showcase, so don't be shy show us what you've got!
                                </p>

                                <a
                                    href="https://www.instagram.com/thedarkstore.in/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="style-btn"
                                >
                                    FOLLOW NOW
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="style-gallery-section">
                <Container>
                    <div className="text-center mb-4 mb-md-5">
                        <h2 className="section-title fs-1">STYLE GALLERY</h2>
                    </div>

                    <Row className="g-4">

                        <Col lg={4} md={6} xs={12}>
                            <Link to="/collections?subcategory=T-Shirt" className="style-gallery-card">
                                <video className="style-gallery-video" autoPlay muted loop playsInline>
                                    <source src="https://cdn.shopify.com/videos/c/o/v/01771100915c4647912d518e08c66695.mp4" type="video/mp4" />
                                </video>
                                <div className="style-gallery-overlay">
                                    <span className="style-gallery-overlay-text">Click to view →</span>
                                </div>
                            </Link>
                        </Col>

                        <Col lg={4} md={6} xs={12}>
                            <Link to="/collections?subcategory=T-Shirt" className="style-gallery-card">
                                <video className="style-gallery-video" autoPlay muted loop playsInline>
                                    <source src="https://cdn.shopify.com/videos/c/o/v/872012ea997a4f81bf775229235c3ed7.mp4" type="video/mp4" />
                                </video>
                                <div className="style-gallery-overlay">
                                    <span className="style-gallery-overlay-text">Click to view →</span>
                                </div>
                            </Link>
                        </Col>

                        <Col lg={4} md={6} xs={12}>
                            <Link to="/collections?subcategory=T-Shirt" className="style-gallery-card">
                                <video className="style-gallery-video" autoPlay muted loop playsInline poster="https://www.thedarkstore.in/cdn/shop/files/Thisaintjustat-shirt.ItsawholeenergyAllblack.Allattitude.Zeroapologies.Ifyour-ezgif.com-video-to-webp-converter.webp?v=1758479064"></video>
                                <div className="style-gallery-overlay">
                                    <span className="style-gallery-overlay-text">Click to view →</span>
                                </div>
                            </Link>
                        </Col>

                    </Row>

                    <div className="text-center mt-4 mt-md-5">
                        <Link to="./Collection" className="style-gallery-btn">
                            View More
                        </Link>
                    </div>
                </Container>
            </section>

            <section className="hero-section">
                <div className="hero-image-wrapper">
                    <img
                        src="https://www.thedarkstore.in/cdn/shop/files/website_banner_2_2000x.png?v=1762888132"
                        alt="banner"
                        className="hero-image"
                    />
                </div>

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hero-button" style={{ cursor: 'pointer' }}>
                        Shop now
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    );
}
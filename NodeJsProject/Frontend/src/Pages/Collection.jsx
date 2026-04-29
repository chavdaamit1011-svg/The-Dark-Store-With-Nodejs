import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Collection() {
  const navigate = useNavigate();

  const collectionMap = {
    "Baby Tee": "/collections?subcategory=Baby Tee",
    "Baby Tees": "/collections?subcategory=Baby Tee",
    "Hoodies": "/collections?subcategory=Hoodies",
    "Men Hoodies": "/collections?subcategory=Hoodies",
    "Mini Hoodies": "/collections?subcategory=Mini Hoodies",
    "Shirts": "/collections?subcategory=Shirts",
    "Men Shirts": "/collections?subcategory=Shirts",
    "Sweatshirts": "/collections?subcategory=Sweatshirts",
    "Men Sweatshirts": "/collections?subcategory=Sweatshirts",
    "T-Shirt": "/collections?subcategory=T-Shirt",
    "Men T-shirt": "/collections?subcategory=T-Shirt",
    "MEN": "/men"
  };

  const handleCardClick = (name) => {
    const route = collectionMap[name];
    if (route) {
      navigate(route);
    } else {
      toast.error("Not Available");
    }
  };

  return (
    <>
      <style>{`/* GLOBAL DARK BACKGROUND */
body {
  background: #000;
}

/* CONTAINER */
.collections-container {
  padding: 50px 20px;
  background: #000;
  max-width: 1200px;
  margin: auto;
}

/* TITLE */
.section-title {
  position: relative;
  display: inline-block;
  margin-bottom: 35px;
  font-family: "Cinzel", serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  font-size: 30px;

  text-shadow: 2px 2px 0 #ff0000, -2px -2px 0 #00f0ff;

}

.section-title::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 65%;
  height: 2px;
  border-radius: 20px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  animation: lineGlow 2.2s ease-in-out infinite;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

/* CARD */
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #0a0a0a; /* subtle dark instead of transparent */
  border-radius: 6px;
  transition: all 0.3s ease;
}

/* IMAGE */
.card img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  transition: 0.5s ease;
  display: block;
}

/* HOVER EFFECT */
.card:hover img {
  transform: scale(1.12);
  filter: brightness(1.1);
}

.card:hover {
  transform: translateY(-8px);
}

/* OVERLAY */
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.7),
    rgba(0,0,0,0.2),
    transparent
  );
  transition: 0.3s;
}

.card:hover::after {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.9),
    rgba(0,0,0,0.4),
    transparent
  );
}

/* TEXT */
.card p {
  position: absolute;
  bottom: 14px;
  left: 16px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  z-index: 2;
  transition: 0.3s;
}

/* TEXT HOVER */
.card:hover p {
  transform: translateY(-3px);
}

/* DARK CARD (Best Sellers, Joggers) */
.card.dark {
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card.dark p {
  position: static;
  font-size: 17px;
}

/* ANIMATIONS */
@keyframes lineGlow {
  0% { width: 0%; opacity: 0; }
  50% { width: 65%; opacity: 1; }
  100% { width: 0%; opacity: 0; }
}


/* RESPONSIVE */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
      `}</style>

      <div className="collections-container">
        <h2 className="section-title">Collections</h2>

        <div className="grid">

          <div className="card" onClick={() => handleCardClick("Baby Tee")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/2_d171bda9-5a3c-4bbc-88a8-07b7d70f0b7d.png?v=1773395945&width=750" />
            <p>Baby Tee →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Baby Tees")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/2_5ac4b738-043d-48d6-870c-7485803dd5d1.png?v=1763457351" />
            <p>Baby Tees →</p>
          </div>

          <div className="card dark" onClick={() => handleCardClick("Best Sellers")}>
            <p>Best Sellers →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("CULT CREW")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/cult_crew_3.png?v=1767850661&width=1000" />
            <p>CULT CREW →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("HERITAGE HACK")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/heritage_hack.png?v=1767850697&width=1000" />
            <p>HERITAGE HACK →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Hoodies")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/1_7b6e91f9-83ba-4575-90c6-6b983451ba1b.png?v=1767614701&width=750" />
            <p>Hoodies →</p>
          </div>

          <div className="card dark" onClick={() => handleCardClick("Joggers")}>
            <p>Joggers →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Latest Drops")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/Gemini_Generated_Image_pfdlndpfdlndpfdl_1.png?v=1773397843&width=1500" />
            <p>Latest Drops →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Marvel Mania")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/hand-holding-tshirt-mockup-closeup-of-white-tee-with-design-space-in-soft-light-01181.jpg?v=1752340029" />
            <p>Marvel Mania →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("MEN")}>
            <img src="https://www.thedarkstore.in/cdn/shop/files/trendy-relaxed-fit-t-shirt-mockup-ideal-for-casual-looks-and-simple-streetwear-style-02490.jpg?v=1763387753" />
            <p>MEN →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Men Hoodies")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/2_71692a12-7a74-4dbc-8b09-86e890b11ee2.png?v=1773395816&width=1500" />
            <p>Men Hoodies →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Men Shirts")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/Gemini_Generated_Image_epwsnsepwsnsepws_1.png?v=1774264069&width=1500" />
            <p>Men Shirts →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Men Sweatshirts")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/sweatshirt_corrected_a90d25dd-cf25-4200-b2e1-0a710f566f01.png?v=1773398109&width=1500" />
            <p>Men Sweatshirts →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Men T-shirt")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/tee_2ab85bcf-8242-4a6f-b76b-9444ee294dc6.png?v=1773395893&width=1500" />
            <p>Men T-shirt →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Mini Hoodies")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/mini_hoodie.png?v=1767619610" />
            <p>Mini Hoodies →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("New Drops")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/WhatsApp_Image_2026-02-13_at_01.45.49-Photoroom_1.png?v=1773398270" />
            <p>New Drops →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("New in Store")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/urban-evening-tshirt-mockup-male-model-with-wristbands-back-view-warm-bokeh-lighting-stylish-and-moody-atmosphere-01792.jpg?v=1763455102" />
            <p>New in Store →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Shirts")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/Gemini_Generated_Image_c7fh92c7fh92c7fh_1.png?v=1769112980&width=1500" />
            <p>Shirts →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("SPOTLIT AURA")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/auralit.png?v=1767850728&width=750" />
            <p>SPOTLIT AURA →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("Sweatshirts")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/sweatshirt_corrected.png?v=1765017663&width=1500" />
            <p>Sweatshirts →</p>
          </div>

          <div className="card" onClick={() => handleCardClick("T-Shirt")}>
            <img src="https://www.thedarkstore.in/cdn/shop/collections/tee_4211c2d9-de09-4df0-aaed-29abbff55962.png?v=1769148318&width=1500" />
            <p>T-Shirt →</p>
          </div>

        </div>
      </div>
    </>
  );
}
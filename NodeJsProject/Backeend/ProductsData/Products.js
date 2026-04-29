const product = [
    // Men T-shirt
    {
        name: "Men T-shirt 1",
        price: 799,
        category: "Men",
        subcategory: "Men T-shirt",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/34.jpg?v=1768323211&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/36.jpg?v=1775917839&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/r3xqvtguuejm6aumaamr.png?v=1775917839&width=990"
        ],
        description: "Crafted from 100% premium combed cotton, this 'Dark Store' signature tee offers a perfect blend of comfort and street-ready style. Features a minimalist aesthetic with a durable neckline that retains shape even after multiple washes."
    },
    {
        name: "Men T-shirt 2",
        price: 849,
        category: "Men",
        subcategory: "Men T-shirt",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/agbointjydnpywizlydl.png?v=1775839302&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/tbn7zfe6r9bxoghfffqq.png?v=1775839303&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/w3xtn35tom6c95tx5hui.png?v=1775839302&width=990"
        ],
        description: "Elevate your daily rotation with this clean-cut Men's T-shirt. Designed for the modern urban dweller, it features a breathable knit fabric and a relaxed fit that pairs effortlessly with any 'Dark Store' denim or cargo."
    },

    // Men Sweatshirts
    {
        name: "Men Sweatshirt 1",
        price: 1199,
        category: "Men",
        subcategory: "Men Sweatshirts",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/nofgo8cudsasbucindum.png?v=1775300885&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/bahp35sea5nel1rrupvn.png?v=1775300885&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/front_and_back_k_jesus.png?v=1775300885&width=990"
        ],
        description: "Heavyweight fleece meets a refined silhouette. This premium sweatshirt is built to provide maximum warmth without the bulk. Finished with ribbed cuffs and a soft-brushed interior for an ultra-luxurious feel against the skin."
    },
    {
        name: "Men Sweatshirt 2",
        price: 1249,
        category: "Men",
        subcategory: "Men Sweatshirts",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/ghost_front_1.png?v=1773782718&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_32bjgt32bjgt32bj_1.png?v=1773782718&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/k1.jpg?v=1773782718&width=990"
        ],
        description: "A staple for the colder months, this sweatshirt features a durable outer shell and a cozy thermal lining. The minimalist 'Dark Store' design makes it versatile enough for gym sessions or weekend lounging."
    },

    // Men Shirts
    {
        name: "Men Shirt 1",
        price: 999,
        category: "Men",
        subcategory: "Men Shirts",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_lz0idhlz0idhlz0i_1.png?v=1773853134&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/monkey_frontback_jpg.jpg?v=1773853134&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_obh9aiobh9aiobh9_1.png?v=1773853134&width=990"
        ],
        description: "Sharp, sophisticated, and tailored for the bold. This Men's Shirt is made from a high-thread-count cotton blend that resists wrinkles, ensuring you look crisp from morning meetings to evening events."
    },
    {
        name: "Men Shirt 2",
        price: 1049,
        category: "Men",
        subcategory: "Men Shirts",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_y9pm59y9pm59y9pm_1.png?v=1774263878&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_gbwu14gbwu14gbwu_1.png?v=1774263878&width=990",
            "http://thedarkstore.in/cdn/shop/files/facefrontback_jpg.jpg?v=1774263878&width=990"
        ],
        description: "Reimagine classic style with this modern fit shirt. Featuring a reinforced collar and premium buttons, it's a testament to 'The Dark Store's' commitment to quality craftsmanship and timeless design."
    },

    // Men Hoodies
    {
        name: "Men Hoodie 1",
        price: 1499,
        category: "Men",
        subcategory: "Men Hoodies",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/uv4sqq6oynfrqokj0hxm.png?v=1774554315&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/phjymus3n7rhtj3op1vd.png?v=1774554315&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/33.jpg?v=1774554315&width=990"
        ],
        description: "The ultimate urban armor. Our Men's Hoodie features an oversized fit, extra-large hood, and deep kangaroo pockets. Made from sustainable heavy-knit cotton to withstand the elements while keeping you stylishly comfortable."
    },
    {
        name: "Men Hoodie 2",
        price: 1549,
        category: "Men",
        subcategory: "Men Hoodies",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/kvbos49rr3ebe1ppomhl.png?v=1775055287&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/fcyj3exkivnam9el9xg2.png?v=1775055287&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/premium-hoodie-mockup-front-and-back-view-for-custom-apparel-design-showcase-01081.jpg?v=1775055287&width=990"
        ],
        description: "Luxury meets streetwear. This premium hoodie is constructed with double-stitched seams and a high-density fleece lining. Perfect for layering, it’s a bold statement piece from our latest dark-themed collection."
    },

    // Women T-Shirt
    {
        name: "Women T-Shirt 1",
        price: 699,
        category: "Women",
        subcategory: "Women T-Shirt",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/ztmiluyjdpj4ddqcivgj.png?v=1776436836&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/emuqadvtc2fbua9jakrk.png?v=1776436836&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/vclycj2cmlufqntzbvuo.png?v=1776436836&width=990"
        ],
        description: "Soft, chic, and effortlessly cool. This Women's T-shirt features a flattering feminine silhouette and a feather-light feel. Ideal for everyday wear, it uses eco-friendly dyes to maintain its deep obsidian hue."
    },
    {
        name: "Women T-Shirt 2",
        price: 749,
        category: "Women",
        subcategory: "Women T-Shirt",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/zovtvpvafrcajd0baqjz.png?v=1775917932&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/evrygwa1jgaxauhaeylg.png?v=1775917932&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_nokfhgnokfhgnokf.png?v=1775917932&width=990"
        ],
        description: "Express your individuality with this premium tee. Designed with a slightly dropped shoulder for that perfect aesthetic look, it’s the ultimate base layer for any modern woman's wardrobe."
    },

    // Baby Tee
    {
        name: "Baby Tee 1",
        price: 799,
        category: "Women",
        subcategory: "Baby Tee",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/WhatsApp_Image_2026-02-13_at_01.59.00-Photoroom_1.png?v=1770929352&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/WhatsApp_Image_2026-02-13_at_01.59.18-Photoroom_1.png?v=1770929352&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/front_back.png?v=1770929352&width=990"
        ],
        description: "The Y2K-inspired essential you’ve been looking for. This Baby Tee features a snug, cropped fit that hugs your curves in all the right places. Made from a stretchy, breathable cotton blend for maximum all-day comfort."
    },
    {
        name: "Baby Tee 2",
        price: 849,
        category: "Women",
        subcategory: "Baby Tee",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/WhatsApp_Image_2026-02-13_at_00.36.44-Photoroom.png?v=1770925054&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/WhatsApp_Image_2026-02-13_at_00.39.31-Photoroom.png?v=1770925054&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/85.jpg?v=1770925054&width=990"
        ],
        description: "Tiny tee, big impact. Our signature Baby Tee is re-imagined with reinforced stitching and a soft-touch finish. Pairs perfectly with high-waisted cargos or mini skirts for that iconic streetwear look."
    },


    // Women Shirts
    {
        name: "Women Shirt 1",
        price: 1099,
        category: "Women",
        subcategory: "Women Shirts",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_fb8k7fb8k7fb8k7f-Picsart-AiImageEnhancer-Photoroom.png?v=1774090299&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/Gemini_Generated_Image_kwvkpbkwvkpbkwvk-Picsart-AiImageEnhancer-Photoroom.png?v=1774090299&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/79.png?v=1774090299&width=990"
        ],
        description: "Sophistication with an edge. This Women's Shirt features a structured collar and a flowing silhouette. Crafted from a premium silky-smooth fabric that drapes beautifully, making it a versatile piece for any occasion."
    },
    {
        name: "Women Shirt 2",
        price: 1149,
        category: "Women",
        subcategory: "Women Shirts",
        image: [
            "https://www.westside.com/cdn/shop/files/301066233OFFWHITE_4.jpg?v=1776959465&width=1946",
            "https://www.westside.com/cdn/shop/files/301066233OFFWHITE_2.jpg?v=1776959465&width=1946",
            "https://www.westside.com/cdn/shop/files/301066233OFFWHITE_1.jpg?v=1776959465&width=1946"
        ],
        description: "A timeless classic updated for the 'Dark Store' aesthetic. Featuring subtle detailing and a durable yet soft weave, this shirt is designed to be your go-to for effortless elegance and modern styling."
    },

    // Women Hoodies
    {
        name: "Women Hoodie 1",
        price: 1499,
        category: "Women",
        subcategory: "Women Hoodies",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/id6nvgq7ifygsdgqxmki.png?v=1775054353&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/e7ok4sifdch1vhoggpqa.png?v=1775054353&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/premium-comfort-hoodie-mockup-with-front-back-view-for-custom-design-presentation-01290_4.jpg?v=1775054353&width=990"
        ],
        description: "Envelop yourself in luxury. This Women's Hoodie is made from our exclusive 'Dark Store' fleece, offering unmatched warmth and a plush feel. Features a sleek, modern fit with premium hardware and a deep-seated hood."
    },
    {
        name: "Women Hoodie 2",
        price: 1549,
        category: "Women",
        subcategory: "Women Hoodies",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/h6pwwh3spoewmceqatj7.png?v=1775055479&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/xx0znmitmzgnuem6ueim.png?v=1775055479&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/wcoyzzfpe5vpkjeqo1aq.png?v=1775055479&width=990"
        ],
        description: "Bold design meets ultimate comfort. This premium hoodie features a contemporary silhouette and a high-density knit that holds its shape. Perfect for those who demand style and functionality in equal measure."
    },

    // Mini Hoodies
    {
        name: "Mini Hoodie 1",
        price: 1399,
        category: "Women",
        subcategory: "Mini Hoodies",
        image: [
            "https://www.thedarkstore.in/cdn/shop/files/b2_740aba5e-9908-4729-9144-c7b23fa4e0e7.jpg?v=1768323321&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/b1.jpg?v=1768323321&width=990",
            "https://www.thedarkstore.in/cdn/shop/files/b3_6b16ae02-5c5d-46cb-933d-8c0b6578f45c.jpg?v=1766917364&width=990"
        ],
        description: "The ultimate street-style crop. This Mini Hoodie is designed with a modern high-low hem and extra-long sleeves. Made from a premium cotton-poly blend that’s as soft as it is durable. A 'Dark Store' favorite."
    },
    {
        name: "Mini Hoodie 2",
        price: 1449,
        category: "Women",
        subcategory: "Mini Hoodies",
        image: [
            "https://images.bewakoof.com/t1080/women-s-black-first-beaglehood-graphic-printed-hoodies-648813-1730981560-2.jpg",
            "https://images.bewakoof.com/t1080/women-s-black-first-beaglehood-graphic-printed-hoodies-648813-1730981573-5.jpg",
            "https://images.bewakoof.com/t1080/women-s-black-first-beaglehood-graphic-printed-hoodies-648813-1730981577-6.jpg"
        ],
        description: "Elevate your casual look with this signature Mini Hoodie. Featuring a cozy interior and a trendy cropped length, it's the perfect statement piece for layering or wearing standalone during those crisp evening outings."
    },
]

module.exports = product
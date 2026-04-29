const WishlistModel = require("../Model/WishlistModel");

// Get user's wishlist
const getWishlist = async (req, res) => {
    try {
        const { email } = req.params;
        let wishlist = await WishlistModel.findOne({ userEmail: email }).populate("items.product");
        
        if (!wishlist) {
            wishlist = await WishlistModel.create({ userEmail: email, items: [] });
        }
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userEmail, productId, quantity = 1, selectedSize = "M", selectedColor = "Standard" } = req.body;

        let wishlist = await WishlistModel.findOne({ userEmail });
        if (!wishlist) {
            wishlist = await WishlistModel.create({ userEmail, items: [] });
        }

        const existingItemIndex = wishlist.items.findIndex(
            item => item.product.toString() === productId && 
                    item.selectedSize === selectedSize && 
                    item.selectedColor === selectedColor
        );

        if (existingItemIndex === -1) {
            wishlist.items.push({
                product: productId,
                quantity,
                selectedSize,
                selectedColor
            });
            await wishlist.save();
        }

        await wishlist.populate("items.product");
        res.status(200).json({ success: true, message: "Item added to wishlist", wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userEmail, productId, selectedSize, selectedColor } = req.body;
        
        const wishlist = await WishlistModel.findOne({ userEmail });
        if (!wishlist) return res.status(404).json({ success: false, message: "Wishlist not found" });

        wishlist.items = wishlist.items.filter(
            item => !(item.product.toString() === productId && 
                      item.selectedSize === selectedSize && 
                      item.selectedColor === selectedColor)
        );

        await wishlist.save();
        await wishlist.populate("items.product");

        res.status(200).json({ success: true, message: "Item removed from wishlist", wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Clear wishlist
const clearWishlist = async (req, res) => {
    try {
        const { userEmail } = req.body;
        await WishlistModel.findOneAndUpdate({ userEmail }, { items: [] });
        res.status(200).json({ success: true, message: "Wishlist cleared" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist, clearWishlist };

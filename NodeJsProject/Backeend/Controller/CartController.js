const CartModel = require("../Model/CartModel");

// Get user's cart
const getCart = async (req, res) => {
    try {
        const { email } = req.params;
        let cart = await CartModel.findOne({ userEmail: email }).populate("items.product");
        
        if (!cart) {
            cart = await CartModel.create({ userEmail: email, items: [] });
        } else {
            const originalLength = cart.items.length;
            cart.items = cart.items.filter(item => item.product != null);
            if (cart.items.length !== originalLength) {
                await cart.save();
            }
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { userEmail, productId, quantity = 1, selectedSize = "M", selectedColor = "Standard" } = req.body;

        let cart = await CartModel.findOne({ userEmail });
        if (!cart) {
            cart = await CartModel.create({ userEmail, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && 
                    item.selectedSize === selectedSize && 
                    item.selectedColor === selectedColor
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                selectedSize,
                selectedColor
            });
        }

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { userEmail, productId, selectedSize, selectedColor, action } = req.body;
        // action can be "inc" or "dec"
        
        const cart = await CartModel.findOne({ userEmail });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && 
                    item.selectedSize === selectedSize && 
                    item.selectedColor === selectedColor
        );

        if (itemIndex > -1) {
            if (action === "inc") {
                cart.items[itemIndex].quantity += 1;
            } else if (action === "dec") {
                if (cart.items[itemIndex].quantity > 1) {
                    cart.items[itemIndex].quantity -= 1;
                }
            }
            await cart.save();
            await cart.populate("items.product");
            return res.status(200).json({ success: true, message: "Cart updated", cart });
        }

        res.status(404).json({ success: false, message: "Item not found in cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { userEmail, productId, selectedSize, selectedColor } = req.body;
        
        const cart = await CartModel.findOne({ userEmail });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        cart.items = cart.items.filter(
            item => !(item.product.toString() === productId && 
                      item.selectedSize === selectedSize && 
                      item.selectedColor === selectedColor)
        );

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const { userEmail } = req.body;
        await CartModel.findOneAndUpdate({ userEmail }, { items: [] });
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };

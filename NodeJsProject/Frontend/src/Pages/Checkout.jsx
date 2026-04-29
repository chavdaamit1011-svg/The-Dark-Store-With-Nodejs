import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Api from '../../Api';

export default function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [activeUser, setActiveUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Online');
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [deliveryDetails, setDeliveryDetails] = useState({
        fullName: '', address: '', city: '', pincode: '', phone: ''
    });

    useEffect(() => {
        const storedStr = localStorage.getItem('user');
        if (!storedStr) {
            toast.error("Please log in to checkout!");
            navigate('/Users');
            return;
        }
        const user = JSON.parse(storedStr);
        setActiveUser(user);

        // Pre-fill name from profile
        setDeliveryDetails(prev => ({ ...prev, fullName: user.name || '' }));

        // Load Razorpay Script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        // Fetch cart
        Api.get(`/cart/${user.email}`).then(res => {
            if (res.data.success && res.data.cart.items.length > 0) {
                const items = res.data.cart.items;
                setCart(items);
                let sum = 0;
                items.forEach(item => {
                    if (item.product?.price) {
                        const priceStr = String(item.product.price).replace(/[^0-9.]/g, '');
                        sum += Number(priceStr) * item.quantity;
                    }
                });
                setTotal(sum);
            } else {
                toast.error("Your cart is empty!");
                navigate('/Cart');
            }
        }).catch(err => {
            console.error(err);
            toast.error("Error loading cart");
        });
    }, [navigate]);

    const handleInputChange = (e) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const handleProceedToPayment = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!deliveryDetails.address || !deliveryDetails.phone || !deliveryDetails.pincode) {
            toast.error("Please fill all delivery details!");
            return;
        }
        
        if (paymentMethod === 'COD') {
            onPaymentSuccess({
                method: 'Cash on Delivery (COD)',
                transactionId: `COD_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
            });
        } else {
            // Init Razorpay
            initRazorpay();
        }
    };

    const initRazorpay = async () => {
        setLoadingPayment(true);
        try {
            // 1. Create order on backend
            const orderRes = await Api.post("/payment/create-order", { amount: total });
            
            if (!orderRes.data.success) {
                toast.error(orderRes.data.message || "Could not initialize payment");
                setLoadingPayment(false);
                return;
            }

            const { order, key_id } = orderRes.data;

            if (!window.Razorpay) {
                toast.error("Razorpay SDK failed to load. Please check your connection.");
                setLoadingPayment(false);
                return;
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: key_id,
                amount: order.amount,
                currency: order.currency,
                name: "The Dark Store",
                description: "Purchase from The Dark Store",
                order_id: order.id,
                config: {
                    display: {
                        blocks: {
                            upi: {
                                name: "Pay via UPI",
                                instruments: [
                                    { method: "upi" }
                                ]
                            },
                            other: {
                                name: "Other Payment Modes",
                                instruments: [
                                    { method: "card" },
                                    { method: "netbanking" },
                                    { method: "wallet" }
                                ]
                            }
                        },
                        sequence: ["block.upi", "block.other"],
                        preferences: {
                            show_default_blocks: true
                        }
                    }
                },
                prefill: {
                    name: deliveryDetails.fullName,
                    email: activeUser.email,
                    contact: deliveryDetails.phone
                },
                theme: {
                    color: "#00d4ff"
                },
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await Api.post("/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            onPaymentSuccess({
                                method: 'Razorpay Online',
                                transactionId: response.razorpay_payment_id
                            });
                        } else {
                            toast.error("Payment Verification Failed!");
                        }
                    } catch (err) {
                        toast.error("Verification error");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                toast.error(response.error.description || "Payment Failed");
            });
            rzp.open();
            
        } catch (error) {
            console.error("Razorpay Init Error:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Error opening payment gateway");
        }
        setLoadingPayment(false);
    };

    const onPaymentSuccess = async (paymentDetails) => {
        try {
            const orderData = {
                userEmail: activeUser.email,
                items: cart.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                    price: Number(String(item.product.price).replace(/[^0-9.]/g, ''))
                })),
                totalAmount: total,
                deliveryDetails,
                paymentDetails
            };

            const res = await Api.post('/order/create', orderData);
            if (res.data.success) {
                toast.success("Order Placed Successfully!");
                window.dispatchEvent(new Event('cartUpdated')); // update navbar cart count to 0
                navigate(`/order-success/${res.data.order._id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order. Contact support.");
        }
    };

    return (
        <div style={{ backgroundColor: "#050505", minHeight: "100vh", color: "#fff", paddingTop: "40px", paddingBottom: "80px" }}>
            <Container>
                <h1 className="mb-4" style={{ color: "#00d4ff", fontWeight: "700" }}>Secure Checkout</h1>
                <Row className="g-5">
                    {/* Delivery Form */}
                    <Col lg={7}>
                        <Card style={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "16px" }}>
                            <Card.Body className="p-4">
                                <h4 className="mb-4 text-white">Delivery Details</h4>
                                <Form onSubmit={handleProceedToPayment}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#ddd" }}>Full Name</Form.Label>
                                        <Form.Control required type="text" name="fullName" value={deliveryDetails.fullName} onChange={handleInputChange} style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444" }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#ddd" }}>Phone Number</Form.Label>
                                        <Form.Control required type="tel" name="phone" value={deliveryDetails.phone} onChange={handleInputChange} style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444" }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#ddd" }}>Complete Address</Form.Label>
                                        <Form.Control required as="textarea" rows={3} name="address" value={deliveryDetails.address} onChange={handleInputChange} style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444" }} />
                                    </Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{ color: "#ddd" }}>City</Form.Label>
                                                <Form.Control required type="text" name="city" value={deliveryDetails.city} onChange={handleInputChange} style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444" }} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label style={{ color: "#ddd" }}>Pincode</Form.Label>
                                                <Form.Control required type="text" name="pincode" value={deliveryDetails.pincode} onChange={handleInputChange} style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444" }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4 mt-3">
                                        <Form.Label style={{ color: "#00d4ff", fontWeight: "600" }}>Select Payment Method</Form.Label>
                                        <div className="d-flex flex-column flex-md-row gap-3 mt-2">
                                            <Form.Check 
                                                type="radio" 
                                                id="pay-online"
                                                label={<span style={{ color: "#fff" }}>Pay Online (UPI, Card, Netbanking)</span>} 
                                                name="paymentMethod" 
                                                value="Online" 
                                                checked={paymentMethod === 'Online'} 
                                                onChange={(e) => setPaymentMethod(e.target.value)} 
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                id="pay-cod"
                                                label={<span style={{ color: "#fff" }}>Cash on Delivery (COD)</span>} 
                                                name="paymentMethod" 
                                                value="COD" 
                                                checked={paymentMethod === 'COD'} 
                                                onChange={(e) => setPaymentMethod(e.target.value)} 
                                            />
                                        </div>
                                    </Form.Group>
                                    <Button type="submit" disabled={loadingPayment} variant="info" className="w-100 py-3 mt-3 fw-bold text-dark" style={{ fontSize: "16px", borderRadius: "10px" }}>
                                        {loadingPayment ? 'Processing...' : (paymentMethod === 'COD' ? 'Place Order (COD)' : 'Proceed to Payment')}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Order Summary */}
                    <Col lg={5}>
                        <Card style={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "16px" }}>
                            <Card.Body className="p-4">
                                <h4 className="mb-4 text-white">Order Summary</h4>
                                <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="d-flex align-items-center mb-3 pb-3 border-bottom border-secondary">
                                            <img src={item.product?.image || "https://via.placeholder.com/60"} alt={item.product?.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                                            <div className="ms-3 flex-grow-1">
                                                <h6 className="mb-1 text-white" style={{ fontSize: "14px" }}>{item.product?.name}</h6>
                                                <small style={{ color: "#aaa", display: "block", marginTop: "4px", fontSize: "12px" }}>
                                                    Size: <span style={{ color: "#00d4ff" }}>{item.selectedSize || "Standard"}</span> | Color: <span style={{ color: "#00d4ff" }}>{item.selectedColor || "Standard"}</span>
                                                </small>
                                                <div style={{ fontSize: "12px", color: "#aaa" }}>Qty: {item.quantity}</div>
                                            </div>
                                            <div className="fw-bold" style={{ color: "#00d4ff" }}>
                                                ₹{(Number(String(item.product?.price).replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="d-flex justify-content-between mb-2" style={{ color: "#ccc" }}>
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3" style={{ color: "#ccc" }}>
                                    <span>Shipping</span>
                                    <span className="text-success fw-bold">Free</span>
                                </div>
                                <div className="d-flex justify-content-between pt-3 border-top border-secondary">
                                    <span className="fs-5 fw-bold text-white">Total</span>
                                    <span className="fs-5 fw-bold" style={{ color: "#ff3366" }}>₹{total.toLocaleString()}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

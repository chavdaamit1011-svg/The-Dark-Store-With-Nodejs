import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Api from '../../Api';

export default function OrderSuccess() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Api.get(`/order/${id}`).then(res => {
            if (res.data.success) {
                setOrder(res.data.order);
            }
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#050505" }}>
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    if (!order) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#050505", color: "#fff" }}>
                <h2>Order Not Found</h2>
                <Link to="/" className="btn btn-outline-info mt-3">Return to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#050505", minHeight: "100vh", paddingTop: "60px", paddingBottom: "80px", color: "#fff" }}>
            <style>{`
                .invoice-header {
                    background: #1a1a1a;
                    padding: 15px 20px;
                    border-bottom: 1px dashed #444;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .invoice-order-id {
                    font-size: 13px;
                    word-break: break-all;
                    max-width: 200px;
                }
                @media (max-width: 576px) {
                    .invoice-order-id { max-width: 100%; font-size: 12px; }
                    .invoice-header { flex-direction: column; align-items: flex-start; }
                    .invoice-section-cols { flex-direction: column !important; gap: 16px !important; }
                    .invoice-section-right { text-align: left !important; }
                    .invoice-amount { font-size: 1.4rem !important; }
                }
            `}</style>
            <Container>
                <div className="text-center mb-5">
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(0, 212, 255, 0.1)", color: "#00d4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 20px" }}>
                        <i className="bi bi-check-lg"></i>
                    </div>
                    <h1 style={{ fontWeight: "700", color: "#fff" }}>Payment Successful!</h1>
                    <p className="fs-5" style={{ color: "#ccc" }}>Thank you for your purchase. Your order has been placed.</p>
                </div>

                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card style={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "16px", overflow: "hidden" }}>
                            <div style={{ backgroundColor: "#1a1a1a", padding: "20px 30px", borderBottom: "1px dashed #444", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
                                <div>
                                    <div className="mb-1" style={{ color: "#ccc", fontSize: "13px" }}>Order ID</div>
                                    <div className="fw-bold fs-5 text-white">{order._id}</div>
                                </div>
                                <div className="text-end">
                                    <div className="mb-1" style={{ color: "#ccc", fontSize: "13px" }}>Transaction ID</div>
                                    <div className="fw-bold" style={{ color: "#00d4ff" }}>{order.paymentDetails?.transactionId}</div>
                                </div>
                            </div>

                            <Card.Body className="p-4 p-md-5">
                                <Row className="mb-4 g-4">
                                    <Col sm={6}>
                                        <h6 className="mb-3" style={{ color: "#ccc" }}>Delivery Address</h6>
                                        <div className="fw-bold text-white mb-1">{order.deliveryDetails?.fullName}</div>
                                        <div style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6" }}>
                                            {order.deliveryDetails?.address}<br/>
                                            {order.deliveryDetails?.city} - {order.deliveryDetails?.pincode}<br/>
                                            Phone: {order.deliveryDetails?.phone}
                                        </div>
                                    </Col>
                                    <Col sm={6} className="invoice-section-right text-sm-end">
                                        <h6 className="mb-3" style={{ color: "#ccc" }}>Order Details</h6>
                                        <div style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6" }}>
                                            <div>Date: <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span></div>
                                            <div>Payment Method: <span className="text-white">{order.paymentDetails?.method}</span></div>
                                            <div>Status: <span className="text-warning fw-bold">{order.status}</span></div>
                                        </div>
                                    </Col>
                                </Row>

                                <h6 className="text-white mb-3 pb-2 border-bottom border-secondary">Items Ordered</h6>
                                <div className="mb-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={item.product?.image || "https://via.placeholder.com/50"} alt="product" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", marginRight: "15px" }} />
                                                <div>
                                                    <div className="text-white fw-bold" style={{ fontSize: "15px" }}>{item.product?.name || "Deleted Product"}</div>
                                                    <div style={{ color: "#ccc", fontSize: "12px" }}>Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                            <div className="text-white fw-bold">₹{(item.price * item.quantity).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
                                    <span className="fs-5" style={{ color: "#ccc" }}>Total Amount Paid</span>
                                    <span className="invoice-amount fw-bold" style={{ color: "#ff3366", fontSize: "1.6rem" }}>₹{order.totalAmount.toLocaleString()}</span>
                                </div>
                            </Card.Body>
                            <div style={{ backgroundColor: "rgba(0, 212, 255, 0.05)", padding: "20px", textAlign: "center", borderTop: "1px solid #222" }}>
                                <p className="text-info mb-0" style={{ fontSize: "14px" }}><i className="bi bi-truck me-2"></i>Estimated Delivery: 3-5 Business Days</p>
                            </div>
                        </Card>

                        <div className="text-center mt-5">
                            <Link to="/orders">
                                <Button variant="outline-light" className="me-3 px-4">View All Orders</Button>
                            </Link>
                            <Link to="/">
                                <Button variant="info" className="px-4 text-dark fw-bold">Continue Shopping</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

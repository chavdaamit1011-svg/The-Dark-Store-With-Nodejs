import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../Api';
import toast from 'react-hot-toast';

export default function MyOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedStr = localStorage.getItem('user');
        if (!storedStr) {
            toast.error("Please log in to view your orders.");
            navigate('/Users');
            return;
        }
        const user = JSON.parse(storedStr);

        Api.get(`/order/user/${user.email}`).then(res => {
            if (res.data.success) {
                setOrders(res.data.orders);
            }
            setLoading(false);
        }).catch(err => {
            console.error(err);
            toast.error("Failed to load orders");
            setLoading(false);
        });
    }, [navigate]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'warning';
            case 'Processing': return 'info';
            case 'Shipped': return 'primary';
            case 'Delivered': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#050505" }}>
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#050505", minHeight: "100vh", color: "#fff", paddingTop: "40px", paddingBottom: "80px" }}>
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-3">
                    <h1 style={{ color: "#00d4ff", fontWeight: "700", margin: 0 }}>My Orders</h1>
                    <Link to="/">
                        <Button variant="outline-light">Continue Shopping</Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-box-seam" style={{ fontSize: "60px", color: "#aaa" }}></i>
                        <h3 className="mt-4 text-white">No Orders Found</h3>
                        <p style={{ color: "#ccc" }}>Looks like you haven't placed any orders yet.</p>
                        <Link to="/">
                            <Button variant="info" className="mt-3 px-4 text-dark fw-bold">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <Row className="g-4">
                        {orders.map(order => (
                            <Col xs={12} key={order._id}>
                                <Card style={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px", overflow: "hidden" }}>
                                    <div style={{ backgroundColor: "#1a1a1a", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", flexWrap: "wrap", gap: "10px" }}>
                                        <div className="d-flex flex-wrap gap-4">
                                            <div>
                                                <div style={{ color: "#ccc", fontSize: "12px", textTransform: "uppercase" }}>Order Placed</div>
                                                <div className="fw-bold text-white" style={{ fontSize: "14px" }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                            </div>
                                            <div>
                                                <div style={{ color: "#ccc", fontSize: "12px", textTransform: "uppercase" }}>Total</div>
                                                <div className="fw-bold" style={{ color: "#ff3366", fontSize: "14px" }}>₹{order.totalAmount.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div style={{ color: "#ccc", fontSize: "12px", textTransform: "uppercase" }}>Ship To</div>
                                                <div className="fw-bold" style={{ fontSize: "14px", color: "#00d4ff" }}>{order.deliveryDetails?.fullName}</div>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div style={{ color: "#ccc", fontSize: "12px", textTransform: "uppercase" }}>Order # {order._id}</div>
                                            <Link to={`/order-success/${order._id}`} className="text-info" style={{ fontSize: "13px", textDecoration: "none" }}>View Invoice / Details</Link>
                                        </div>
                                    </div>
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
                                            <h5 className="mb-0 text-white">Status: <Badge bg={getStatusColor(order.status)} text={order.status === 'Pending' || order.status === 'Processing' ? 'dark' : 'white'} className="ms-2">{order.status}</Badge></h5>
                                        </div>
                                        
                                        <Row className="g-3">
                                            {order.items.map((item, idx) => (
                                                <Col md={6} lg={4} key={idx}>
                                                    <div className="d-flex p-3" style={{ backgroundColor: "#0a0a0a", borderRadius: "8px", border: "1px solid #222", height: "100%" }}>
                                                        <img src={item.product?.image || "https://via.placeholder.com/80"} alt="product" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} />
                                                        <div className="ms-3 d-flex flex-column justify-content-center">
                                                            <div className="fw-bold text-white mb-1" style={{ fontSize: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                                {item.product?.name || "Deleted Product"}
                                                            </div>
                                                            <div style={{ color: "#ccc", fontSize: "12px" }}>
                                                                Size: {item.selectedSize} | Color: {item.selectedColor}
                                                            </div>
                                                            <div style={{ fontSize: "13px", color: "#00d4ff", marginTop: "4px" }}>Qty: {item.quantity}</div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

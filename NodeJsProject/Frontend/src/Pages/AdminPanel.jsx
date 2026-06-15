import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import Api from '../../Api';
import { io } from 'socket.io-client';
import './AdminPanel.css';

export default function AdminPanel() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
    const [graphData, setGraphData] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activities, setActivities] = useState([]);

    // --- Live Chat State ---
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [replyText, setReplyText] = useState('');
    const chatSocket = useRef(null);

    // Check admin access
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) {
            navigate("/");
            return;
        }
        const user = JSON.parse(stored);
        if (user.role !== "Admin") {
            toast.error("Unauthorized access!");
            navigate("/");
        }
    }, [navigate]);

    // Fetch data based on active tab
    useEffect(() => {
        if (activeTab === 'dashboard') fetchDashboardData();
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'products') fetchProducts();
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'activities') fetchActivities();
        if (activeTab === 'livechat') fetchChats();
    }, [activeTab]);

    const fetchDashboardData = async () => {
        try {
            const res = await Api.get('/admin/stats');
            if (res.data.success) {
                setStats(res.data.stats);
                setGraphData(res.data.graphData);
            }
        } catch (err) { console.error(err); }
    };

    const fetchUsers = async () => {
        try {
            const res = await Api.get('/admin/users');
            if (res.data.success) setUsers(res.data.users);
        } catch (err) { console.error(err); }
    };

    const fetchProducts = async () => {
        try {
            const res = await Api.get('/admin/products');
            if (res.data.success) setProducts(res.data.products);
        } catch (err) { console.error(err); }
    };

    const fetchOrders = async () => {
        try {
            const res = await Api.get('/admin/orders');
            if (res.data.success) setOrders(res.data.orders);
        } catch (err) { console.error(err); }
    };

    const fetchActivities = async () => {
        try {
            const res = await Api.get('/admin/activities');
            if (res.data.success) setActivities(res.data.logs);
        } catch (err) { console.error(err); }
    };

    // --- Chat Handlers ---
    const fetchChats = async () => {
        try {
            const res = await Api.get('/admin/chats');
            if (res.data.success) setChats(res.data.chats);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        // Connect admin socket
        const SOCKET_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8024' : '';
        chatSocket.current = io(SOCKET_URL);
        chatSocket.current.emit('join_admin');

        // Listen for new messages
        chatSocket.current.on('new_user_message', ({ userEmail, userName, message }) => {
            setChats(prev => {
                const exists = prev.find(c => c.userEmail === userEmail);
                if (exists) {
                    return prev.map(c => c.userEmail === userEmail
                        ? { ...c, messages: [...c.messages, message], isRead: false, updatedAt: new Date() }
                        : c
                    ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                }
                return [{ userEmail, userName, messages: [message], isRead: false, updatedAt: new Date() }, ...prev];
            });
            setSelectedChat(prev => prev?.userEmail === userEmail
                ? { ...prev, messages: [...prev.messages, message] }
                : prev
            );
        });

        return () => { chatSocket.current?.disconnect(); };
    }, []);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedChat?.messages]);

    const sendAdminReply = () => {
        if (!replyText.trim() || !selectedChat) return;
        const msg = { from: 'admin', text: replyText.trim(), time: new Date() };
        chatSocket.current.emit('admin_reply', { userEmail: selectedChat.userEmail, text: replyText.trim() });
        setSelectedChat(prev => ({ ...prev, messages: [...prev.messages, msg] }));
        setChats(prev => prev.map(c => c.userEmail === selectedChat.userEmail
            ? { ...c, messages: [...c.messages, msg] }
            : c
        ));
        setReplyText('');
    };

    // --- User Handlers ---
    const [showEditUser, setShowEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleUserStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
        try {
            await Api.post('/admin/users/status', { id, status: newStatus });
            toast.success(`User ${newStatus}`);
            fetchUsers();
        } catch (err) { toast.error("Error updating status"); }
    };

    const toggleUserRole = async (id, currentRole) => {
        const newRole = currentRole === 'Admin' ? 'User' : 'Admin';
        try {
            await Api.post('/admin/users/role', { id, role: newRole });
            toast.success(`Role changed to ${newRole}`);
            fetchUsers();
        } catch (err) { toast.error("Error changing role"); }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await Api.delete(`/admin/users/${id}`);
            toast.success("User deleted");
            fetchUsers();
        } catch (err) { toast.error("Error deleting user"); }
    };

    const handleEditUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post('/admin/users/edit', { id: selectedUser._id, name: selectedUser.name, email: selectedUser.email });
            toast.success("User updated");
            setShowEditUser(false);
            fetchUsers();
        } catch (err) { toast.error("Error updating user"); }
    };

    // --- Product Handlers ---
    const [showProductModal, setShowProductModal] = useState(false);
    const [productForm, setProductForm] = useState({ _id: null, name: '', price: '', category: '', subcategory: '', image: ['', '', ''], description: '' });

    const openProductModal = (product = null) => {
        if (product) {
            // Ensure image is an array of 3
            let imgs = Array.isArray(product.image) ? [...product.image] : [product.image, '', ''];
            while (imgs.length < 3) imgs.push('');
            setProductForm({ ...product, image: imgs.slice(0, 3) });
        } else {
            setProductForm({ _id: null, name: '', price: '', category: '', subcategory: '', image: ['', '', ''], description: '' });
        }
        setShowProductModal(true);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productForm._id) {
                await Api.put('/admin/products', { id: productForm._id, ...productForm });
                toast.success("Product updated");
            } else {
                await Api.post('/admin/products', productForm);
                toast.success("Product added");
            }
            setShowProductModal(false);
            fetchProducts();
        } catch (err) { toast.error("Error saving product"); }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await Api.delete(`/admin/products/${id}`);
            toast.success("Product deleted");
            fetchProducts();
        } catch (err) { toast.error("Error deleting product"); }
    };

    // --- Order Handlers ---
    const updateOrderStatus = async (orderId, status) => {
        try {
            const adminEmail = JSON.parse(localStorage.getItem('user'))?.email;
            await Api.post('/admin/orders/status', { orderId, status, adminEmail });
            toast.success(`Order status updated to ${status}`);
            fetchOrders();
        } catch (err) {
            toast.error("Error updating order status");
        }
    };

    return (
        <Container fluid className="admin-panel p-0">
            <Row className="m-0">
                {/* Sidebar */}
                <Col md={2} className="admin-sidebar p-3 d-none d-md-block">
                    <h4 className="text-info mb-4 fw-bold">Admin Panel</h4>
                    <Nav className="flex-column gap-2">
                        <Nav.Link className={`admin-nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><i className="bi bi-speedometer2 me-2"></i>Dashboard</Nav.Link>
                        <Nav.Link className={`admin-nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}><i className="bi bi-people me-2"></i>Users</Nav.Link>
                        <Nav.Link className={`admin-nav-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><i className="bi bi-box-seam me-2"></i>Products</Nav.Link>
                        <Nav.Link className={`admin-nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><i className="bi bi-cart-check me-2"></i>Orders</Nav.Link>
                        <Nav.Link className={`admin-nav-link ${activeTab === 'activities' ? 'active' : ''}`} onClick={() => setActiveTab('activities')}><i className="bi bi-activity me-2"></i>Activity Log</Nav.Link>
                        <Nav.Link className={`admin-nav-link ${activeTab === 'livechat' ? 'active' : ''}`} onClick={() => setActiveTab('livechat')}>
                            <i className="bi bi-chat-dots me-2"></i>Live Chat
                            {chats.filter(c => !c.isRead).length > 0 && (
                                <Badge bg="danger" className="ms-1">{chats.filter(c => !c.isRead).length}</Badge>
                            )}
                        </Nav.Link>
                    </Nav>
                </Col>

                {/* Mobile tabs */}
                <Col xs={12} className="d-md-none p-2 bg-dark border-bottom border-secondary overflow-auto" style={{ whiteSpace: 'nowrap' }}>
                    <Button variant={activeTab === 'dashboard' ? 'info' : 'outline-light'} size="sm" className="me-2" onClick={() => setActiveTab('dashboard')}>Dashboard</Button>
                    <Button variant={activeTab === 'users' ? 'info' : 'outline-light'} size="sm" className="me-2" onClick={() => setActiveTab('users')}>Users</Button>
                    <Button variant={activeTab === 'products' ? 'info' : 'outline-light'} size="sm" className="me-2" onClick={() => setActiveTab('products')}>Products</Button>
                    <Button variant={activeTab === 'orders' ? 'info' : 'outline-light'} size="sm" className="me-2" onClick={() => setActiveTab('orders')}>Orders</Button>
                    <Button variant={activeTab === 'activities' ? 'info' : 'outline-light'} size="sm" className="me-2" onClick={() => setActiveTab('activities')}>Activities</Button>
                    <Button variant={activeTab === 'livechat' ? 'info' : 'outline-light'} size="sm" onClick={() => setActiveTab('livechat')}>😈 Chat</Button>
                </Col>

                {/* Main Content */}
                <Col md={10} className="admin-content p-4">
                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div>
                            <h2 className="mb-4">Dashboard Overview</h2>
                            <Row className="g-4 mb-5">
                                <Col md={4}>
                                    <Card className="admin-stat-card bg-primary text-white">
                                        <Card.Body>
                                            <Card.Title>Total Users</Card.Title>
                                            <h2>{stats.totalUsers}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="admin-stat-card bg-success text-white">
                                        <Card.Body>
                                            <Card.Title>Total Products</Card.Title>
                                            <h2>{stats.totalProducts}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="admin-stat-card bg-warning text-dark">
                                        <Card.Body>
                                            <Card.Title>Total Orders</Card.Title>
                                            <h2>{stats.totalOrders}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Card className="admin-chart-card bg-dark text-white border-secondary">
                                <Card.Body>
                                    <Card.Title>Revenue & User Growth (Mock Data)</Card.Title>
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                <Line type="monotone" dataKey="sales" stroke="#ff3366" strokeWidth={3} />
                                                <Line type="monotone" dataKey="users" stroke="#00d4ff" strokeWidth={3} />
                                                <CartesianGrid stroke="#333" strokeDasharray="5 5" />
                                                <XAxis dataKey="name" stroke="#ccc" />
                                                <YAxis stroke="#ccc" />
                                                <RechartsTooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div>
                            <h2 className="mb-4">User Management</h2>
                            <Table responsive variant="dark" hover className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <Badge bg={u.role === 'Admin' ? 'info' : 'secondary'}>{u.role}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg={u.status === 'Blocked' ? 'danger' : 'success'}>{u.status || 'Active'}</Badge>
                                            </td>
                                            <td>
                                                <Button variant="outline-light" size="sm" className="me-2" onClick={() => { setSelectedUser(u); setShowEditUser(true); }}><i className="bi bi-pencil"></i></Button>
                                                <Button variant={u.status === 'Blocked' ? 'success' : 'warning'} size="sm" className="me-2" onClick={() => toggleUserStatus(u._id, u.status || 'Active')}>{u.status === 'Blocked' ? 'Unblock' : 'Block'}</Button>
                                                <Button variant="outline-info" size="sm" className="me-2" onClick={() => toggleUserRole(u._id, u.role)}>Make {u.role === 'Admin' ? 'User' : 'Admin'}</Button>
                                                <Button variant="danger" size="sm" onClick={() => deleteUser(u._id)}><i className="bi bi-trash"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Product Management</h2>
                                <Button variant="info" onClick={() => openProductModal()}><i className="bi bi-plus-lg me-2"></i>Add Product</Button>
                            </div>
                            <Table responsive variant="dark" hover className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id}>
                                            <td><img src={Array.isArray(p.image) ? p.image[0] : (p.image || "https://via.placeholder.com/40")} alt="product" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} /></td>
                                            <td>{p.name}</td>
                                            <td>{p.category}</td>
                                            <td>₹{p.price}</td>
                                            <td>
                                                <Button variant="outline-light" size="sm" className="me-2" onClick={() => openProductModal(p)}><i className="bi bi-pencil"></i></Button>
                                                <Button variant="danger" size="sm" onClick={() => deleteProduct(p._id)}><i className="bi bi-trash"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="mb-4">Orders Overview</h2>
                            {orders.length === 0 ? <p className="text-muted">No orders found.</p> : (
                                <Table responsive variant="dark" hover className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>User Email</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <tr key={o._id}>
                                                <td>{o._id}</td>
                                                <td>{o.userEmail}</td>
                                                <td>₹{o.totalAmount}</td>
                                                <td>
                                                    <Form.Select 
                                                        size="sm" 
                                                        value={o.status} 
                                                        onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                                        style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444", width: "130px" }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </Form.Select>
                                                </td>
                                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    )}

                    {/* ACTIVITIES TAB */}
                    {activeTab === 'activities' && (
                        <div>
                            <h2 className="mb-4">Activity Log</h2>
                            {activities.length === 0 ? <p className="text-muted">No recent activities.</p> : (
                                <Table responsive variant="dark" hover className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Details</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.map(act => (
                                            <tr key={act._id}>
                                                <td className="text-info">{act.userEmail}</td>
                                                <td><Badge bg="secondary">{act.action}</Badge></td>
                                                <td>{act.details}</td>
                                                <td className="text-muted" style={{ fontSize: 13 }}>{new Date(act.timestamp).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    )}

                    {/* LIVE CHAT TAB */}
                    {activeTab === 'livechat' && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
                            <style>{`
                                .livechat-container {
                                    display: flex;
                                    flex: 1;
                                    gap: 16px;
                                    min-height: 0;
                                    overflow: hidden;
                                }
                                .chat-list-col {
                                    width: 280px;
                                    flex-shrink: 0;
                                    overflow-y: auto;
                                    border-right: 1px solid #1e1e1e;
                                    padding-right: 12px;
                                    scrollbar-width: thin;
                                    scrollbar-color: #222 transparent;
                                }
                                .chat-window-col {
                                    flex: 1;
                                    display: flex;
                                    flex-direction: column;
                                    min-width: 0;
                                    min-height: 0;
                                }
                                .chat-messages-area {
                                    flex: 1;
                                    overflow-y: auto;
                                    padding: 16px;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 10px;
                                    min-height: 0;
                                    scrollbar-width: thin;
                                    scrollbar-color: #222 transparent;
                                }
                                .chat-messages-area::-webkit-scrollbar { width: 4px; }
                                .chat-messages-area::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                                .chat-list-col::-webkit-scrollbar { width: 4px; }
                                .chat-list-col::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
                                .chat-card-item {
                                    background: #111;
                                    border: 1px solid #222;
                                    border-radius: 12px;
                                    padding: 12px;
                                    cursor: pointer;
                                    margin-bottom: 8px;
                                    transition: 0.2s;
                                }
                                .chat-card-item:hover { border-color: #333; background: #161616; }
                                .chat-card-item.active { background: #0d1a2e; border-color: #00d4ff; }
                                .chat-window-card {
                                    background: #111;
                                    border: 1px solid #1e1e1e;
                                    border-radius: 16px;
                                    display: flex;
                                    flex-direction: column;
                                    flex: 1;
                                    overflow: hidden;
                                    min-height: 0;
                                }
                                .chat-window-header {
                                    background: #0d0d1a;
                                    border-bottom: 1px solid #1e1e1e;
                                    padding: 14px 16px;
                                    flex-shrink: 0;
                                    border-radius: 16px 16px 0 0;
                                }
                                .chat-window-footer {
                                    padding: 12px;
                                    background: #0a0a0a;
                                    border-top: 1px solid #1a1a1a;
                                    flex-shrink: 0;
                                    border-radius: 0 0 16px 16px;
                                }
                                @media (max-width: 768px) {
                                    .livechat-container { flex-direction: column; }
                                    .chat-list-col {
                                        width: 100%;
                                        max-height: 200px;
                                        border-right: none;
                                        border-bottom: 1px solid #1e1e1e;
                                        padding-right: 0;
                                        padding-bottom: 10px;
                                    }
                                    .chat-window-col { min-height: 300px; }
                                }
                            `}</style>

                            <h2 className="mb-3">💬 Live Chat</h2>

                            <div className="livechat-container">
                                {/* Conversation List */}
                                <div className="chat-list-col">
                                    <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                                        Conversations ({chats.length})
                                    </div>
                                    {chats.length === 0 ? (
                                        <div className="text-center text-secondary mt-4">
                                            <div style={{ fontSize: '32px' }}>💬</div>
                                            <p style={{ fontSize: '13px' }}>No conversations yet</p>
                                        </div>
                                    ) : chats.map((chat, i) => (
                                        <div
                                            key={i}
                                            className={`chat-card-item ${selectedChat?.userEmail === chat.userEmail ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedChat(chat);
                                                Api.post('/admin/chats/read', { email: chat.userEmail });
                                                setChats(prev => prev.map(c => c.userEmail === chat.userEmail ? { ...c, isRead: true } : c));
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <div className="fw-bold text-white" style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                                                    {chat.userName || chat.userEmail}
                                                </div>
                                                {!chat.isRead && <Badge bg="danger" style={{ fontSize: '9px' }}>New</Badge>}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#666' }}>{chat.userEmail}</div>
                                            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {chat.messages?.[chat.messages.length - 1]?.text?.substring(0, 35) || '—'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chat Window */}
                                <div className="chat-window-col">
                                    {!selectedChat ? (
                                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-secondary">
                                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💬</div>
                                            <p style={{ fontSize: '14px' }}>Select a conversation to reply</p>
                                        </div>
                                    ) : (
                                        <div className="chat-window-card">
                                            <div className="chat-window-header">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                                                        👤
                                                    </div>
                                                    <div>
                                                        <div className="text-white fw-bold" style={{ fontSize: '14px' }}>{selectedChat.userName || 'User'}</div>
                                                        <div style={{ fontSize: '12px', color: '#666' }}>{selectedChat.userEmail}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="chat-messages-area" ref={chatContainerRef}>
                                                {selectedChat.messages.map((msg, i) => (
                                                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'admin' ? 'flex-end' : 'flex-start' }}>
                                                        <div style={{
                                                            maxWidth: '72%', padding: '9px 14px', borderRadius: '14px', fontSize: '13px', lineHeight: '1.5',
                                                            background: msg.from === 'admin' ? 'linear-gradient(135deg,#0099cc,#00d4ff)' : 'rgba(255,255,255,0.06)',
                                                            color: msg.from === 'admin' ? '#000' : '#e0e0e0',
                                                            border: msg.from === 'admin' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                                            borderBottomRightRadius: msg.from === 'admin' ? 4 : 14,
                                                            borderBottomLeftRadius: msg.from === 'admin' ? 14 : 4,
                                                        }}>
                                                            <div>{msg.text}</div>
                                                            <div style={{ fontSize: '10px', marginTop: '3px', opacity: 0.6, textAlign: msg.from === 'admin' ? 'right' : 'left' }}>
                                                                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="chat-window-footer">
                                                <div className="d-flex gap-2">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Type your reply and press Enter..."
                                                        value={replyText}
                                                        onChange={e => setReplyText(e.target.value)}
                                                        onKeyDown={e => e.key === 'Enter' && sendAdminReply()}
                                                        style={{ background: '#161616', border: '1px solid #2a2a2a', color: '#fff', borderRadius: '10px', fontSize: '13px' }}
                                                    />
                                                    <Button variant="info" onClick={sendAdminReply} style={{ borderRadius: '10px', minWidth: '75px', fontSize: '13px' }}>
                                                        <i className="bi bi-send-fill"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </Col>
            </Row>

            {/* Edit User Modal */}
            <Modal show={showEditUser} onHide={() => setShowEditUser(false)} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Form onSubmit={handleEditUserSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={selectedUser.name} onChange={e => setSelectedUser({...selectedUser, name: e.target.value})} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={selectedUser.email} onChange={e => setSelectedUser({...selectedUser, email: e.target.value})} required />
                            </Form.Group>
                            <Button variant="info" type="submit" className="w-100">Save Changes</Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            {/* Product Modal */}
            <Modal show={showProductModal} onHide={() => setShowProductModal(false)} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>{productForm._id ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleProductSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Subcategory</Form.Label>
                            <Form.Control type="text" value={productForm.subcategory} onChange={e => setProductForm({...productForm, subcategory: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Images (3 Links Required)</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="mb-2"
                                placeholder="Main Image URL"
                                value={productForm.image[0] || ''} 
                                onChange={e => {
                                    const newImgs = [...productForm.image];
                                    newImgs[0] = e.target.value;
                                    setProductForm({...productForm, image: newImgs});
                                }} 
                                required 
                            />
                            <Form.Control 
                                type="text" 
                                className="mb-2"
                                placeholder="Second Image URL"
                                value={productForm.image[1] || ''} 
                                onChange={e => {
                                    const newImgs = [...productForm.image];
                                    newImgs[1] = e.target.value;
                                    setProductForm({...productForm, image: newImgs});
                                }} 
                                required
                            />
                            <Form.Control 
                                type="text" 
                                placeholder="Third Image URL"
                                value={productForm.image[2] || ''} 
                                onChange={e => {
                                    const newImgs = [...productForm.image];
                                    newImgs[2] = e.target.value;
                                    setProductForm({...productForm, image: newImgs});
                                }} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} placeholder="Enter product description" />
                        </Form.Group>
                        <Button variant="info" type="submit" className="w-100">{productForm._id ? 'Update' : 'Add'} Product</Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </Container>
    );
}

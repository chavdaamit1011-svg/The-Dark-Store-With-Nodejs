import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8024' : '';
let socket = null;

const SUPPORT_OPTIONS = [
    { id: 'track', icon: '📦', label: 'Track Order', question: 'How can I track my order?', answer: 'You can track your order in the "Orders" section of your profile. Once shipped, you will also receive a tracking link via SMS and Email.' },
    { id: 'return', icon: '🔄', label: 'Returns', question: 'How do I return an item?', answer: 'We offer a 7-day hassle-free return policy. Visit your "My Orders" page, select the item, and click on "Return/Exchange". Ensure tags are intact.' },
    { id: 'shipping', icon: '🚚', label: 'Shipping', question: 'What are the shipping charges?', answer: 'We offer FREE shipping on orders above ₹999. For orders below ₹999, a flat shipping fee of ₹50 applies.' },
    { id: 'size', icon: '📏', label: 'Size Guide', question: 'Help me with sizing', answer: 'Each product has a detailed size chart. For our oversized collection, we recommend your usual size. For regular fit, you might consider sizing down.' },
    { id: 'payment', icon: '💳', label: 'Payments', question: 'What payment methods do you accept?', answer: 'We accept UPI (GPay, PhonePe), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).' },
    { id: 'offers', icon: '✨', label: 'Offers', question: 'Are there any active discounts?', answer: 'Yes! Use code DARK10 for 10% off on your first order. Check our homepage for seasonal flash sales!' },
    { id: 'chat', icon: '💬', label: 'Talk to Support', question: 'I want to speak with a human', answer: null }
];

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const [unread, setUnread] = useState(0);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    // Drag state
    const [pos, setPos] = useState({ x: null, y: null });
    const [dragging, setDragging] = useState(false);
    const [didDrag, setDidDrag] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const btnRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const u = JSON.parse(stored);
            if (u.role === 'Admin') return;
            setUser(u);
            socket = io(SOCKET_URL);
            socket.emit('join_room', u.email);
            fetch(`${SOCKET_URL}/chat/${u.email}`)
                .then(r => r.json())
                .then(data => { if (data.success) setMessages(data.messages || []); });
            socket.on('admin_message', ({ message }) => {
                setMessages(prev => [...prev, message]);
                if (!open) setUnread(n => n + 1);
            });
        }
        return () => { if (socket) socket.disconnect(); };
    }, []);

    useEffect(() => {
        if (open) {
            setUnread(0);
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 150);
        }
    }, [open, messages]);

    const sendMessage = (textOverride) => {
        // Fix: Ensure we check if textOverride is a string, not an Event object
        const isInternal = typeof textOverride === 'string';
        const text = isInternal ? textOverride : input.trim();
        
        if (!text || !user) return;

        const msg = { from: 'user', text, time: new Date() };
        setMessages(prev => [...prev, msg]);
        
        if (!isInternal) {
            socket.emit('user_message', { userEmail: user.email, userName: user.name || user.email, text });
            setInput('');
        }
    };

    const handleOptionClick = (opt) => {
        setShowMenu(false);
        sendMessage(opt.question);

        if (opt.answer) {
            setIsBotTyping(true);
            setTimeout(() => {
                const botMsg = { from: 'admin', text: opt.answer, time: new Date(), isBot: true };
                setMessages(prev => [...prev, botMsg]);
                setIsBotTyping(false);
            }, 1000);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault(); 
            setShowMenu(false);
            sendMessage(); 
        }
    };

    // Drag handlers
    const onPointerDown = (e) => {
        e.preventDefault();
        const rect = btnRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
        setDragging(true);
        setDidDrag(false);
    };

    useEffect(() => {
        if (!dragging) return;
        const onMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = Math.max(0, Math.min(clientX - dragOffset.current.x, window.innerWidth - 56));
            const y = Math.max(0, Math.min(clientY - dragOffset.current.y, window.innerHeight - 56));
            setPos({ x, y });
            setDidDrag(true);
        };
        const onUp = () => setDragging(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [dragging]);

    const handleBtnClick = () => { if (!didDrag) setOpen(o => !o); };

    if (!user) return null;

    // Button position — default: bottom-LEFT (avoids overlap with scroll-to-top at bottom-right)
    const btnBottom = pos.x !== null ? null : 28;
    const btnLeft_def = pos.x !== null ? null : 25;
    const btnLeft = pos.x !== null ? pos.x : btnLeft_def;
    const btnTop = pos.x !== null ? pos.y : null;

    // Chat popup: opens ABOVE the button
    const popupBottom = pos.x !== null ? null : 96;
    const popupLeft_def = pos.x !== null ? null : 25;
    const popupLeft = pos.x !== null ? Math.min(pos.x, window.innerWidth - 340) : popupLeft_def;
    const popupTop = pos.x !== null ? Math.max(8, pos.y - 470) : null;

    const fmt = (t) => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <style>{`
                /* ─── BUTTON ─────────────────────────────────────────── */
                .cw-btn-wrap {
                    position: fixed !important;
                    z-index: 10001 !important;
                    touch-action: none;
                    user-select: none;
                    bottom: 28px;
                    left: 25px;
                }

                .cw-btn {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0a0a14;
                    box-shadow:
                        0 0 0 1.5px rgba(99,179,237,0.35),
                        0 4px 20px rgba(0,0,0,0.6),
                        0 0 32px rgba(99,179,237,0.18);
                    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
                    position: relative;
                    overflow: visible;
                }

                .cw-btn:hover {
                    transform: scale(1.1);
                    box-shadow:
                        0 0 0 2px rgba(99,179,237,0.55),
                        0 6px 28px rgba(0,0,0,0.7),
                        0 0 48px rgba(99,179,237,0.28);
                }

                .cw-btn:active { transform: scale(0.96); }

                /* Subtle breathing ring */
                .cw-ring {
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(99,179,237,0.3);
                    animation: cwRingBreath 3s ease-in-out infinite;
                    pointer-events: none;
                }
                @keyframes cwRingBreath {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50%       { opacity: 0.8; transform: scale(1.08); }
                }

                /* Unread badge */
                .cw-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #f56565;
                    color: #fff;
                    font-size: 9px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #050509;
                    z-index: 1;
                }

                /* ─── CHAT POPUP ─────────────────────────────────────── */
                .cw-popup {
                    position: fixed;
                    width: 320px;
                    height: 440px;
                    background: #0c0c16;
                    border: 1px solid rgba(99,179,237,0.15);
                    border-radius: 18px;
                    display: flex;
                    flex-direction: column;
                    z-index: 10000;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(99,179,237,0.08);
                    overflow: hidden;
                    animation: cwPopIn 0.22s cubic-bezier(0.16,1,0.3,1);
                    transform-origin: bottom right;
                }

                @keyframes cwPopIn {
                    from { opacity: 0; transform: scale(0.92) translateY(10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }

                @media (max-width: 400px) {
                    .cw-popup {
                        width: calc(100vw - 24px) !important;
                        height: 72vh !important;
                        left: 12px !important;
                        right: auto !important;
                        bottom: 90px !important;
                        top: auto !important;
                    }
                    .cw-btn-wrap {
                        bottom: 20px !important;
                        left: 16px !important;
                    }
                }

                /* ─── HEADER ─────────────────────────────────────────── */
                .cw-header {
                    padding: 13px 15px;
                    background: #0e0e1c;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                }

                .cw-hdr-left { display: flex; align-items: center; gap: 10px; }

                .cw-avatar {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: radial-gradient(circle at 35% 35%, #1a3a5c, #0a0a14);
                    border: 1.5px solid rgba(99,179,237,0.3);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }

                .cw-title { color: #f0f0f0; font-weight: 700; font-size: 13px; line-height: 1.2; }
                .cw-subtitle { display: flex; align-items: center; gap: 5px; color: #63b3ed; font-size: 11px; margin-top: 1px; }
                .cw-dot { width: 6px; height: 6px; border-radius: 50%; background: #48bb78; animation: cwBlink 1.8s infinite; }
                @keyframes cwBlink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

                .cw-close {
                    width: 26px; height: 26px; border-radius: 8px;
                    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
                    color: #666; font-size: 13px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; transition: 0.18s;
                }
                .cw-close:hover { background: rgba(255,255,255,0.08); color: #ccc; }

                /* ─── MESSAGES ───────────────────────────────────────── */
                .cw-messages {
                    flex: 1; overflow-y: auto; padding: 12px 11px;
                    display: flex; flex-direction: column; gap: 8px;
                    scrollbar-width: thin; scrollbar-color: #1e1e2e transparent;
                    min-height: 0;
                }
                .cw-messages::-webkit-scrollbar { width: 3px; }
                .cw-messages::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 3px; }

                .cw-bubble-row { display: flex; flex-direction: column; }
                .cw-bubble-row.user  { align-items: flex-end; }
                .cw-bubble-row.admin { align-items: flex-start; }

                .cw-bubble {
                    max-width: 80%; padding: 9px 13px; border-radius: 16px;
                    font-size: 13px; line-height: 1.5; word-break: break-word;
                }
                .cw-bubble.user {
                    background: linear-gradient(135deg, #2b6cb0, #63b3ed);
                    color: #fff; border-bottom-right-radius: 3px;
                    box-shadow: 0 2px 10px rgba(99,179,237,0.2);
                }
                .cw-bubble.admin {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.07);
                    color: #dde; border-bottom-left-radius: 3px;
                }
                .cw-time { font-size: 10px; color: #555; margin-top: 3px; padding: 0 2px; }

                /* Empty state */
                .cw-empty {
                    flex: 1; display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    gap: 8px; padding: 20px; text-align: center;
                }
                .cw-empty-icon {
                    width: 52px; height: 52px; border-radius: 50%;
                    background: radial-gradient(circle, #1a3a5c 0%, #0a0a14 80%);
                    border: 1.5px solid rgba(99,179,237,0.2);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 6px;
                }

                /* ─── INPUT ──────────────────────────────────────────── */
                .cw-input-row {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 11px; background: #080810;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    flex-shrink: 0;
                }
                .cw-input {
                    flex: 1; background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 10px; color: #eee; padding: 9px 13px;
                    font-size: 13px; outline: none; resize: none;
                    max-height: 80px; font-family: inherit; transition: border-color 0.2s;
                    scrollbar-width: thin;
                }
                .cw-input:focus { border-color: rgba(99,179,237,0.4); }
                .cw-input::placeholder { color: #3a3a4a; }

                .cw-send {
                    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
                    background: linear-gradient(135deg, #2b6cb0, #63b3ed);
                    border: none; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: transform 0.18s, box-shadow 0.18s;
                }
                .cw-send:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(99,179,237,0.35); }
                .cw-send svg { width: 15px; height: 15px; }

                /* ─── OPTIONS GRID ───────────────────────────────────── */
                .cw-opt-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                    padding: 10px;
                    margin-top: 10px;
                }
                .cw-opt-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    transition: 0.2s;
                    text-align: center;
                }
                .cw-opt-card:hover {
                    background: rgba(99,179,237,0.08);
                    border-color: rgba(99,179,237,0.25);
                    transform: translateY(-2px);
                }
                .cw-opt-icon { font-size: 18px; }
                .cw-opt-label { font-size: 11px; color: #ccc; font-weight: 500; }

                .cw-opt-card.full { grid-column: span 2; flex-direction: row; justify-content: center; gap: 10px; }

                /* ─── TYPING INDICATOR ───────────────────────────────── */
                .cw-typing {
                    display: flex; gap: 4px; padding: 10px 15px;
                    background: rgba(255,255,255,0.05); border-radius: 16px;
                    width: fit-content; margin-bottom: 10px;
                }
                .cw-dot-anim {
                    width: 6px; height: 6px; background: #63b3ed; border-radius: 50%;
                    animation: cwBounce 1.4s infinite ease-in-out;
                }
                .cw-dot-anim:nth-child(2) { animation-delay: 0.2s; }
                .cw-dot-anim:nth-child(3) { animation-delay: 0.4s; }
                @keyframes cwBounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>

            {/* ── Draggable Button ── */}
            <div
                ref={btnRef}
                className="cw-btn-wrap"
                style={{
                    bottom: btnBottom !== null ? btnBottom : undefined,
                    left:   btnLeft   !== null ? btnLeft   : undefined,
                    top:    btnTop    !== null ? btnTop    : undefined,
                    cursor: dragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={onPointerDown}
                onTouchStart={onPointerDown}
            >
                <button className="cw-btn" onClick={handleBtnClick} title="Chat with Support">
                    <div className="cw-ring" />
                    {/* Clean chat bubble icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 2C6.48 2 2 6.02 2 11c0 2.52 1.11 4.8 2.9 6.44L4 21l4.2-1.76A10.2 10.2 0 0 0 12 20c5.52 0 10-4.02 10-9s-4.48-9-10-9z"
                            fill="none"
                            stroke="#63b3ed"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                        />
                        <circle cx="8.5" cy="11" r="1.2" fill="#63b3ed" />
                        <circle cx="12" cy="11" r="1.2" fill="#63b3ed" />
                        <circle cx="15.5" cy="11" r="1.2" fill="#63b3ed" />
                    </svg>
                    {unread > 0 && <span className="cw-badge">{unread}</span>}
                </button>
            </div>

            {/* ── Chat Popup — opens ABOVE button ── */}
            {open && (
                <div
                    className="cw-popup"
                    style={{
                        bottom: popupBottom !== null ? popupBottom : undefined,
                        left:   popupLeft   !== null ? popupLeft   : undefined,
                        top:    popupTop    !== null ? popupTop    : undefined,
                    }}
                >
                    {/* Header */}
                    <div className="cw-header">
                        <div className="cw-hdr-left">
                            <div className="cw-avatar">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C6.48 2 2 6.02 2 11c0 2.52 1.11 4.8 2.9 6.44L4 21l4.2-1.76A10.2 10.2 0 0 0 12 20c5.52 0 10-4.02 10-9s-4.48-9-10-9z"
                                        fill="none" stroke="#63b3ed" strokeWidth="1.8" strokeLinejoin="round"/>
                                    <circle cx="8.5" cy="11" r="1.3" fill="#63b3ed"/>
                                    <circle cx="12" cy="11" r="1.3" fill="#63b3ed"/>
                                    <circle cx="15.5" cy="11" r="1.3" fill="#63b3ed"/>
                                </svg>
                            </div>
                            <div>
                                <div className="cw-title">Dark Store Support</div>
                                <div className="cw-subtitle">
                                    <span className="cw-dot" />
                                    Online — replies quickly
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button 
                                className="cw-close" 
                                title="Help Options" 
                                onClick={() => setShowMenu(!showMenu)}
                                style={{ color: showMenu ? '#63b3ed' : '#666' }}
                            >
                                ❓
                            </button>
                            <button className="cw-close" onClick={() => setOpen(false)}>✕</button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="cw-messages">
                        {showMenu ? (
                            <div className="cw-empty">
                                <div className="cw-empty-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C6.48 2 2 6.02 2 11c0 2.52 1.11 4.8 2.9 6.44L4 21l4.2-1.76A10.2 10.2 0 0 0 12 20c5.52 0 10-4.02 10-9s-4.48-9-10-9z"
                                            fill="none" stroke="#63b3ed" strokeWidth="1.8"/>
                                        <circle cx="8.5" cy="11" r="1.3" fill="#63b3ed"/>
                                        <circle cx="12" cy="11" r="1.3" fill="#63b3ed"/>
                                        <circle cx="15.5" cy="11" r="1.3" fill="#63b3ed"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#bbb', fontSize: '14px', fontWeight: 600 }}>
                                    Hi {user?.name?.split(' ')[0] || 'there'} 👋
                                </div>
                                <div style={{ color: '#555', fontSize: '12px', lineHeight: 1.6, marginBottom: '10px' }}>
                                    How can we help you today?
                                </div>

                                <div className="cw-opt-grid">
                                    {SUPPORT_OPTIONS.map((opt) => (
                                        <div 
                                            key={opt.id} 
                                            className={`cw-opt-card ${opt.id === 'chat' ? 'full' : ''}`}
                                            onClick={() => handleOptionClick(opt)}
                                        >
                                            <span className="cw-opt-icon">{opt.icon}</span>
                                            <span className="cw-opt-label">{opt.label}</span>
                                        </div>
                                    ))}
                                </div>
                                {messages.length > 0 && (
                                    <button 
                                        onClick={() => setShowMenu(false)}
                                        style={{ 
                                            background: 'none', border: 'none', color: '#63b3ed', 
                                            fontSize: '11px', marginTop: '15px', cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Back to conversation
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {messages.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#555', fontSize: '12px' }}>
                                        No messages yet. Use the help options or start typing.
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`cw-bubble-row ${msg.from}`}>
                                        <div className={`cw-bubble ${msg.from}`}>{msg.text}</div>
                                        <div className="cw-time">{fmt(msg.time)}</div>
                                    </div>
                                ))}
                                {isBotTyping && (
                                    <div className="cw-typing">
                                        <div className="cw-dot-anim" />
                                        <div className="cw-dot-anim" />
                                        <div className="cw-dot-anim" />
                                    </div>
                                )}
                                {!isBotTyping && messages.length > 0 && messages[messages.length-1].from === 'admin' && (
                                    <button 
                                        onClick={() => setShowMenu(true)}
                                        style={{ 
                                            alignSelf: 'center', background: 'rgba(99,179,237,0.1)', 
                                            border: '1px solid rgba(99,179,237,0.2)', color: '#63b3ed', 
                                            fontSize: '11px', padding: '6px 12px', borderRadius: '20px',
                                            marginTop: '10px', cursor: 'pointer', transition: '0.2s'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = 'rgba(99,179,237,0.2)'}
                                        onMouseOut={(e) => e.target.style.background = 'rgba(99,179,237,0.1)'}
                                    >
                                        View more help options ❓
                                    </button>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="cw-input-row">
                        <textarea
                            className="cw-input"
                            rows={1}
                            placeholder="Type a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button className="cw-send" onClick={sendMessage} title="Send">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 2L15 22L11 13L2 9L22 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

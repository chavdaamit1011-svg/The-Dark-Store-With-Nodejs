import React, { useState } from 'react';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [activeUser, setActiveUser] = useState(null);
  
  // Checking active session
  React.useEffect(() => {
     const storedUser = localStorage.getItem('user');
     if(storedUser) setActiveUser(JSON.parse(storedUser));
  }, []);

  const [view, setView] = useState('login'); // 'login', 'register', 'forgot', 'verify', 'reset'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const showMessage = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 4000);
  };

  // HANDLERS
  const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await Api.post('/register', { name, email, password });
          if(res.data.success) {
              showMessage('success', res.data.message);
              setView('login');
              setPassword('');
          } else {
              showMessage('error', res.data.message);
          }
      } catch (err) {
          showMessage('error', "Server error during registration.");
      }
      setLoading(false);
  };

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await Api.post('/login', { name, password });
          if(res.data.success) {
              localStorage.setItem('user', JSON.stringify(res.data.user));
              setActiveUser(res.data.user);
              showMessage('success', 'Logged in successfully!');
              
              setTimeout(() => {
                  window.location.href = "/";
              }, 1200);
          } else {
              showMessage('error', res.data.message);
          }
      } catch (err) {
          showMessage('error', "Login failed.");
      }
      setLoading(false);
  };

  const handleForgot = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await Api.post('/forgot-password', { email });
          if(res.data.success) {
              showMessage('success', 'OTP sent to your email!');
              setView('verify');
          } else {
              showMessage('error', res.data.message);
          }
      } catch (err) {
          showMessage('error', "Failed to request OTP.");
      }
      setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await Api.post('/verify-otp', { email, otp });
          if(res.data.success) {
              showMessage('success', 'OTP Verified successfully!');
              setView('reset');
          } else {
              showMessage('error', res.data.message);
          }
      } catch (err) {
          showMessage('error', "Failed to verify OTP.");
      }
      setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await Api.post('/update-password', { email, newPassword });
          if(res.data.success) {
              showMessage('success', 'Password updated successfully!');
              setView('login');
              setPassword('');
              setNewPassword('');
          } else {
              showMessage('error', res.data.message);
          }
      } catch (err) {
          showMessage('error', "Failed to update password.");
      }
      setLoading(false);
  };

  return (
    <>
      <style>{`
        body {
            background-color: #050505;
            color: #fff;
            overflow-x: hidden;
        }

        .auth-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            padding: 20px;
        }

        .auth-card {
            background: rgba(17, 17, 17, 0.7);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            width: 100%;
            max-width: 450px;
            padding: 40px;
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.05);
            animation: formFadeIn 0.5s ease forwards;
            position: relative;
        }

        @keyframes formFadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .auth-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 5px;
            text-align: center;
        }

        .auth-subtitle {
            font-size: 14px;
            color: #aaa;
            text-align: center;
            margin-bottom: 30px;
        }

        .auth-input-group {
            margin-bottom: 20px;
            position: relative;
        }

        .auth-input {
            width: 100%;
            background: #0d0d0d;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 15px 15px 15px 45px;
            color: white;
            font-size: 15px;
            transition: all 0.3s;
        }

        .auth-input:focus {
            outline: none;
            border-color: #00d4ff;
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.15);
        }

        .auth-input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #777;
            transition: 0.3s;
        }

        .auth-input:focus + .auth-input-icon {
            color: #00d4ff;
        }

        .auth-btn {
            width: 100%;
            background: #00d4ff;
            color: #000;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            position: relative;
            overflow: hidden;
            margin-top: 10px;
        }

        .auth-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
            background: #00e0ff;
        }

        .auth-btn:disabled {
            background: #333;
            color: #888;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .auth-links {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
            font-size: 14px;
        }

        .auth-link {
            color: #00d4ff;
            cursor: pointer;
            text-decoration: none;
            transition: 0.3s;
        }

        .auth-link:hover {
            text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
        }

        .auth-alert {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
            animation: slideDown 0.3s ease forwards;
        }

        .auth-alert.error {
            background: rgba(255, 51, 102, 0.1);
            color: #ff3366;
            border: 1px solid rgba(255, 51, 102, 0.3);
        }

        .auth-alert.success {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
            border: 1px solid rgba(0, 212, 255, 0.3);
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="auth-wrapper">
          <div className="auth-card" key={view}>
              {msg.text && (
                  <div className={`auth-alert ${msg.type}`}>
                      {msg.text}
                  </div>
              )}

              {/* 🔥 ACTIVE SESSION DASHBOARD */}
              {activeUser ? (
                  <div style={{ textAlign: 'center', animation: 'formFadeIn 0.5s ease' }}>
                    <i className="bi bi-person-check-fill" style={{ fontSize: '40px', color: '#00d4ff' }}></i>
                    <h2 className="auth-title mt-3">Hello, {activeUser.name}</h2>
                    <p className="auth-subtitle my-3">You are securely logged in to your account.</p>
                    <button 
                        className="auth-btn" 
                        style={{ marginTop: '20px', background: 'rgba(255,51,102,0.1)', color: '#ff3366', border: '1px solid #ff3366' }}
                        onClick={() => { 
                            localStorage.removeItem('user'); 
                            localStorage.removeItem('cart'); 
                            localStorage.removeItem('wishlist'); 
                            window.location.href = "/"; 
                        }}
                    >
                        Secure Logout
                    </button>
                 </div>
              ) : (
                  <>
                  {/* 🔥 LOGIN VIEW */}
                  {view === 'login' && (
                  <form onSubmit={handleLogin}>
                      <h2 className="auth-title">Welcome Back</h2>
                      <p className="auth-subtitle">Login to access your premium account</p>
                      
                      <div className="auth-input-group">
                          <input type="text" placeholder="Username" className="auth-input" required
                                 value={name} onChange={(e) => setName(e.target.value)} />
                          <i className="bi bi-person auth-input-icon"></i>
                      </div>

                      <div className="auth-input-group">
                          <input type="password" placeholder="Password" className="auth-input" required
                                 value={password} onChange={(e) => setPassword(e.target.value)} />
                          <i className="bi bi-lock auth-input-icon"></i>
                      </div>

                      <button type="submit" className="auth-btn" disabled={loading}>
                          {loading ? 'Processing...' : 'Login Now'}
                      </button>

                      <div className="auth-links">
                          <span className="auth-link" onClick={() => setView('forgot')}>Forgot Password?</span>
                          <span className="auth-link" onClick={() => setView('register')}>Create Account</span>
                      </div>
                  </form>
              )}

              {/* 🔥 REGISTER VIEW */}
              {view === 'register' && (
                  <form onSubmit={handleRegister}>
                      <h2 className="auth-title">Create Account</h2>
                      <p className="auth-subtitle">Join us to shop premium models</p>
                      
                      <div className="auth-input-group">
                          <input type="text" placeholder="Username" className="auth-input" required
                                 value={name} onChange={(e) => setName(e.target.value)} />
                          <i className="bi bi-person auth-input-icon"></i>
                      </div>

                      <div className="auth-input-group">
                          <input type="email" placeholder="Email Address" className="auth-input" required
                                 value={email} onChange={(e) => setEmail(e.target.value)} />
                          <i className="bi bi-envelope auth-input-icon"></i>
                      </div>

                      <div className="auth-input-group">
                          <input type="password" placeholder="Password" className="auth-input" required
                                 value={password} onChange={(e) => setPassword(e.target.value)} />
                          <i className="bi bi-lock auth-input-icon"></i>
                      </div>

                      <button type="submit" className="auth-btn" disabled={loading}>
                          {loading ? 'Processing...' : 'Sign Up'}
                      </button>

                      <div className="auth-links" style={{ justifyContent: 'center' }}>
                          <span className="auth-link" onClick={() => setView('login')}>Already have an account? Login</span>
                      </div>
                  </form>
              )}

              {/* 🔥 FORGOT PASSWORD (STEP 1) */}
              {view === 'forgot' && (
                  <form onSubmit={handleForgot}>
                      <h2 className="auth-title">Reset Password</h2>
                      <p className="auth-subtitle">Enter your email to receive an OTP</p>
                      
                      <div className="auth-input-group">
                          <input type="email" placeholder="Email pattern" className="auth-input" required
                                 value={email} onChange={(e) => setEmail(e.target.value)} />
                          <i className="bi bi-envelope auth-input-icon"></i>
                      </div>

                      <button type="submit" className="auth-btn" disabled={loading}>
                          {loading ? 'Processing...' : 'Send OTP'}
                      </button>

                      <div className="auth-links" style={{ justifyContent: 'center' }}>
                          <span className="auth-link" onClick={() => setView('login')}>Back to Login</span>
                      </div>
                  </form>
              )}

              {/* 🔥 VERIFY OTP (STEP 2) */}
              {view === 'verify' && (
                  <form onSubmit={handleVerifyOtp}>
                      <h2 className="auth-title">Verify OTP</h2>
                      <p className="auth-subtitle">Enter the 4-digit code sent to {email}</p>
                      
                      <div className="auth-input-group">
                          <input type="number" placeholder="Enter OTP" className="auth-input" required
                                 value={otp} onChange={(e) => setOtp(e.target.value)} />
                          <i className="bi bi-shield-lock auth-input-icon"></i>
                      </div>

                      <button type="submit" className="auth-btn" disabled={loading}>
                          {loading ? 'Processing...' : 'Verify Code'}
                      </button>

                      <div className="auth-links" style={{ justifyContent: 'center' }}>
                          <span className="auth-link" onClick={() => setView('forgot')}>Wrong email? Try again</span>
                      </div>
                  </form>
              )}

              {/* 🔥 RESET PASSWORD (STEP 3) */}
              {view === 'reset' && (
                  <form onSubmit={handleUpdatePassword}>
                      <h2 className="auth-title">New Security</h2>
                      <p className="auth-subtitle">Type in your brand new password</p>
                      
                      <div className="auth-input-group">
                          <input type="password" placeholder="New Password" className="auth-input" required
                                 value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                          <i className="bi bi-lock auth-input-icon"></i>
                      </div>

                      <button type="submit" className="auth-btn" disabled={loading}>
                          {loading ? 'Processing...' : 'Update Password'}
                      </button>
                  </form>
              )}
              </>
              )}

          </div>
      </div>
    </>
  )
}

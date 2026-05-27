import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import axios from 'axios';

import { API_URL } from '../../config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/admin/login`, { username, password });
            adminLogin(res.data.token, res.data.username);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid admin credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--crm-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background glow effects */}
            <div style={{
                position: 'absolute', top: '-150px', left: '-150px',
                width: '400px', height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '-150px', right: '-150px',
                width: '400px', height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                width: '100%',
                maxWidth: '420px',
                backgroundColor: 'var(--crm-sidebar)',
                borderRadius: '24px',
                border: '1px solid var(--crm-border)',
                padding: '48px 40px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '64px', height: '64px',
                        backgroundColor: 'rgba(16,185,129,0.12)',
                        borderRadius: '18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '1px solid rgba(16,185,129,0.25)'
                    }}>
                        <Shield size={32} color="#10b981" />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--crm-text)', marginBottom: '6px' }}>
                        PRIVACY.OS
                    </h1>
                    <p style={{ fontSize: '13px', color: 'var(--crm-text-light)' }}>
                        Admin access requires authentication
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        backgroundColor: 'rgba(244,63,94,0.1)',
                        border: '1px solid rgba(244,63,94,0.3)',
                        borderRadius: '12px', padding: '12px 16px',
                        marginBottom: '20px'
                    }}>
                        <AlertCircle size={16} color="#f43f5e" />
                        <span style={{ fontSize: '13px', color: '#f43f5e', fontWeight: '600' }}>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Username */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--crm-text-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Admin Username
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={16} color="var(--crm-text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                id="admin-login-username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter admin username"
                                autoComplete="username"
                                style={{
                                    width: '100%',
                                    padding: '13px 14px 13px 42px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--crm-border)',
                                    backgroundColor: 'var(--crm-bg)',
                                    color: 'var(--crm-text)',
                                    fontSize: '14px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#10b981'}
                                onBlur={e => e.target.style.borderColor = 'var(--crm-border)'}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--crm-text-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} color="var(--crm-text-light)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                id="admin-login-password"
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                autoComplete="current-password"
                                style={{
                                    width: '100%',
                                    padding: '13px 46px 13px 42px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--crm-border)',
                                    backgroundColor: 'var(--crm-bg)',
                                    color: 'var(--crm-text)',
                                    fontSize: '14px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#10b981'}
                                onBlur={e => e.target.style.borderColor = 'var(--crm-border)'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(p => !p)}
                                style={{
                                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crm-text-light)',
                                    padding: '2px', display: 'flex', alignItems: 'center'
                                }}
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        id="admin-login-submit"
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '6px',
                            padding: '14px',
                            borderRadius: '12px',
                            background: loading ? 'var(--crm-border)' : 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '700',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {loading ? (
                            <>
                                <span style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <Shield size={16} />
                                Access Dashboard
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '28px', padding: '16px', backgroundColor: 'var(--crm-bg)', borderRadius: '12px', border: '1px solid var(--crm-border)' }}>
                    <p style={{ fontSize: '11px', color: 'var(--crm-text-light)', textAlign: 'center', lineHeight: '1.6' }}>
                        🔒 This portal is restricted to authorized personnel only.<br />
                        All access attempts are logged and monitored.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminLogin;

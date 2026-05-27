import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Activity, Shield,
    LogOut, Bell, Search, User, Menu, X, AlertCircle
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { logs, searchQuery, setSearchQuery } = usePrivacy();
    const { adminUser, adminLogout } = useAdminAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);

    // Critical alerts for notifications
    const criticalLogs = logs.filter(l => l.sensitivity === 'CRITICAL').slice(0, 8);
    const unreadCount = criticalLogs.length;

    // Close notification dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleLogout = () => {
        adminLogout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout-root">
            {/* Dark overlay — always in DOM, shown via CSS + state */}
            <div
                className={`sidebar-overlay${sidebarOpen ? ' overlay-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Shield size={20} color="#fff" />
                        </div>
                        <span style={{ fontWeight: '800', fontSize: '18px', color: 'var(--crm-text)', letterSpacing: '-0.5px' }}>PRIVACY.OS</span>
                    </div>
                    <button
                        className="sidebar-close-btn"
                        onClick={() => setSidebarOpen(false)}
                        style={{ background: 'none', border: 'none', color: 'var(--crm-text-light)', cursor: 'pointer', padding: '4px' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SidebarLink to="/admin" icon={<LayoutDashboard size={18} />} label="Overview" onClick={() => setSidebarOpen(false)} />
                    <SidebarLink to="/" icon={<Activity size={18} />} label="Back to Store" onClick={() => setSidebarOpen(false)} />
                </nav>

                <div style={{ marginTop: 'auto', padding: '20px', backgroundColor: 'var(--crm-bg)', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--crm-border)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={24} color="var(--crm-text-light)" />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{adminUser || 'Admin'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--crm-text-light)', marginBottom: '4px' }}>Security Lead</p>
                    <button
                        onClick={handleLogout}
                        style={{ marginTop: '12px', width: '100%', padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', color: '#f43f5e', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="admin-main-content">
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Hamburger — hidden on desktop via CSS, shown on mobile */}
                        <button
                            className="hamburger-btn"
                            onClick={() => setSidebarOpen(true)}
                            style={{ background: 'none', border: 'none', color: 'var(--crm-text)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: 'clamp(16px, 4vw, 26px)', fontWeight: '800', color: 'var(--crm-text)', lineHeight: 1.2, margin: 0 }}>Privacy Command Center</h1>
                            <p style={{ color: 'var(--crm-text-light)', fontSize: '13px', margin: 0 }}>Real-time NDPA 2023 compliance monitoring</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                        {/* Search bar — hidden on small mobile via CSS */}
                        <div style={{ position: 'relative' }} className="admin-search-wrap">
                            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} size={15} color="var(--crm-text-light)" />
                            <input
                                id="admin-search-input"
                                type="text"
                                placeholder="Search logs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '9px 14px 9px 38px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--crm-border)',
                                    backgroundColor: 'var(--input-bg)',
                                    color: 'var(--crm-text)',
                                    fontSize: '13px',
                                    width: '200px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--crm-border)'}
                            />
                        </div>

                        {/* Notifications Bell */}
                        <div style={{ position: 'relative' }} ref={notifRef}>
                            <button
                                id="admin-notif-btn"
                                onClick={() => setNotifOpen(o => !o)}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    backgroundColor: 'var(--crm-sidebar)', border: '1px solid var(--crm-border)',
                                    color: 'var(--crm-text)', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', cursor: 'pointer', position: 'relative',
                                    transition: 'all 0.2s', flexShrink: 0
                                }}
                            >
                                <Bell size={17} />
                                {unreadCount > 0 && (
                                    <span style={{
                                        position: 'absolute', top: '-4px', right: '-4px',
                                        backgroundColor: '#f43f5e', color: '#fff',
                                        fontSize: '9px', fontWeight: 'bold',
                                        width: '16px', height: '16px',
                                        borderRadius: '50%', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {notifOpen && (
                                <div style={{
                                    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
                                    width: '300px', backgroundColor: 'var(--crm-sidebar)',
                                    border: '1px solid var(--crm-border)', borderRadius: '16px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                    zIndex: 200, overflow: 'hidden'
                                }}>
                                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--crm-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '700', fontSize: '13px' }}>Critical Alerts</span>
                                        <span style={{ fontSize: '11px', color: 'var(--crm-text-light)' }}>{unreadCount} total</span>
                                    </div>
                                    <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                                        {criticalLogs.length === 0 ? (
                                            <p style={{ padding: '20px', textAlign: 'center', color: 'var(--crm-text-light)', fontSize: '13px' }}>
                                                No critical alerts 🎉
                                            </p>
                                        ) : (
                                            criticalLogs.map((log) => (
                                                <div
                                                    key={log._id}
                                                    style={{
                                                        padding: '11px 16px', borderBottom: '1px solid var(--crm-border)',
                                                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                                                        cursor: 'default'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--crm-bg)'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', backgroundColor: 'rgba(244,63,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <AlertCircle size={13} color="#f43f5e" />
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ fontWeight: '700', fontSize: '12px', color: 'var(--crm-text)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.event}</p>
                                                        <p style={{ fontSize: '11px', color: 'var(--crm-text-light)' }}>{log.user?.name} · Risk {log.riskScore}/10</p>
                                                    </div>
                                                    <span style={{ fontSize: '10px', color: 'var(--crm-text-light)', flexShrink: 0 }}>
                                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => setNotifOpen(false)}
                                            style={{ fontSize: '12px', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <Outlet />
            </div>

            <style>{`
                .admin-layout-root {
                    display: flex;
                    min-height: 100vh;
                    background-color: var(--crm-bg);
                    color: var(--crm-text);
                    position: relative;
                }

                /* ── Overlay ── */
                .sidebar-overlay {
                    display: none;
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0,0,0,0.55);
                    z-index: 98;
                    transition: opacity 0.3s;
                }

                /* ── Sidebar ── */
                .admin-sidebar {
                    width: 260px;
                    background-color: var(--crm-sidebar);
                    border-right: 1px solid var(--crm-border);
                    padding: 28px 18px;
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    position: fixed;
                    height: 100vh;
                    z-index: 100;
                    transition: transform 0.3s ease;
                    overflow-y: auto;
                    top: 0;
                    left: 0;
                }

                .sidebar-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 6px;
                }

                /* Close X button — hidden on desktop */
                .sidebar-close-btn {
                    display: none;
                }

                /* ── Main Content ── */
                .admin-main-content {
                    flex: 1;
                    margin-left: 260px;
                    padding: 36px 40px;
                    min-width: 0;
                }

                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 36px;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                /* Hamburger — hidden on desktop */
                .hamburger-btn {
                    display: none;
                }

                /* ── Tablet ── */
                @media (max-width: 1024px) {
                    .admin-main-content {
                        padding: 24px;
                    }
                    .admin-search-wrap input {
                        width: 160px !important;
                    }
                }

                /* ── Mobile ── */
                @media (max-width: 768px) {
                    .admin-sidebar {
                        transform: translateX(-100%);
                    }
                    .admin-sidebar.sidebar-open {
                        transform: translateX(0);
                        box-shadow: 4px 0 30px rgba(0,0,0,0.4);
                    }
                    .sidebar-close-btn {
                        display: flex !important;
                        align-items: center;
                    }
                    .sidebar-overlay.overlay-active {
                        display: block;
                    }
                    .admin-main-content {
                        margin-left: 0;
                        padding: 16px;
                    }
                    .hamburger-btn {
                        display: flex !important;
                        align-items: center;
                    }
                    .admin-header {
                        margin-bottom: 20px;
                    }
                }

                @media (max-width: 560px) {
                    .admin-search-wrap {
                        display: none;
                    }
                    .admin-header {
                        gap: 8px;
                    }
                }

                @media (max-width: 480px) {
                    .admin-main-content {
                        padding: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

const SidebarLink = ({ to, icon, label, onClick }) => (
    <NavLink to={to} end onClick={onClick} style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '13px 16px',
        borderRadius: '12px',
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
        color: isActive ? '#10b981' : 'var(--crm-text-light)',
        fontWeight: isActive ? '700' : '500',
        textDecoration: 'none',
        transition: 'all 0.2s ease-in-out'
    })}>
        {icon}
        <span style={{ fontSize: '14px' }}>{label}</span>
    </NavLink>
);

export default AdminLayout;

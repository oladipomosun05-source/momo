import React from 'react';
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    Sun,
    Moon
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { usePrivacy } from '../../context/PrivacyContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onCartClick }) => {
    const { totalItems } = useCart();
    const { activeUser, logout } = usePrivacy();
    const { theme, toggleTheme } = useTheme();

    const isDarkMode = theme === 'dark';

    return (
        <nav
            style={{
                backgroundColor: isDarkMode
                    ? '#313133'
                    : 'var(--crm-sidebar)',
                borderBottom: isDarkMode
                    ? '1px solid #444'
                    : '1px solid var(--crm-border)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                color: isDarkMode
                    ? '#fff'
                    : 'var(--crm-text)',
                transition: 'var(--transition)'
            }}
        >
            {/* Top Banner */}
            <div
                style={{
                    backgroundColor: '#f68b1e',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontWeight: '600'
                }}
            >
                Free Delivery on millions of items!
            </div>

            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}
            >
                {/* Left Section */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        flexShrink: 0
                    }}
                >
                    <Menu
                        size={24}
                        style={{
                            cursor: 'pointer',
                            color: isDarkMode
                                ? '#fff'
                                : 'var(--crm-text)'
                        }}
                    />

                    <Link
                        to="/"
                        style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: '#f68b1e',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        ECOMMERCE
                    </Link>
                </div>

                {/* Search Bar */}
                <div
                    style={{
                        flex: '1 1 400px',
                        display: 'flex',
                        alignItems: 'center',
                        border: isDarkMode
                            ? '1px solid #444'
                            : '1px solid var(--crm-border)',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        backgroundColor: isDarkMode
                            ? '#3b3b3d'
                            : 'var(--input-bg)',
                        minWidth: '260px',
                        transition: 'var(--transition)'
                    }}
                >
                    <Search
                        size={18}
                        color={
                            isDarkMode
                                ? '#cfcfcf'
                                : '#757575'
                        }
                    />

                    <input
                        type="text"
                        placeholder="Search products, brands and categories"
                        style={{
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            marginLeft: '10px',
                            fontSize: '14px',
                            backgroundColor: 'transparent',
                            color: isDarkMode
                                ? '#fff'
                                : 'var(--crm-text)'
                        }}
                    />

                    <button
                        style={{
                            backgroundColor: '#f68b1e',
                            color: '#fff',
                            padding: '10px 18px',
                            borderRadius: '8px',
                            marginLeft: '10px',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        SEARCH
                    </button>
                </div>

                {/* Right Section */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* User */}
                    {activeUser.email ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '700'
                                }}
                            >
                                Hi,{' '}
                                {activeUser.name.split(
                                    ' '
                                )[0]}
                            </span>

                            <button
                                onClick={logout}
                                style={{
                                    fontSize: '12px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                color: isDarkMode
                                    ? '#fff'
                                    : 'var(--crm-text)'
                            }}
                        >
                            <User size={20} />
                            <span>Account</span>
                        </Link>
                    )}

                    {/* Cart */}
                    <div
                        onClick={onCartClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            position: 'relative',
                            color: isDarkMode
                                ? '#fff'
                                : 'var(--crm-text)'
                        }}
                    >
                        <ShoppingCart size={20} />

                        <span>Cart</span>

                        {totalItems > 0 && (
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    left: '12px',
                                    backgroundColor: '#f68b1e',
                                    color: '#fff',
                                    fontSize: '10px',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700'
                                }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            backgroundColor: isDarkMode
                                ? '#3b3b3d'
                                : 'var(--crm-bg)',
                            border: isDarkMode
                                ? '1px solid #444'
                                : '1px solid var(--crm-border)',
                            padding: '10px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isDarkMode
                                ? '#fff'
                                : 'var(--crm-text)',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                    >
                        {theme === 'light' ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
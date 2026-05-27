import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Simple slide‑in drawer that appears on small screens.
 * `isOpen` controls visibility, `onClose` is called when the user
 * clicks the close icon or a navigation link.
 */
export const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: isOpen ? 0 : '-260px',
        height: '100vh',
        width: '260px',
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-md)',
        transition: 'left 0.3s var(--transition)',
        zIndex: 200,
        padding: '20px',
      }}
    >
      <button onClick={onClose} style={{ background: 'none', border: 'none' }}>
        <X size={24} color="var(--color-text)" />
      </button>
      <nav style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Link to="/" onClick={onClose} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Home</Link>
        <Link to="/login" onClick={onClose} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Login</Link>
        <Link to="/cart" onClick={onClose} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Cart</Link>
        {/* Add more navigation links as needed */}
      </nav>
    </div>
  );
};

export default MobileMenu;

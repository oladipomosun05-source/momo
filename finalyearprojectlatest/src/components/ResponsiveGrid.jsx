import React from 'react';

/**
 * ResponsiveGrid – a wrapper that applies a responsive CSS‑grid layout.
 * It simply renders its children inside a container with the `.grid-products`
 * class defined in `index.css`. The class already uses `auto-fill` and a
 * `minmax(200px, 1fr)` rule, which makes the grid adapt from a single column
 * on mobile up to as many columns as will fit on larger screens.
 */
export const ResponsiveGrid = ({ children, className = '' }) => {
  return (
    <div className={`grid-products ${className}`} style={{ width: '100%' }}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;

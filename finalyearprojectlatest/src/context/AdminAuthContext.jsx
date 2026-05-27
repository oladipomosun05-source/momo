import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuth, setIsAdminAuth] = useState(() => {
        return !!sessionStorage.getItem('admin_token');
    });
    const [adminUser, setAdminUser] = useState(() => {
        return sessionStorage.getItem('admin_user') || '';
    });

    const adminLogin = (token, username) => {
        sessionStorage.setItem('admin_token', token);
        sessionStorage.setItem('admin_user', username);
        setIsAdminAuth(true);
        setAdminUser(username);
    };

    const adminLogout = () => {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_user');
        setIsAdminAuth(false);
        setAdminUser('');
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminAuth, adminUser, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

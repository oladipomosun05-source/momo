import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../config/axiosInstance';

import { API_URL, API_BASE_URL } from '../config';

const PrivacyContext = createContext();

const socket = io(API_BASE_URL);

export const usePrivacy = () => useContext(PrivacyContext);

export const PrivacyProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const [consoleLines, setConsoleLines] = useState([]);
    const [activeUser, setActiveUser] = useState({
        name: 'Guest User',
        role: 'GUEST',
        email: null,
    });
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || '');
    const [stats, setStats] = useState({
        privacyScore: 100,
        piiCount: 0,
        activeAlerts: 0,
        totalRequests: 0,
        growth: '+0%'
    });
    const [chartData, setChartData] = useState({ 
        sensitivity: { labels: [], data: [] }, 
        traffic: { labels: [], data: [] } 
    });
    const [searchQuery, setSearchQuery] = useState('');

    const getStepType = (text) => {
        if (text.includes('INFO') || text.includes('SCANNING') || text.includes('DATA MINIMIZATION')) return 'neutral';
        if (text.includes('DETECTED') || text.includes('ANALYZING') || text.includes('EGRESS MONITOR')) return 'warning';
        if (text.includes('RISK EVALUATION')) return 'critical';
        if (text.includes('POLICY APPLIED') || text.includes('COMMITTING') || text.includes('ACTION') || text.includes('SECURITY')) return 'success';
        return 'neutral';
    };

    const fetchLogs = async () => {
        try {
            const res = await api.get(`${API_URL}/admin/logs`);
            setLogs(res.data);
        } catch (err) {
            console.error("Error fetching logs:", err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get(`${API_URL}/admin/stats`);
            const { totalRequests, piiDetected, criticalAlerts, avgRisk, growth } = res.data;
            setStats({
                privacyScore: Math.round(100 - (avgRisk * 10)),
                piiCount: piiDetected,
                activeAlerts: criticalAlerts,
                totalRequests,
                growth
            });
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    };

    const fetchCharts = async () => {
        try {
            const res = await api.get(`${API_URL}/admin/charts`);
            setChartData(res.data);
        } catch (err) {
            console.error("Error fetching chart data:", err);
        }
    };

    useEffect(() => {
        // Load token on mount (persisted login)
        const storedToken = localStorage.getItem('token');
        if (storedToken) setAuthToken(storedToken);
        // Initial Fetch
        fetchLogs();
        fetchStats();
        fetchCharts();

        // Listen for real-time updates
        socket.on('privacy_update', (update) => {
            setLogs(prev => [update.newLog, ...prev].slice(0, 50));

            const formattedLines = update.steps.map(text => ({
                text,
                type: getStepType(text)
            }));
            setConsoleLines(prev => [...prev, ...formattedLines].slice(-100));

            fetchStats();
            fetchCharts();
        });

        return () => {
            socket.off('privacy_update');
        };
    }, []);

    const addLog = async (event, data, sensitivity = 'LOW') => {
        try {
            await api.post(`${API_URL}/simulate`, { event, data, sensitivity }, {
                headers: { 'x-user-role': activeUser.role, 'x-user-name': activeUser.name }
            });
        } catch (err) {
            console.log("Log simulation");
        }
    };

    const login = (userData, token) => {
        setActiveUser(userData);
        if (token) {
          localStorage.setItem('token', token);
          setAuthToken(token);
        }
        addLog('USER_LOGIN', `User logged in: ${userData.email}`, 'LOW');
    };

    const logout = () => {
        setActiveUser({ name: 'Guest User', role: 'GUEST', email: null });
        localStorage.removeItem('token');
        addLog('USER_LOGOUT', `User logged out`, 'LOW');
    };

    return (
        <PrivacyContext.Provider value={{ logs, consoleLines, activeUser, authToken, stats, chartData, addLog, login, logout, searchQuery, setSearchQuery }}>
            {children}
        </PrivacyContext.Provider>
    );
};

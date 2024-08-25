import React from 'react';
import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const authProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    
    const login = setIsAuthenticated(true);
    const logout = setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
};

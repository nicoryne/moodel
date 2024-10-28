import React from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);

  const login = (userToken) => {
    setToken(userToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("🔴 ERROR: useAuth must be used within an AuthProvider.");
  }

  return context;
};

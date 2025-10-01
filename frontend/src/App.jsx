import { createContext, useContext } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome'

import { Navigate } from 'react-router-dom';

 const AuthContext = createContext();
  const useAuth = () => useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  const RedirectIfLoggedIn = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/home" /> : children;
  };


function App() {
 
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
       <AuthContext.Provider value={{ isLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectIfLoggedIn>
                <Welcome />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfLoggedIn>
                <Signup />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>


    </>
  )
}

export default App
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/NavBar';
import { useEffect } from 'react';
const App = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  // 1. get user when app open (Initial Load)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  function App() {
    return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Login */}
        <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/plat" />} />
        {/* Register */}
        <Route path="/register" element={!user ? <Register /> : <Navigate replace to="/plat" />} />
        
        {/* plats */}
        <Route path="/plat" element={user ? <PlatsPage /> : <Navigate replace to="/login" />} />
        
        <Route path="/" element={<Navbar to="/login" />} />
        <Route path="/logout" element={<Logout to="/Logout" />} />
      </Routes>
    </BrowserRouter>
    );
  }
}
  export default App;
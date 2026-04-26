import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { AnimatePresence } from 'framer-motion'; // Make sure this is imported
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PlatsPage from './pages/PlatsPages';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation(); // Now this works because BrowserRouter is in main.jsx
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/plat" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/plat" />} />
          <Route path="/plat" element={isAuthenticated ? <PlatsPage /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/plat" />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
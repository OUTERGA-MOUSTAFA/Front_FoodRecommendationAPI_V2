import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './src/store/useAuthStore';
import Navbar from './src/components/Navbar';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import PlatsPage from './src/pages/PlatsPage';
import { Toaster } from 'react-hot-toast';
const location = useLocation();
function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
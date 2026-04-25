import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PlatsPage from './pages/PlatsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/plat" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/plat" />} />
        <Route path="/plat" element={isAuthenticated ? <PlatsPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/plat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
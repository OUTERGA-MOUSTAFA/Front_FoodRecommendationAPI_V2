import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register'; 

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-500 justify-center">
        <Link to="/" className="text-white p-3 bg-slate-600 rounded-md text-center ">Login</Link>
        <Link to="/register" className="text-white p-3 bg-slate-600 rounded-md text-center ">Register</Link>
      </nav>

      <Routes>
        {/* Login page*/}
        <Route path="/" element={<Login />} />
        
        {/* Register page */}
        <Route path="/register" element={<Register />} />
        
        {/* 404*/}
        <Route path="*" element={<h1 className="text-center mt-10">404 - Page non trouvée</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
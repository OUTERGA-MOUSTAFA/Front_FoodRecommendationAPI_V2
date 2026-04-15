import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav>
            <div>Recommendation Plats</div>

            {user ? (<div className="flex gap-4 items-center">
                        <span>Bienvennu {user.name}</span>
                        <button onClick={() => navigate('/plat')}>Mes Plats</button>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600" > Logout </button>
                    </div> ) : (<button onClick={() => navigate('/')}>Login</button>)}
        </nav>
    );
};

export default Navbar;
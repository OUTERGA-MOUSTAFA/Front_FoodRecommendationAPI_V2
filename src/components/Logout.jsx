import { useAuthStore } from "../store/useAuthStore";

const Logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   useAuthStore.getState().setUser(null);
};
export default Logout;
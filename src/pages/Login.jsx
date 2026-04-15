import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
// 1. Schema roles
const loginSchema = z.object({
    email: z.string().email("Email pa correct"),
    password: z.string().min(8, "password obligatoire plus de 8 chiffres"),
});

const Login = () => {
    const navigate = useNavigate();
    // 2. config React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {

        try {
            // await api.get('/sanctum/csrf-cookie');
            const res = await api.post("/login", data);

            // save token
            localStorage.setItem("token", res.data.access_token);

            // save user
            localStorage.setItem("user", JSON.stringify(res.data.user));

            useAuthStore.getState().setUser(res.data.user);

            navigate("/plat");

        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("Email ou mot de passe incorrect");
            } else {
                alert("Une erreur est survenue. Réessayez plus tard.");
            }
        }

};

return (
    <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
            {/* Input Email */}
            <div>
                <input
                    {...register("email")}
                    placeholder="Email@email.com"
                    className="border p-2 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="**********"
                    className="border p-2 rounded w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={!isValid}
                className={`p-2 rounded text-white ${isValid ? 'bg-blue-500' : 'bg-gray-400'}`}
            >
                Entre
            </button>
        </form>
    </div>
);
};

export default Login;
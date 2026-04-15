import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
// 1. declare (Schema)
const loginSchema = z.object({
    email: z.string().email("Email doit étre coorect"),
    password: z.string().min(8, "password au minimum 8 caracters"),
});

const Login = () => {
    // 2. config React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    

    // Login component
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/Register', data);

            // if token ok return true
            const token = response.data.token;
            localStorage.setItem('token', token); // store on localstorage

            alert("Rgister effectué avec succé");
            // ridirect
        } catch (error) {
            console.error("Error logging in:", error.response.data);
            alert("Email ou bien incorrect !");
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
                        placeholder="Email@gmail.com"
                        className="border p-2 rounded w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Input Password */}
                <div>
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="password"
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
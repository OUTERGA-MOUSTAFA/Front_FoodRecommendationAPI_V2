import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { registerSchema, useAuthStore } from '../store/useAuthStore';

const Register = () => {
  const navigate = useNavigate();
  const dietOptions = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'no_sugar', label: 'Sans Sucre' },
    { id: 'no_cholesterol', label: 'Sans Cholestérol' },
    { id: 'gluten_free', label: 'Sans Gluten' },
    { id: 'no_lactose', label: 'Sans Lactose' },
  ];

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(registerSchema), // registerSchema jat men store
    mode: "onChange",
  });

  const login = useAuthStore((state) => state.login);

const onSubmit = async (data) => {
  try {
    const res = await api.post("/register", data);
    
    // Use the store instead of manual localStorage
    // This keeps your UI in sync immediately
    login(res.data.user, res.data.access_token); 
    
    navigate("/me");
  } catch (err) {
    console.error(err.response?.data);
    alert("Erreur lors de l'inscription");
  }
};

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Créer un compte</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-96 bg-white p-6 shadow-md rounded">
        {/* Name */}
        <input {...register("name")} placeholder="Nom complet" className="border p-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Email */}
        <input {...register("email")} placeholder="Email" className="border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Passwords */}
        <input type="password" {...register("password")} placeholder="Mot de passe" className="border p-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input type="password" {...register("confirmPassword")} placeholder="Confirmer mot de passe" className="border p-2 rounded" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        {/* Dietary Tags (Checkboxes) */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Profil alimentaire :</p>
          <div className="grid grid-cols-2 gap-2">
            {dietOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  value={option.id} 
                  {...register("dietary_tags")} // RHF connaitre que c'est un array 
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!isValid}
          className={`mt-6 p-2 rounded text-white ${isValid ? 'bg-green-500' : 'bg-gray-400'}`}
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import PlateCard from '../components/PlateCard';

// Hook personnalisé pour récupérer les plats
const usePlates = (params) => {
  return useQuery({
    queryKey: ['plates', params],
    queryFn: async () => {
      const { data } = await api.get('/plates', { params });
      return data;
    },
    keepPreviousData: true, // Garde les anciennes données pendant le chargement
  });
};

const PlatsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lire les paramètres d'URL
  const categoryId = searchParams.get('category_id') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = usePlates({
    category_id: categoryId,
    sort,
    page,
  });

  // Récupération des catégories pour le select
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(res => res.data),
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => {
      if (value) prev.set(name, value);
      else prev.delete(name);
      prev.set('page', '1'); // reset page
      return prev;
    });
  };

  if (isLoading) return <div className="text-center py-10">Chargement...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Erreur de chargement</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nos Plats</h1>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          name="category_id"
          value={categoryId}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Toutes les catégories</option>
          {categories?.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          name="sort"
          value={sort}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Trier par</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
          <option value="score_desc">Score IA</option>
        </select>
      </div>

      {/* Liste des plats avec animation stagger */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {data?.data?.map(plate => (
          <PlateCard key={plate.id} plate={plate} />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setSearchParams(prev => { prev.set('page', page-1); return prev })}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setSearchParams(prev => { prev.set('page', page+1); return prev })}
          disabled={!data?.next_page_url}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PlatsPage;
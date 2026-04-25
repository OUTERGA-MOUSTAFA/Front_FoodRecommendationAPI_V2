import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { useState } from 'react';

const usePlate = (id) => {
  return useQuery({
    queryKey: ['plate', id],
    queryFn: () => api.get(`/plates/${id}`).then(res => res.data),
  });
};

const useRecommendation = (plateId) => {
  return useQuery({
    queryKey: ['recommendation', plateId],
    queryFn: () => api.get(`/recommendations/${plateId}`).then(res => res.data),
    enabled: false, // On ne lance pas automatiquement
    refetchInterval: (data) => {
      // Si le statut est 'ready', on arrête le polling
      return data?.status === 'ready' ? false : 3000;
    },
  });
};

const PlateDetail = () => {
  const { id } = useParams();
  const { data: plate, isLoading } = usePlate(id);
  const [analysisStarted, setAnalysisStarted] = useState(false);

  const analyzeMutation = useMutation({
    mutationFn: () => api.post(`/recommendations/analyze/${id}`),
    onSuccess: () => {
      setAnalysisStarted(true);
      refetchRecommendation(); // Démarre le polling
    },
  });

  const {
    data: recommendation,
    refetch: refetchRecommendation,
    isFetching: isPolling,
  } = useRecommendation(id);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <img src={plate.image_url} alt={plate.name} className="w-full h-64 object-cover rounded" />
        <h1 className="text-3xl font-bold mt-4">{plate.name}</h1>
        <p className="text-gray-600 mt-2">{plate.description}</p>
        <p className="text-2xl font-bold mt-4">{plate.price} €</p>

        {/* Section recommandation IA */}
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Analyse IA</h2>
          
          {!analysisStarted && !recommendation && (
            <button
              onClick={() => analyzeMutation.mutate()}
              disabled={analyzeMutation.isPending}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {analyzeMutation.isPending ? 'Lancement...' : 'Analyser ce plat'}
            </button>
          )}

          {isPolling && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">...</svg>
              Calcul en cours...
            </div>
          )}

          {recommendation?.status === 'ready' && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <span className={`text-3xl font-bold px-4 py-2 rounded ${getScoreColor(recommendation.score)}`}>
                  {recommendation.score}/100
                </span>
                <span className="text-lg">{recommendation.label}</span>
              </div>
              {recommendation.warning_message && (
                <p className="mt-2 text-red-600">{recommendation.warning_message}</p>
              )}
              {recommendation.conflicting_tags?.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Tags en conflit :</p>
                  <ul className="list-disc list-inside">
                    {recommendation.conflicting_tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlateDetail;
import { Link } from 'react-router-dom';

const PlateCard = ({ plate }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <img
        src={plate.image_url || '/placeholder.jpg'}
        alt={plate.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{plate.name}</h3>
        <p className="text-gray-600">{plate.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">{plate.price} €</span>
          {plate.is_available ? (
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded">Disponible</span>
          ) : (
            <span className="text-red-600 bg-red-100 px-2 py-1 rounded">Indisponible</span>
          )}
        </div>
        <Link
          to={`/plat/${plate.id}`}
          className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Voir détails
        </Link>
      </div>
    </motion.div>
  );
};

export default PlateCard;
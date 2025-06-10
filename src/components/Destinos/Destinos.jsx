import React, { useState, useEffect } from 'react';
import FilterSection from './components/FilterSection';
import DestinoCard from './components/DestinoCard';
import { destinationService } from '../../services/api';

function Destinos({ onAddDestination }) {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await destinationService.getAll();
        const destinosData = response.data.map(destino => ({
          id: destino.destino_id,
          name: destino.nombre,
          location: destino.provincia,
          category: destino.categoria || 'Sin categoría',
          rating: destino.calificacion || 0,
          description: destino.descripcion,
          image: destino.imagen_principal || null,
          gallery: destino.galeria_imagenes || [],
          featured: destino.destacado || false
        }));
        
        setDestinos(destinosData);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los destinos');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchDestinos();
  };

  if (loading) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
        </div>
        <p className="text-lg text-amber-600 mt-4">Cargando destinos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!destinos || destinos.length === 0) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <p className="text-lg text-amber-600">No se encontraron destinos disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto my-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Destinos</h1>
        <p className="text-lg text-amber-600">Descubre la riqueza cultural de la Isla</p>
      </div>

      <FilterSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {destinos.map((destino) => (
          <DestinoCard 
            key={destino.id}
            destino={destino}
            onAddDestination={onAddDestination} 
          />
        ))}
      </div>
    </div>
  );
}

export default Destinos; 
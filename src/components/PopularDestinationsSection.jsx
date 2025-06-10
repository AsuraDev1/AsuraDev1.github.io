import React, { useState, useEffect } from 'react';
import DestinoCard from './Destinos/components/DestinoCard';
import { destinationService } from '../services/api';

function PopularDestinationsSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await destinationService.getAll();
        const destinosData = response.data;
        
        // Tomar los primeros 3 destinos
        const destinosPopulares = destinosData.slice(0, 3).map(destino => ({
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
        
        setDestinations(destinosPopulares);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los destinos');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  if (loading) {
    return (
      <div className="w-[95%] xs:w-11/12 sm:w-4/5 mx-auto my-4 xs:my-8 sm:my-16 text-center">
        <p className="text-lg text-amber-600">Cargando destinos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[95%] xs:w-11/12 sm:w-4/5 mx-auto my-4 xs:my-8 sm:my-16 text-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="w-[95%] xs:w-11/12 sm:w-4/5 mx-auto my-4 xs:my-8 sm:my-16">
      <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-amber-800 mb-4 xs:mb-6">
        Destinos Populares
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
        {destinations.map((destino) => (
          <DestinoCard
            key={destino.id}
            destino={destino}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinationsSection; 
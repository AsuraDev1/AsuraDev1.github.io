import React from 'react';
import DestinoCard from './Destinos/components/DestinoCard';

function PopularDestinationsSection() {
  const destinations = [
    {
      id: 1,
      name: 'Plaza de Armas',
      location: 'Arquitectura Colonial en La Habana',
      category: 'Histórico'
    },
    {
      id: 2,
      name: 'Casa de la Música',
      location: 'Música Tradicional en Trinidad',
      category: 'Cultural'
    },
    {
      id: 3,
      name: 'Fortaleza San Carlos',
      location: 'Arquitectura Militar en Matanzas',
      category: 'Histórico'
    }
  ];

  return (
    <section className="w-11/12 sm:w-4/5 mx-auto my-8 sm:my-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-bold text-amber-800 mb-2 sm:mb-4">Destinos Populares</h2>
        <p className="text-base sm:text-lg text-amber-600">Descubre los lugares más emblemáticos de Cuba</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {destinations.map((destino) => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinationsSection; 
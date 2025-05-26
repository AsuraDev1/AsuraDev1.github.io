import React from 'react';
import FilterSection from './components/FilterSection';
import DestinoCard from './components/DestinoCard';

function Destinos() {
  // Datos de ejemplo de destinos
  const destinos = [
    { id: 1, category: 'Arquitectura Colonial', name: 'Plaza de Armas', location: 'La Habana' },
    { id: 2, category: 'Música Tradicional', name: 'Casa de la Música', location: 'Trinidad' },
    { id: 3, category: 'Arquitectura Militar', name: 'Fortaleza San Carlos', location: 'Matanzas' },
    { id: 4, category: 'Artesanías', name: 'Taller de Cerámica', location: 'Camagüey' },
    { id: 5, category: 'Historia', name: 'Casa Natal José Martí', location: 'La Habana' },
    // Añadir más destinos aquí si es necesario
  ];

  return (
    <div className="w-4/5 mx-auto my-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Destinos</h1>
        <p className="text-lg text-amber-600">Descubre la riqueza cultural de la Isla</p>
      </div>

      <FilterSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {destinos.map(destino => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </div>
  );
}

export default Destinos; 
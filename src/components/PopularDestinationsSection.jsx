import React from 'react';

function PopularDestinationsSection() {
  const destinations = [
    {
      name: 'Plaza de Armas',
      description: 'Arquitectura Colonial en La Habana',
      labelColor: 'bg-amber-700'
    },
    {
      name: 'Casa de la Música',
      description: 'Música Tradicional en Trinidad',
      labelColor: 'bg-amber-700'
    },
    {
      name: 'Fortaleza San Carlos',
      description: 'Arquitectura Militar en Matanzas',
      labelColor: 'bg-amber-700'
    }
  ];

  return (
    <section className="w-4/5 mx-auto my-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-800 mb-4">Destinos Populares</h2>
        <p className="text-lg text-amber-600">Descubre los lugares más emblemáticos de Cuba</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-stone-200 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-300 flex items-center justify-center">
              <div className="text-amber-600 text-sm">Imagen del Destino</div>
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${destination.labelColor} text-white`}>
                {destination.name}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-amber-800 mb-2">{destination.name}</h3>
              <p className="text-amber-600 text-sm mb-4 flex-grow">{destination.description}</p>
              <button className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors">
                Explorar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularDestinationsSection; 
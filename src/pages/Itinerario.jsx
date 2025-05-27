import React, { useState } from 'react';
import ItinerarioDestinoCard from '../components/ItinerarioDestinoCard';
import { destinos as allDestinos } from '../components/Destinos/Destinos'; // Importar los destinos desde Destinos.jsx
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

// Importar componentes si son necesarios (como el Header o Footer si se comparten)
// import Header from '../components/header';
// import Footer from '../components/Footer';

// Recibir las props itinerarioDestinos y onRemoveDestination desde App.jsx
function Itinerario({ itinerarioDestinos, onRemoveDestination, onAddDestination }) {
  const navigate = useNavigate(); // Inicializar useNavigate

  // El estado itinerarioDestinos y las funciones handleAddDestination y handleRemoveDestination
  // ahora se manejan en App.jsx y se pasan como props. Eliminamos su definición local.
  // const [itinerarioDestinos, setItinerarioDestinos] = useState([
  //    { ...allDestinos[0], date: '06/06/2024', duration: 'Día completo', description: 'Corazón histórico de Cuba con arquitectura colonial' }, // Ejemplo inicial
  //    { ...allDestinos[1], date: '07/06/2024', duration: 'Medio día', description: 'Paisaje único con mogotes y plantaciones de tabaco' }, // Ejemplo inicial
  // ]);
  // const handleAddDestination = (destino) => { ... };
  // const handleRemoveDestination = (destinoId) => { ... };


   // Filtrar destinos recomendados para excluir los que ya están en el itinerario
   // Utilizamos la prop itinerarioDestinos que viene de App.jsx
  const destinosRecomendados = allDestinos.filter(destino => 
    !itinerarioDestinos.some(itinerarioDestino => itinerarioDestino.id === destino.id)
  );

  // La función handleAddDestination ahora se recibe como prop onAddDestination
  // const handleAddDestination = (destino) => { ... };


  return (
    <div className="font-playfair pt-12 sm:pt-16 md:pt-20 bg-orange-100 min-h-screen">
      {/* Si el header y footer son parte del layout principal de App.jsx, no los incluyas aquí */}
      {/* <Header /> */}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Header de la página del creador de itinerarios */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-800 mb-4 sm:mb-0">Creador de Itinerarios</h1>
        </div>

        {/* Contenido principal: Mi Itinerario y Agregar Destinos */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Columna Izquierda: Mi Itinerario de Viaje */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-amber-800">Mi Itinerario de Viaje</h2>
                <button 
                  className="w-full sm:w-auto bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors text-sm"
                  onClick={() => navigate('/destinos')}
                >
                  + Agregar Destinos
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6 mb-6">
                <p className="text-amber-800 text-base sm:text-lg"><span className="font-bold text-xl sm:text-2xl">{itinerarioDestinos.length}</span> Días de viaje</p>
                {/* Calcular calificación promedio si hay destinos */}
                {itinerarioDestinos.length > 0 && (
                   <p className="text-amber-800 text-base sm:text-lg"><span className="font-bold text-xl sm:text-2xl">{(itinerarioDestinos.reduce((sum, destino) => sum + destino.rating, 0) / itinerarioDestinos.length).toFixed(1)}</span> Calificación promedio</p>
                )}
              </div>
              {/* Tarjetas de destino del itinerario */}
              <div className="space-y-4 sm:space-y-6">
                {itinerarioDestinos.map((destino, index) => (
                  // Pasar la prop onRemoveDestination al componente
                  <ItinerarioDestinoCard 
                    key={destino.id} 
                    destino={destino} 
                    dayNumber={index + 1} 
                    onRemove={onRemoveDestination} // Usar la prop recibida
                  />
                ))}
                 {itinerarioDestinos.length === 0 && (
                  <p className="text-center text-amber-600">Aún no has añadido destinos a tu itinerario.</p>
                 )}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Agregar Destinos y Destinos Recomendados */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
              {/* Destinos Recomendados */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-800 mb-4">Destinos Recomendados</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Mostrar solo destinos recomendados que no estén en el itinerario */}
                  {destinosRecomendados.map(destino => (
                    <div key={destino.id} className="bg-stone-100 p-3 sm:p-4 rounded-md shadow-sm">
                      <p className="font-semibold text-amber-800 text-sm">{destino.name}</p>
                      <p className="text-amber-600 text-xs">📍 {destino.location} {destino.rating && `| ⭐ ${destino.rating}`} {destino.category && `| ${destino.category}`}</p>
                      {/* Conectar el botón con la función handleAddDestination (recibida como prop) */}
                      <button 
                        className="w-full bg-amber-600 text-white px-3 py-1 mt-2 rounded-md hover:bg-amber-700 transition-colors text-xs"
                        onClick={() => onAddDestination(destino)}
                      >
                        + Agregar a la lista
                      </button>
                    </div>
                  ))}
                   {destinosRecomendados.length === 0 && (
                    <p className="text-center text-amber-600 text-sm">No hay más destinos recomendados.</p>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Si el header y footer son parte del layout principal de App.jsx, no los incluyas aquí */}
      {/* <Footer /> */}
    </div>
  );
}

export default Itinerario; 
import React from 'react';

function ItinerarioDestinoCard({ destino, dayNumber, onRemove }) {
  return (
    <div className="bg-stone-100 p-4 rounded-lg shadow-sm flex items-center space-x-4">
      {/* Número del día */}
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
        {dayNumber}
      </div>

      {/* Info del destino */}
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <h3 className="font-semibold text-amber-800 text-base md:text-lg mr-2">{destino.name}</h3>
          {destino.rating && (
             <span className="text-yellow-400 text-sm md:text-base">★ {destino.rating}</span>
          )}
        </div>
        <p className="text-amber-600 text-xs md:text-sm mb-1">📍 {destino.location}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {destino.category && (
            <span className="bg-amber-200 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">{destino.category}</span>
          )}
          {/* Puedes añadir más categorías si existen en tus datos */}
        </div>
        <p className="text-amber-600 text-xs md:text-sm">{destino.description}</p>
        {destino.date && (
           <p className="text-amber-600 text-xs md:text-sm mt-1">📅 {destino.date} {destino.duration && `- ${destino.duration}`}</p>
        )}
      </div>

      {/* Botón para eliminar */}
      <button className="flex-shrink-0 text-amber-800 hover:text-amber-600 text-sm md:text-base" onClick={() => onRemove(destino.id)}>✕</button>
    </div>
  );
}

export default ItinerarioDestinoCard; 
import React from 'react';
import { Link } from 'react-router-dom';


function DestinoCard({ destino, onAddDestination }) {
  return (
    <div className="bg-stone-200 rounded-lg shadow-md overflow-hidden flex flex-col relative">
      <div className="h-48 bg-stone-100 flex justify-center items-center">
       
      </div>
      <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-700 text-white">
        {destino.category}
      </span>
      {destino.rating > 4.0 && (
        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
          Recomendado
        </span>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          {destino.name}
        </h3>
        <p className="text-amber-600 text-sm mb-4">
          {destino.location}
        </p>
        <div className="flex justify-between items-center">
          <Link to={`/destinos/${destino.id}`} className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors text-center text-sm">
            Ver Detalles
          </Link>
          <button 
            className="bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-700 transition-colors text-sm"
            onClick={() => onAddDestination(destino)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinoCard; 
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

function DestinoCard({ destino, onAddDestination }) {
  const {
    id,
    name,
    location,
    category,
    rating,
    description,
    image
  } = destino;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600">Sin imagen</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded-full text-sm">
          {rating} <FaIcons.FaStar className="inline ml-1" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-amber-800 mb-2">{name}</h3>
        
        <div className="flex items-center text-amber-600 mb-2">
          <FaIcons.FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-amber-600 mb-3">
          <FaIcons.FaTag className="mr-2" />
          <span>{category}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <Link
            to={`/destinos/${id}`}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
          >
            Ver más
          </Link>
          {onAddDestination && (
            <button
              onClick={() => onAddDestination(destino)}
              className="text-amber-600 hover:text-amber-700"
            >
              Agregar a favoritos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DestinoCard; 
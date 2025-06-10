import React from 'react';

function Comment({ autor, contenido, fecha }) {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex items-start p-3 hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-amber-700 text-sm">
            {autor || 'Usuario Anónimo'}
          </p>
          <p className="text-xs text-gray-500">{formatDate(fecha)}</p>
        </div>
        <p className="text-gray-700 text-sm mt-1">{contenido}</p>
      </div>
    </div>
  );
}

export default Comment; 
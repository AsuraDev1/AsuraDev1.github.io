import React from 'react';
// import './FilterSection.css';

function FilterSection() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Filtrar Destinos</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <select className="p-2.5 rounded border border-amber-700 bg-stone-200 text-amber-600 text-base focus:outline-none focus:ring-2 focus:ring-amber-800">
          <option value="">Tipo de Cultura</option>
          {/* Opciones de Tipo de Cultura */}
        </select>
        <select className="p-2.5 rounded border border-amber-700 bg-stone-200 text-amber-600 text-base focus:outline-none focus:ring-2 focus:ring-amber-800">
          <option value="">Mes de Visita</option>
          {/* Opciones de Mes de Visita */}
        </select>
        <select className="p-2.5 rounded border border-amber-700 bg-stone-200 text-amber-600 text-base focus:outline-none focus:ring-2 focus:ring-amber-800">
          <option value="">Provincia</option>
          {/* Opciones de Provincia */}
        </select>
        <button className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors">
          Buscar
        </button>
      </div>
    </div>
  );
}

export default FilterSection; 
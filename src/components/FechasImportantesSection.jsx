import React from 'react';

function FechasImportantesSection() {
  return (
    <section className="container mx-auto mt-8 p-4">
      <div className="bg-stone-200 p-6 rounded-lg shadow-md h-full">
        <h2 className="text-xl font-bold text-amber-800 mb-4"><span className="mr-2">📅</span> Fechas Importantes</h2>
        <p className="text-sm text-amber-600 mb-4">Eventos y festivales que no te puedes perder</p>

        <div className="space-y-4">

          <div className="flex justify-between items-center border-b border-amber-700 pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">Festival del Habanero</h3>
              <p className="text-sm text-amber-600">Febrero 2026 - La Habana</p>
            </div>
            <span className="bg-white text-amber-700 text-xs px-2 py-1 rounded">Próximamente</span>
          </div>

       
          <div className="flex justify-between items-center border-b border-amber-700 pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">Carnaval de Santiago</h3>
              <p className="text-sm text-amber-600">Julio 2026 - Santiago de Cuba</p>
            </div>
            <span className="bg-white text-amber-700 text-xs px-2 py-1 rounded">Destacado</span>
          </div>

        
          <div className="flex justify-between items-center pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">Festival Internacional de Jazz</h3>
              <p className="text-sm text-amber-600">Enero 2026 - La Habana</p>
            </div>
            <span className="bg-white text-amber-700 text-xs px-2 py-1 rounded">Popular</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FechasImportantesSection; 
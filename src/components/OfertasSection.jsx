import React from 'react';

function OfertasSection() {
  return (
    <section className="container mx-auto mt-8 p-4">
      <div className="bg-stone-200 p-6 rounded-lg shadow-md h-full">
        <h2 className="text-xl font-bold text-amber-800 mb-4"><span className="mr-2">✈️</span> Viajes en Oferta</h2>
        <p className="text-sm text-amber-600 mb-4">Aprovecha nuestras mejores ofertas</p>

        <div className="space-y-4">

          <div className="flex justify-between items-center border-b border-amber-700 pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">La Habana - 4 noches</h3>
              <p className="text-sm text-amber-600">Hotel + Vuelo incluido</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-600 line-through">$899</p>
              <p className="text-lg font-bold text-amber-700">$699</p>
            </div>
          </div>


          <div className="flex justify-between items-center border-b border-amber-700 pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">Varadero - 7 noches</h3>
              <p className="text-sm text-amber-600">Todo incluido</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-600 line-through">$1299</p>
              <p className="text-lg font-bold text-amber-700">$999</p>
            </div>
          </div>


          <div className="flex justify-between items-center pb-2">
            <div>
              <h3 className="font-semibold text-amber-800">Cayo Coco - 5 noches</h3>
              <p className="text-sm text-amber-600">Resort de lujo</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-600 line-through">$1499</p>
              <p className="text-lg font-bold text-amber-700">$1199</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfertasSection; 
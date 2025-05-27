import React from 'react';

function UniqueExperiencesSection() {
  const experiences = [
    {
      title: 'Recorrido por La Habana Vieja',
      description: 'Explora las calles históricas y plazas coloniales de La Habana Vieja, declarada Patrimonio de la Humanidad por la UNESCO.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'https://viajes.chavetas.es/wp-content/uploads/albums/cuba22/d02-53.jpg',
      imageAlt: 'Coche clásico rosa estacionado en una calle de La Habana'
    },
    {
      title: 'Ruta del Ron y Tabaco',
      description: 'Visita las fábricas de ron y las plantaciones de tabaco para conocer el proceso de elaboración de estos productos emblemáticos cubanos.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'https://www.civitatis.com/f/cuba/varadero/galeria/big/haciendo-tabaco-varadero.jpg',
      imageAlt: 'Persona fabricando un tabaco'
    },
    {
      title: 'Aventura en Cayo Guillermo',
      description: 'Disfruta de deportes acuáticos, buceo y snorkel en las cristalinas aguas de Cayo Guillermo, hogar de impresionantes arrecifes de coral.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/76/d3/2f/caption.jpg?w=1400&h=-1&s=1',
      imageAlt: 'Entrada al Centro Turístico Las Barrigonas'
    },
  ];

  return (
    <section className="w-[95%] xs:w-11/12 sm:w-4/5 mx-auto my-4 xs:my-8 sm:my-16">
      <div className="text-center mb-4 xs:mb-8 sm:mb-12">
        <h2 className="text-xl xs:text-2xl sm:text-4xl font-bold text-amber-800 mb-2 xs:mb-4">Experiencias Únicas</h2>
        <p className="text-sm xs:text-base sm:text-lg text-amber-600">Vive momentos inolvidables en Cuba con nuestras experiencias seleccionadas</p>
      </div>

      <div className="flex flex-col gap-4 xs:gap-6 sm:gap-12">
        {experiences.map((experience, index) => (
          <div key={index} className={`flex flex-col md:flex-row bg-stone-200 rounded-lg shadow-md overflow-hidden ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 h-40 xs:h-48 sm:h-64 md:h-auto bg-gray-300 flex items-center justify-center text-amber-600 text-sm">
              {experience.imageUrl ? (
                <img
                  src={experience.imageUrl}
                  alt={experience.imageAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-amber-600 text-sm">{experience.imagePlaceholder}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-4 xs:p-6 flex flex-col justify-center">
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-amber-800 mb-2 xs:mb-3">{experience.title}</h3>
              <p className="text-sm xs:text-base text-amber-600 mb-4">{experience.description}</p>
              <button className="bg-amber-700 text-white px-3 xs:px-4 sm:px-6 py-2 rounded-md hover:bg-amber-800 transition-colors text-sm xs:text-base">
                {experience.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UniqueExperiencesSection; 
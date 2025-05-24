import React from 'react';

function UniqueExperiencesSection() {
  const experiences = [
    {
      title: 'Recorrido por La Habana Vieja',
      description: 'Explora las calles históricas y plazas coloniales de La Habana Vieja, declarada Patrimonio de la Humanidad por la UNESCO.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'assets/photo_5012988160791129780_y.jpg',
      imageAlt: 'Coche clásico rosa estacionado en una calle de La Habana'
    },
    {
      title: 'Ruta del Ron y Tabaco',
      description: 'Visita las fábricas de ron y las plantaciones de tabaco para conocer el proceso de elaboración de estos productos emblemáticos cubanos.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'assets/photo_5012988160791129782_x.jpg',
      imageAlt: 'Dos personas en una lancha rápida'
    },
    {
      title: 'Aventura en Cayo Guillermo',
      description: 'Disfruta de deportes acuáticos, buceo y snorkel en las cristalinas aguas de Cayo Guillermo, hogar de impresionantes arrecifes de coral.',
      buttonText: 'Reservar experiencia',
      imageUrl: 'assets/photo_5012988160791129781_m.jpg',
      imageAlt: 'Entrada al Centro Turístico Las Barrigonas'
    },
  ];

  return (
    <section className="w-4/5 mx-auto my-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#6b5b51] mb-4">Experiencias Únicas</h2>
        <p className="text-lg text-stone-700">Vive momentos inolvidables en Cuba con nuestras experiencias seleccionadas</p>
      </div>

      <div className="flex flex-col gap-12">
        {experiences.map((experience, index) => (
          <div key={index} className={`flex flex-col md:flex-row bg-[#fdf8f0] rounded-lg shadow-md overflow-hidden h-72 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
              {experience.imageUrl ? (
                <img
                  src={experience.imageUrl}
                  alt={experience.imageAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-600 text-sm">{experience.imagePlaceholder}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-[#6b5b51] mb-3">{experience.title}</h3>
              <p className="text-stone-700 text-sm mb-4">{experience.description}</p>
              <button className="btn-primary">
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
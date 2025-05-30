import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const allDestinations = [
  {
    id: '1',
    category: 'Arquitectura Colonial',
    name: 'Plaza de Armas',
    location: 'La Habana',
    description: 'Explora la histórica Plaza de Armas con su arquitectura colonial.',
    rating: 4.5,
    reviews: 500,
    photos: ['/assets/plazaarmas1.jpg'],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['5'],
  },
  {
    id: '2',
    category: 'Música Tradicional',
    name: 'Casa de la Música',
    location: 'Trinidad',
    description: 'Disfruta de la auténtica música cubana en la Casa de la Música de Trinidad.',
    rating: 4.8,
    reviews: 750,
    photos: ['/assets/casamusica1.jpg'],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['1', '3'],
  },
  {
    id: '3',
    category: 'Arquitectura Militar',
    name: 'Fortaleza San Carlos',
    location: 'Matanzas',
    description: 'Explora la imponente Fortaleza San Carlos en Matanzas.',
    rating: 4.6,
    reviews: 300,
    photos: ['/assets/fortalezasc1.jpg'],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['2'],
  },
  {
    id: '4',
    category: 'Artesanías',
    name: 'Taller de Cerámica',
    location: 'Camagüey',
    description: 'Visita un taller de cerámica tradicional en Camagüey.',
    rating: 4.4,
    reviews: 150,
    photos: ['/assets/ceramicataller1.jpg'],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['5'],
  },
  {
    id: '5',
    category: 'Historia',
    name: 'Casa Natal José Martí',
    location: 'La Habana',
    description: 'Conoce la historia en la Casa Natal de José Martí.',
    rating: 4.9,
    reviews: 1000,
    photos: ['/assets/casamarti1.jpg'],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['1', '4'],
  },

  {
    id: 'LaHabanaVieja',
    name: 'La Habana Vieja',
    location: 'La Habana',
    description: 'Explora el corazón histórico de Cuba con su arquitectura colonial y vibrante cultura.',
    rating: 4.8,
    reviews: 1250,
    category: 'Histórico',
    photos: [
      '/assets/lahabana1.jpg',
      '/assets/lahabana2.jpg',
      '/assets/lahabana3.jpg',
    ],
    news: [],
    weather: {},
    usefulInfo: {},
    relatedDestinationIds: ['2', '3', '4', '5'],
  },
];


const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;


  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;


    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const DetallesDestino = () => {
  const { id } = useParams();
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState([

    {
      id: 1,
      destinationId: '1',
      user: 'Maria González',
      rating: 5,
      date: 'Hace 2 días',
      text: 'Increíble experiencia! La arquitectura colonial es simplemente espectacular. Recomiendo la visita guiada.',
      avatar: 'bg-gray-300'
    },
    {
      id: 2,
      destinationId: 'LaHabanaVieja',
      user: 'Pedro Pérez',
      rating: 4,
      date: 'Hace 1 día',
      text: 'Muy bonito lugar, mucha historia.',
      avatar: 'bg-gray-300'
    },

  ]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [displayedRelatedDestinations, setDisplayedRelatedDestinations] = useState([]);

  const commentsListRef = useRef(null);
  const commentInputRef = useRef(null);


  const destination = allDestinations.find(dest => dest.id === id);


  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPhotoIndex(0);
  }, [id]);


  useEffect(() => {
    if (destination && destination.relatedDestinationIds) {

      const potentialRelated = allDestinations.filter(dest =>
        destination.relatedDestinationIds.includes(dest.id) && dest.id !== id
      );

      const shuffledRelated = shuffleArray([...potentialRelated]);
      setDisplayedRelatedDestinations(shuffledRelated.slice(0, 3));
    } else {
      setDisplayedRelatedDestinations([]);
    }
  }, [id, destination]);


  useEffect(() => {
    if (!destination) {
      console.error(`Destination with ID ${id} not found.`);

    }
  }, [id, destination]);

  const handlePublishComment = () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        destinationId: id,
        user: 'Usuario Anónimo',
        rating: 5,
        date: 'Justo ahora',
        text: newCommentText,
        avatar: 'bg-gray-300'
      };
      setComments([...comments, newComment]);
      setNewCommentText('');


      if (commentInputRef.current) {
        commentInputRef.current.blur();
      }


      setTimeout(() => {
        if (commentsListRef.current) {
          commentsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 0);
    }
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? (destination.photos ? destination.photos.length - 1 : 0) : prevIndex - 1
    );
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      (destination.photos && prevIndex === destination.photos.length - 1) ? 0 : prevIndex + 1
    );
  };

  if (!destination) {
    return <div className="container mx-auto p-4">Cargando o destino no encontrado...</div>;
  }


  const currentDestinationComments = comments.filter(comment => comment.destinationId === id);

  return (
    <div className="container mx-auto p-4 md:px-8 lg:px-16">

      <div className="flex flex-col md:flex-row gap-8 mb-8">

        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">

          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-amber-800 mb-1">{destination.name}</h2>
              <p className="text-amber-600 text-sm">📍 {destination.location}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="ml-4 bg-amber-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded mb-1">{destination.category}</span>
              {destination.rating > 4.0 && (
                <span className="ml-4 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">Recomendado</span>
              )}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1 text-xl">★ {destination.rating}</span>
            <span className="text-amber-600 text-sm">({destination.reviews} reseñas)</span>
          </div>
          <p className="text-amber-600 mb-6">{destination.description}</p>


          <h3 className="text-xl font-bold text-amber-800 mb-4">Galería de fotos</h3>
          <div className="relative rounded-lg overflow-hidden mb-8" style={{ height: '400px' }}> {/* Added fixed height for gallery */}

            {destination.photos && destination.photos.length > 0 ? (
              <img
                src={destination.photos[currentPhotoIndex]}
                alt={`Photo of ${destination.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600 text-lg">Imagen no disponible</div>
            )}


            {destination.photos && destination.photos.length > 1 && (
              <>
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none" onClick={goToPreviousPhoto}>&lt;</button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none" onClick={goToNextPhoto}>&gt;</button>
              </>
            )}
          </div>


          <div className="mt-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Comentarios destacados</h2>


            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-semibold text-amber-700 mb-4">Comparte tu experiencia</h3>
              <div className="mb-4">
                <p className="text-amber-600 mb-2">Tu calificación</p>
                <div className="flex text-yellow-400 text-2xl space-x-1">
                  <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
              </div>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-gray-500 text-amber-600"
                rows="2"
                placeholder="Escribe aquí tu comentario..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePublishComment();
                  }
                }}
              ></textarea>
              <div className="flex justify-between items-center">
                <button className="flex items-center text-amber-600 text-sm hover:text-amber-700 transition-colors focus:outline-none">
                  <span className="mr-1">📷</span> Agregar fotos
                </button>
                <button
                  className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors focus:outline-none"
                  onClick={handlePublishComment}
                >
                  Publicar comentario
                </button>
              </div>
            </div>


            <div ref={commentsListRef} className="space-y-6">
              {currentDestinationComments.map(comment => (
                <div key={comment.id} className="flex">
                  <div className={`${comment.avatar} w-12 h-12 rounded-full mr-4 flex-shrink-0`}></div>
                  <div>
                    <p className="font-semibold text-amber-700">{comment.user}</p>
                    <div className="flex text-yellow-400 text-sm mt-1 mb-1">
                      {[...Array(comment.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="text-sm text-amber-600">{comment.date}</p>
                    <p className="mt-2 text-amber-600 text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
              {currentDestinationComments.length === 0 && (
                <p className="text-center text-amber-600">Sé el primero en comentar!</p>
              )}
            </div>
          </div>
        </div>


        <div className="md:w-1/3 flex flex-col space-y-8">

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-amber-800 mb-4">☁️ Clima actual</h3>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-amber-700">28°C</p>
              <p className="text-amber-600">Parcialmente nublado</p>
            </div>
            <div className="flex justify-around text-sm text-amber-600">
              <p>Máx: 32°C</p>
              <p>Mín: 24°C</p>
            </div>
            <p className="text-center text-sm text-amber-600 mt-2">Humedad: 75% | Viento: 15 km/h</p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-amber-800 mb-4">ℹ️ Información útil</h3>
            <div className="space-y-2 text-amber-600 text-sm">
              <p><span className="font-semibold">Mejor época:</span> Nov - Abr</p>
              <p><span className="font-semibold">Idioma:</span> Español</p>
              <p><span className="font-semibold">Moneda:</span> Peso Cubano</p>
              <p><span className="font-semibold">Zona horaria:</span> UTC-5</p>
              <p><span className="font-semibold">Población:</span> 2.1M hab.</p>
            </div>
          </div>
        </div>
      </div>


      {displayedRelatedDestinations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Destinos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRelatedDestinations.map(destination => (
              <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-300 flex justify-center items-center relative">
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-700 text-white">{destination.category}</span>
                  {destination.rating > 4.0 && (
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white">Recomendado</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-amber-800">{destination.name}</h3>
                  <p className="text-amber-600 text-sm mb-2">📍 {destination.location}</p>
                  <p className="text-amber-600 text-sm flex-grow mb-2">{destination.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-yellow-400 text-sm">★ {destination.rating}</span>
                  </div>
                  <Link to={`/destinos/${destination.id}`} className="bg-amber-700 text-white mt-4 text-center text-sm py-2 rounded-md hover:bg-amber-800 transition-colors">
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesDestino;
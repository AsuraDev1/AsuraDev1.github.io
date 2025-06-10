import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaTag, FaArrowLeft } from 'react-icons/fa';
import { destinationService } from '../services/api';

const DetallesDestino = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [destinosRelacionados, setDestinosRelacionados] = useState([]);

  const commentsListRef = useRef(null);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const response = await destinationService.getById(id);
        const destinoData = {
          id: response.data.destino_id,
          name: response.data.nombre,
          location: response.data.provincia,
          category: response.data.categoria,
          rating: response.data.calificacion,
          description: response.data.descripcion,
          image: response.data.imagen_principal,
          gallery: response.data.galeria_imagenes || [],
          featured: response.data.destacado
        };
        setDestino(destinoData);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el destino');
      } finally {
        setLoading(false);
      }
    };

    fetchDestino();
  }, [id]);

  useEffect(() => {
    const fetchDestinosRelacionados = async () => {
      if (!destino) return;

      try {
        const response = await destinationService.getAll();
        const destinosData = response.data
          .filter(d => d.destino_id !== destino.id && d.categoria === destino.category)
          .slice(0, 3)
          .map(d => ({
            id: d.destino_id,
            name: d.nombre,
            location: d.provincia,
            category: d.categoria,
            rating: d.calificacion,
            description: d.descripcion,
            image: d.imagen_principal,
            gallery: d.galeria_imagenes || [],
            featured: d.destacado
          }));
        
        setDestinosRelacionados(destinosData);
      } catch (err) {
        console.error('Error al cargar destinos relacionados:', err);
      }
    };

    fetchDestinosRelacionados();
  }, [destino]);

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
      prevIndex === 0 ? (destino?.gallery?.length - 1 || 0) : prevIndex - 1
    );
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      (destino?.gallery && prevIndex === destino.gallery.length - 1) ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
        </div>
        <p className="text-lg text-amber-600 mt-4">Cargando destino...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <p className="text-lg text-red-600">Error: {error}</p>
        <button 
          onClick={() => navigate('/destinos')} 
          className="mt-4 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          Volver a destinos
        </button>
      </div>
    );
  }

  if (!destino) {
    return (
      <div className="w-4/5 mx-auto my-16 text-center">
        <p className="text-lg text-amber-600">No se encontró el destino</p>
        <button 
          onClick={() => navigate('/destinos')} 
          className="mt-4 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          Volver a destinos
        </button>
      </div>
    );
  }

  const currentDestinationComments = comments.filter(comment => comment.destinationId === id);

  return (
    <div className="w-4/5 mx-auto my-16">
      <button
        onClick={() => navigate('/destinos')}
        className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
      >
        <FaArrowLeft className="mr-2" />
        Volver a destinos
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          {destino.image ? (
            <img
              src={destino.image}
              alt={destino.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600">Sin imagen</span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full">
            {destino.rating} <FaStar className="inline ml-1" />
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-4">{destino.name}</h1>
          
          <div className="flex items-center text-amber-600 mb-4">
            <FaMapMarkerAlt className="mr-2" />
            <span>{destino.location}</span>
          </div>

          <div className="flex items-center text-amber-600 mb-6">
            <FaTag className="mr-2" />
            <span>{destino.category}</span>
          </div>

          <p className="text-gray-700 mb-8">{destino.description}</p>

          {destino.galeria_imagenes && destino.galeria_imagenes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-amber-800 mb-4">Galería de imágenes</h2>
              <div className="grid grid-cols-3 gap-4">
                {destino.galeria_imagenes.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen}
                    alt={`${destino.nombre} - Imagen ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {destinosRelacionados.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-amber-800 mb-4">Destinos relacionados</h2>
              <div className="grid grid-cols-3 gap-6">
                {destinosRelacionados.map((destinoRel) => (
                  <div
                    key={destinoRel.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/destinos/${destinoRel.id}`)}
                  >
                    <div className="h-48">
                      {destinoRel.image ? (
                        <img
                          src={destinoRel.image}
                          alt={destinoRel.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600">Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-amber-800 mb-2">{destinoRel.name}</h3>
                      <p className="text-amber-600 text-sm">{destinoRel.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
            ref={commentInputRef}
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
  );
};

export default DetallesDestino;
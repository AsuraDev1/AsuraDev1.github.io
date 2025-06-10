import React, { useState } from 'react';
import CommentList from './CommentList';

function BlogPostCard({
  id,
  titulo,
  contenido,
  usuario,
  fecha = new Date().toISOString(),
  likes: initialLikes = 0,
  dislikes: initialDislikes = 0,
  etiquetas = [],
  imagenes = [],
  onLike,
  onDislike,
  onComment,
  ubicacion
}) {
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [currentLikes, setCurrentLikes] = useState(initialLikes);
  const [currentDislikes, setCurrentDislikes] = useState(initialDislikes);

  const toggleCommentsList = () => {
    setShowCommentsList(!showCommentsList);
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handlePublishComment = () => {
    if (newCommentText.trim() !== '') {
      onComment(newCommentText);
      setNewCommentText('');
      setShowCommentInput(false);
    }
  };

  const handleLikeClick = () => {
    setCurrentLikes(currentLikes + 1);
    onLike();
  };

  const handleDislikeClick = () => {
    setCurrentDislikes(currentDislikes + 1);
    onDislike();
  };

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
    <div className="bg-gray-100 p-6 rounded-lg shadow text-left">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <p className="font-semibold text-amber-800 text-left">{usuario || 'Usuario Anónimo'}</p>
          <p className="text-sm text-amber-800 text-left">{formatDate(fecha)} · {ubicacion || 'Ubicación desconocida'}</p>
        </div>
      </div>
      <h2 className="text-xl text-amber-800 font-bold mb-2 text-left">{titulo}</h2>
      <p className="text-gray-700 mb-4 text-left">{contenido}</p>

      {imagenes && imagenes.length > 0 && (
        <div className="flex gap-4 mb-4">
          {imagenes.map((image, index) => (
            <div key={index} className="flex-1 h-32 bg-gray-200 rounded" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          ))}
        </div>
      )}

      <div className="mb-4 text-left">
        {etiquetas && etiquetas.map((tag, index) => (
          <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-gray-600 text-sm mt-4 pt-4 border-t border-gray-200">
        <div>
          <span className="cursor-pointer hover:underline" onClick={toggleCommentsList}>💬 Ver comentarios</span>
        </div>
        <div className="flex items-center">
          <button onClick={handleLikeClick} className="flex items-center mr-4 text-gray-600 hover:text-blue-600">
            <span>👍 {currentLikes}</span>
          </button>
          <button onClick={handleDislikeClick} className="flex items-center text-gray-600 hover:text-red-600">
            <span>👎 {currentDislikes}</span>
          </button>

          <button
            className="ml-4 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors text-sm"
            onClick={toggleCommentInput}
          >
            Comentar
          </button>
        </div>
      </div>

      {showCommentsList && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-semibold text-amber-800 mb-2">Comentarios</h4>
          <CommentList postId={id} />
        </div>
      )}

      {showCommentInput && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-amber-700 mb-4">Añadir un comentario</h3>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-gray-500 text-gray-700"
            rows="2"
            placeholder="Escribe aquí tu comentario..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors focus:outline-none"
              onClick={handlePublishComment}
            >
              Publicar comentario
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPostCard; 
import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { ENDPOINTS } from '../constants/apiEndpoints';

function CommentList({ postId }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchComentarios = async () => {
      if (!postId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${ENDPOINTS.RESPONSES.BASE}${postId}/`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 404) {
            if (isMounted) {
              setComentarios([]);
              setError(null);
              setLoading(false);
            }
            return;
          }
          throw new Error('Error al cargar los comentarios');
        }

        const data = await response.json();
        
        if (isMounted) {
          // Asegurarnos de que data sea un array y tenga la estructura correcta
          const comentariosFormateados = Array.isArray(data) ? data : [data];
          setComentarios(comentariosFormateados);
          setError(null);
        }
      } catch (err) {
        console.error('Error al cargar comentarios:', err); // Para depuración
        if (isMounted) {
          setError(err.message);
          setComentarios([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchComentarios();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Cargando comentarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (comentarios.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No hay comentarios todavía.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comentarios.map((comentario) => (
        <Comment
          key={comentario.id || comentario.post}
          autor={comentario.usuario || comentario.autor}
          contenido={comentario.contenido}
          fecha={comentario.fecha_creacion || comentario.fecha}
        />
      ))}
    </div>
  );
}

export default CommentList; 
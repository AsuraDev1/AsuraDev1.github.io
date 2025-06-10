import React, { useState, useEffect } from 'react';
import BlogPostCard from './../components/BlogPostCard';
import PublishBlogModal from './../components/PublishBlogModal';
import { postService, responseService, userService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, toggleModal } = useAuth();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      // Cargar posts
      const postsResponse = await postService.getAll();
      const posts = postsResponse.data;

      // Crear un mapa de usuarios basado en los posts
      const usersMap = {};
      posts.forEach(post => {
        if (post.usuario && !usersMap[post.usuario._id]) {
          usersMap[post.usuario._id] = post.usuario;
        }
      });

      // Cargar respuestas para cada post
      const postsWithResponses = await Promise.all(
        posts.map(async (post) => {
          try {
            const responsesResponse = await responseService.getAll();
            const postResponses = responsesResponse.data.filter(
              response => response.post === post._id
            );
            return {
              ...post,
              comentarios: postResponses.map(response => ({
                id: response._id,
                contenido: response.contenido,
                fecha: response.fecha,
                autor: response.autor || { nombre: 'Usuario Anónimo' }
              }))
            };
          } catch (err) {
            console.error('Error al cargar respuestas:', err);
            return {
              ...post,
              comentarios: []
            };
          }
        })
      );

      setBlogPosts(postsWithResponses);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishClick = () => {
    if (!user) {
      toggleModal();
      return;
    }
    setIsModalOpen(true);
  };

  const addBlogPost = async (newPostData) => {
    try {
      const postData = {
        titulo: newPostData.title,
        contenido: newPostData.content,
        etiquetas: newPostData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '').map(tag => tag.replace(/^#/, '')),
        imagenes: [],
        usuario: user._id,
        ubicacion: user.ubicacion || 'Ubicación Desconocida'
      };

      const response = await postService.create(postData);
      
      // Obtener todas las respuestas
      const responsesResponse = await responseService.getAll();
      const allResponses = responsesResponse.data;

      // Filtrar las respuestas para el nuevo post
      const postResponses = allResponses.filter(
        response => response.post === response.data._id
      );

      const newPost = {
        ...response.data,
        usuario: user,
        comentarios: postResponses.map(response => ({
          id: response.post,
          contenido: response.contenido,
          fecha: response.fecha,
          autor: response.autor || { nombre: 'Usuario Anónimo' }
        }))
      };

      setBlogPosts([newPost, ...blogPosts]);
    } catch (err) {
      console.error('Error al crear el blog:', err);
      setError('Error al publicar el blog');
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      toggleModal();
      return;
    }
    try {
      await postService.like(postId);
      cargarDatos();
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  const handleDislike = async (postId) => {
    if (!user) {
      toggleModal();
      return;
    }
    try {
      await postService.dislike(postId);
      cargarDatos();
    } catch (err) {
      console.error('Error al dar dislike:', err);
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!user) {
      toggleModal();
      return;
    }
    try {
      const commentData = {
        contenido: commentText,
        autor: user._id,
        post: postId
      };

      await responseService.create(commentData);
      
      // Obtener todas las respuestas actualizadas
      const responsesResponse = await responseService.getAll();
      const allResponses = responsesResponse.data;

      // Actualizar los posts con las nuevas respuestas
      const updatedPosts = blogPosts.map(post => {
        const postResponses = allResponses.filter(
          response => response.post === post._id
        );
        return {
          ...post,
          comentarios: postResponses.map(response => ({
            id: response._id,
            contenido: response.contenido,
            fecha: response.fecha,
            autor: response.autor || { nombre: 'Usuario Anónimo' }
          }))
        };
      });

      setBlogPosts(updatedPosts);
    } catch (err) {
      console.error('Error al comentar:', err);
    }
  };

  const totalBlogs = blogPosts.length;
  const totalLikes = blogPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const totalDislikes = blogPosts.reduce((sum, post) => sum + (post.dislikes || 0), 0);
  const totalComments = blogPosts.reduce((sum, post) => sum + (post.comentarios?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto my-16 bg-white min-h-screen rounded-lg shadow-lg p-8 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Blog de viajes</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard
              key={index}
              id={post.post_id}
              titulo={post.titulo}
              contenido={post.contenido}
              fecha={post.fecha}
              likes={post.likes}
              dislikes={post.dislikes}
              etiquetas={post.etiquetas}
              imagenes={post.imagenes}
              comentarios={post.comentarios}
              usuario={post.usuario || 'Usuario Anónimo'}
              ubicacion={post.destino.nombre || 'Ubicación desconocida'}
              onLike={() => handleLike(post._id || post.id)}
              onDislike={() => handleDislike(post._id || post.id)}
              onComment={(comment) => handleComment(post._id || post.id, comment)}
            />
          ))}
        </div>

        {user && (
          <div className="md:w-1/3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-amber-700">📊 Tus estadísticas</h3>
              <p className="text-gray-700">
                Blogs publicados: <span className="float-right font-medium text-amber-800">{totalBlogs}</span>
              </p>
              <p className="text-gray-700">
                Total de likes: <span className="float-right font-medium text-amber-800">{totalLikes}</span>
              </p>
              <p className="text-gray-700">
                Total de dislikes: <span className="float-right font-medium text-amber-800">{totalDislikes}</span>
              </p>
              <p className="text-gray-700">
                Comentarios recibidos: <span className="float-right font-medium text-amber-800">{totalComments}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        className="fixed bottom-8 right-8 bg-amber-700 text-white p-4 rounded-full shadow-lg hover:bg-amber-800 transition-colors focus:outline-none z-50"
        onClick={handlePublishClick}
        title={!user ? 'Inicia sesión para publicar' : 'Publicar nuevo blog'}
      >
        <span className="text-2xl font-bold">+</span>
      </button>

      {isModalOpen && <PublishBlogModal onClose={() => setIsModalOpen(false)} onPublish={addBlogPost} />}
    </div>
  );
}

export default BlogPage; 
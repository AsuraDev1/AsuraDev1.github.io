import React, { useState } from 'react';
import BlogPostCard from './../components/BlogPostCard';
import PublishBlogModal from './../components/PublishBlogModal';

function BlogPage() {
  const initialBlog = {
    authorName: 'Elena Rodriguez',
    authorLocation: 'Santiago de Cuba, Santiago de Cuba',
    timeAgo: 'Hace 3 semanas',
    title: 'Santiago: El alma musical de Cuba',
    content: 'Santiago de Cuba es el corazón musical del país. Cada esquina tiene música en vivo y la energía de la ciudad es contagiosa. Visité la Casa de la Trova y fue una experiencia inolvidable. El Castillo del Morro ofrece vistas espectaculares de la bahía. La comida local es deliciosa, especialmente...',
    images: [],
    tags: ['#música', '#cultura', '#gastronomia', '#historia'],
    views: 267,
    commentsCount: 11,
    likes: 54,
    dislikes: 1,
  };

  const [blogPosts, setBlogPosts] = useState([initialBlog]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const addBlogPost = (newPostData) => {
    const newPost = {
      id: blogPosts.length + 1,
      authorName: 'Usuario Nuevo',
      authorLocation: 'Ubicación Desconocida',
      timeAgo: 'Justo ahora',
      title: newPostData.title,
      content: newPostData.content,
      images: [],
      tags: newPostData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '').map(tag => `#${tag.replace(/^#/, '')}`),
      views: 0,
      commentsCount: 0,
      likes: 0,
      dislikes: 0,
    };
    setBlogPosts([newPost, ...blogPosts]);
  };


  const totalBlogs = blogPosts.length;
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalDislikes = blogPosts.reduce((sum, post) => sum + post.dislikes, 0);
  const totalComments = blogPosts.reduce((sum, post) => sum + post.commentsCount, 0);

  return (
    <div className="w-4/5 mx-auto my-16 bg-white min-h-screen rounded-lg shadow-lg p-8 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Blog de viajes</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">

        <div className="md:w-2/3 space-y-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))}

        </div>


        <div className="md:w-1/3 space-y-8">

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-amber-700">📊 Tus estadísticas</h3>
            <p className="text-gray-700">Blogs publicados: <span className="float-right font-medium text-amber-800">{totalBlogs}</span></p>
            <p className="text-gray-700">Total de likes: <span className="float-right font-medium text-amber-800">{totalLikes}</span></p>

            <p className="text-gray-700">Total de dislikes: <span className="float-right font-medium text-amber-800">{totalDislikes}</span></p>
            <p className="text-gray-700">Comentarios recibidos: <span className="float-right font-medium text-amber-800">{totalComments}</span></p>
          </div>

        </div>
      </div>


      <button
        className="fixed bottom-8 right-8 bg-amber-700 text-white p-4 rounded-full shadow-lg hover:bg-amber-800 transition-colors focus:outline-none z-50"
        onClick={toggleModal}
      >
        <span className="text-2xl font-bold">+</span>
      </button>


      {isModalOpen && <PublishBlogModal onClose={toggleModal} onPublish={addBlogPost} />}
    </div>
  );
}

export default BlogPage; 
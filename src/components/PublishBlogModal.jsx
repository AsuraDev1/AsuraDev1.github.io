import React, { useState } from 'react';

function PublishBlogModal({ onClose, onPublish }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {

    const newBlogData = {
      title,
      content,
      tags,
    };


    onPublish(newBlogData);


    setTitle('');
    setContent('');
    setTags('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="min-w-[280px] w-full max-w-sm mx-auto p-3 xs:p-4 sm:p-6 font-sans bg-stone-200 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-3 xs:mb-4 sm:mb-6">
          <h2 className="text-center text-lg xs:text-xl sm:text-2xl font-bold text-amber-800">Publicar nuevo blog</h2>
          <button className="text-gray-600 hover:text-gray-900 text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          <div className="form-group">
            <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1" htmlFor="blog-title">
              Título:
            </label>
            <input
              className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
              id="blog-title"
              type="text"
              placeholder="Título del blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1" htmlFor="blog-content">
              Contenido:
            </label>
            <textarea
              className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
              id="blog-content"
              rows="6"
              placeholder="Escribe el contenido de tu blog aquí..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1" htmlFor="blog-tags">
              Etiquetas (separadas por coma):
            </label>
            <input
              className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
              id="blog-tags"
              type="text"
              placeholder="ej: #viaje, #cultura"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>


          <div className="flex justify-end mt-3 xs:mt-4">
            <button
              className="bg-amber-700 text-white py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base rounded-md hover:bg-amber-800 transition-colors duration-300 px-4 xs:px-6"
              onClick={handleSubmit}
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishBlogModal; 
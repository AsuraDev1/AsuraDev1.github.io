import React, { useState, useEffect } from 'react';

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(image);
        img.onerror = reject;
        img.src = image.url;
      });
    };

    Promise.all(images.map(loadImage))
      .then(() => setLoading(false))
      .catch(err => console.error("Error al cargar las imágenes", err));
  }, [images]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-[95%] xs:w-11/12 sm:w-4/5 mx-auto my-4 xs:my-6 sm:my-12">
      <div className="overflow-hidden relative aspect-[4/3] xs:aspect-[16/9] sm:aspect-[21/9] rounded-md xs:rounded-lg sm:rounded-xl shadow-md xs:shadow-lg sm:shadow-2xl bg-stone-100">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-amber-800"></div>
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-full'
                }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 xs:p-3 sm:p-6 pb-4 xs:pb-8 sm:pb-16">
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-0.5 xs:mb-1 sm:mb-2">{image.title}</h3>
                <p className="text-xs xs:text-sm sm:text-base text-white/90 line-clamp-2 xs:line-clamp-none">{image.caption}</p>
              </div>
            </div>
          ))
        )}
      </div>


      <div className="absolute bottom-1 xs:bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 xs:space-x-2 sm:space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-300 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm font-medium ${index === currentIndex
                ? 'bg-white text-amber-800 scale-110'
                : 'bg-amber-700 text-white hover:bg-amber-800'
              }`}
            aria-label={`Ir a imagen ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel; 
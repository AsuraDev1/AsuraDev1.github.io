import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header'
import OfertasSection from './components/OfertasSection'
import FechasImportantesSection from './components/FechasImportantesSection'
import ImageCarousel from './components/ImageCarousel'
import PopularDestinationsSection from './components/PopularDestinationsSection'
import UniqueExperiencesSection from './components/UniqueExperiencesSection'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Destinos from './components/Destinos/Destinos'
import DetallesDestino from './pages/DetallesDestino'
import Itinerario from './pages/Itinerario'
import BlogPage from './pages/BlogPage'
import UserProfile from './components/UserProfile'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { destinationService } from './services/api'

function App() {
  const [itinerarioDestinos, setItinerarioDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialDestinos = async () => {
      try {
        const response = await destinationService.getAll();
        const destinosData = response.data;
        // Tomar los primeros tres destinos para el itinerario inicial
        const destinosIniciales = destinosData.slice(0, 3).map(destino => ({
          id: destino.destino_id,
          name: destino.nombre,
          location: destino.provincia,
          rating: destino.calificacion || 0,
          category: destino.categoria || 'Sin categoría',
          description: destino.descripcion,
          image: destino.imagen_principal,
          date: destino.destino_id === destinosData[0].destino_id ? '06/06/2024' : 
                destino.destino_id === destinosData[1].destino_id ? '07/06/2024' : '08/06/2024',
          duration: destino.destino_id === destinosData[0].destino_id ? 'Día completo' : 
                   destino.destino_id === destinosData[1].destino_id ? 'Medio día' : 'Día completo'
        }));
        setItinerarioDestinos(destinosIniciales);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los destinos');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialDestinos();
  }, []);

  const scrollToDestinos = (e) => {
    e.preventDefault();
    const destinosSection = document.getElementById('destinos-populares');
    destinosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const carouselImages = [
    {
      url: "https://oncubanews.com/wp-content/uploads/2020/02/filh-14.jpg",
      alt: "Personas en una feria del libro",
      title: "Cultura Cubana",
      caption: "Explora la rica cultura literaria de Cuba en sus ferias y eventos."
    },
    {
      url: "https://oncubanews.com/wp-content/uploads/2025/02/FILH10_2025_Otmaro.jpg",
      alt: "Niños y adultos mirando libros en un puesto al aire libre",
      title: "Lectura al Aire Libre",
      caption: "Disfruta de la lectura bajo el sol cubano en espacios abiertos dedicados a los libros."
    },
    {
      url: "https://www.granma.cu/file/img/2018/08/medium/f0117301.jpg",
      alt: "Grupo de bailarines en trajes elaborados durante el Carnaval de Santiago",
      title: "Ritmo de Carnaval",
      caption: "Vive la pasión y el color del famoso Carnaval de Santiago de Cuba."
    },
    {
      url: "https://www.buenviajeacuba.com/media/twitter/fotor_2023-3-30_17_24_55.jpg",
      alt: "Dos personas con equipo de snorkel sentadas junto a un cenote o río",
      title: "Aventura Submarina",
      caption: "Sumérgete en las cristalinas aguas cubanas y descubre su vida marina."
    },
    {
      url: "https://media2.holiplus.com/1080x810/uploads/excursion/82901/national-botanical-garden-tour-267.jpeg",
      alt: "Casa roja a la orilla de un lago con paisaje montañoso al fondo",
      title: "Paisajes de Ensueño",
      caption: "Relájate en la tranquilidad de los paisajes rurales de Cuba."
    },
    {
      url: "https://www.elrinconcubano.es/images/LOS-CARNAVALES-HABANEROS_42t56m9h.jpg",
      alt: "Comparsa y músicos en un desfile de carnaval nocturno",
      title: "Noche de Fiesta",
      caption: "La música y el baile toman las calles durante las celebraciones cubanas."
    },
    {
      url: "https://onlinetours.es/blog/wp-content/uploads/sites/3/2018/01/pinar-del-rio_DSC5426.jpg",
      alt: "Mural colorido pintado en una formación rocosa natural",
      title: "Arte en la Naturaleza",
      caption: "Admira las impresionantes obras de arte integradas en el paisaje cubano."
    }
  ];

  const { user, toggleModal } = useAuth();

  const handleAddDestination = (destino) => {
    if (!user) {
      toggleModal();
      return;
    }

    const nuevoDestinoItinerario = {
      ...destino,
      date: 'Seleccionar fecha',
      duration: 'Seleccionar duración',
      description: destino.description || 'Descripción no disponible',
      image: destino.image || destino.imagen_principal
    };
    if (!itinerarioDestinos.some(item => item.id === nuevoDestinoItinerario.id)) {
        console.log('Añadiendo destino al itinerario:', nuevoDestinoItinerario);
        setItinerarioDestinos([...itinerarioDestinos, nuevoDestinoItinerario]);
    } else {
      console.log('El destino ya está en el itinerario:', nuevoDestinoItinerario.name);
    }
  };

  const handleRemoveDestination = (destinoId) => {
    setItinerarioDestinos(itinerarioDestinos.filter(destino => destino.id !== destinoId));
  };

  return (
    <div className="font-playfair pt-20">
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={
          <>
            <main className="relative w-[80%] xs:w-4/5 mx-auto h-auto min-h-[300px] xs:min-h-[400px] sm:min-h-[500px] flex items-center">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://i0.wp.com/passporterapp.com/es/blog/wp-content/uploads/2021/02/que-ver-en-cuba.jpg?resize=1536%2C1108&ssl=1"
                  alt="El Capitolio en La Habana con coches clásicos"
                  className="w-[120%] h-full object-cover object-left rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-800/95 via-amber-800/40 to-transparent rounded-lg"></div>
              </div>
              <div className="relative w-full flex flex-col md:flex-row items-center p-4 xs:p-6">
                <div className="md:w-1/2 text-left pr-0 md:pr-12">
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 xs:mb-6">RumbaCuba: Cuba te espera con su rica historia y su encanto único</h1>
                  <p className="text-base xs:text-lg text-white/90 mb-6 xs:mb-10">Descubre las maravillas de Cuba, desde sus playas de arena blanca hasta sus ciudades coloniales llenas de música y cultura.</p>
                  <div className="flex space-x-4 xs:space-x-6">
                    <a href="#destinos-populares" onClick={scrollToDestinos} className="bg-amber-700 text-white px-4 xs:px-6 py-2 rounded-md hover:bg-amber-800 transition-colors text-sm xs:text-base">Explorar Destinos</a>
                  </div>
                </div>
              </div>
            </main>

            <div className="w-[95%] xs:w-4/5 mx-auto mt-4 xs:mt-8 mb-8 xs:mb-16">
              <h2 className="text-2xl xs:text-3xl font-bold text-amber-800 text-center mb-4 xs:mb-8">Descubre Cuba</h2>
              <ImageCarousel images={carouselImages} />
            </div>

         

            <div id="destinos-populares">
              <PopularDestinationsSection />
            </div>

            <UniqueExperiencesSection />
          </>
        } />
        <Route path="/destinos" element={<Destinos onAddDestination={handleAddDestination} />} />
        <Route path="/destinos/:id" element={<DetallesDestino onAddDestination={handleAddDestination} />} />
        <Route path="/blog" element={<BlogPage />} />

        <Route element={<ProtectedRoute />}>
           <Route path="/profile" element={<UserProfile />} />
           <Route 
             path="/itinerario" 
             element={<Itinerario 
                         itinerarioDestinos={itinerarioDestinos} 
                         onRemoveDestination={handleRemoveDestination} 
                         onAddDestination={handleAddDestination}
                       />} 
           />
        </Route>

      </Routes>

      <Footer />
    </div>
  )
}

export default App

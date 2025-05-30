import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 md:px-8 lg:px-16">

      <div className="flex flex-col md:flex-row gap-8 mb-8">

        <div className="personal-info-card bg-white rounded-lg shadow-md p-6 md:w-2/3">
          <div className="card-header flex justify-between items-center border-b border-amber-200 pb-4 mb-6">
            <h3 className="text-xl font-bold text-amber-800">Información Personal</h3>
            <button className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors duration-200 text-sm">Editar</button>
          </div>
          <div className="flex items-center mb-6">

            <div className="profile-picture relative w-24 h-24 rounded-full bg-gray-300 mr-6 flex items-center justify-center overflow-hidden">


              <img src="/assets/placeholder-avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
              <div className="camera-icon absolute bottom-0 right-0 bg-amber-500 text-white rounded-full p-1 cursor-pointer">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-1.172a2 2 0 01-1.414-.586l-.707-.707A2 2 0 009.172 2H7.828a2 2 0 00-1.414.586l-.707.707A2 2 0 014 3zm.828 2H4v10h12V5h-1.172l-.707-.707A2 2 0 0012.828 4H9.172a2 2 0 00-1.414.586l-.707.707zM9 8a3 3 0 11-6 0 3 3 0 016 0zm2 0a5 5 0 1110 0 5 5 0 01-10 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-amber-800">María González</h4>
              <p className="text-amber-600 text-sm">Miembro desde Enero 2023</p>
              <p className="text-sm text-blue-600 mt-1 cursor-pointer">Haz clic en el icono de cámara para cambiar tu foto</p>
            </div>
          </div>


          <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="info-item">
              <label className="block text-sm font-medium text-amber-700">Nombre</label>
              <input type="text" value="María" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-amber-50 p-2 text-amber-800" />
            </div>
            <div className="info-item">
              <label className="block text-sm font-medium text-amber-700">Apellidos</label>
              <input type="text" value="González" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-amber-50 p-2 text-amber-800" />
            </div>
            <div className="info-item">
              <label className="block text-sm font-medium text-amber-700">Edad</label>
              <input type="text" value="28" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-amber-50 p-2 text-amber-800" />
            </div>
            <div className="info-item">
              <label className="block text-sm font-medium text-amber-700">País de residencia</label>
              <input type="text" value="España" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-amber-50 p-2 text-amber-800" />
            </div>
            <div className="info-item md:col-span-2">
              <label className="block text-sm font-medium text-amber-700">Correo electrónico</label>
              <input type="email" value="maria.gonzalez@gmail.com" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-amber-50 p-2 text-amber-800" />
            </div>
          </div>
        </div>


        <div className="md:w-1/3 flex flex-col gap-8">

          <div className="stats-card bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-amber-800 border-b border-amber-200 pb-4 mb-4">Mis estadísticas</h3>
            <p className="text-amber-700 mb-2 text-sm">Viajes realizados: <span className="font-semibold text-amber-900">3</span></p>
            <p className="text-amber-700 mb-2 text-sm">Destinos favoritos: <span className="font-semibold text-amber-900">8</span></p>
            <p className="text-amber-700 mb-2 text-sm">Reseñas escritas: <span className="font-semibold text-amber-900">12</span></p>
            <p className="text-amber-700 text-sm">Miembro desde: <span className="font-semibold text-amber-900">Enero 2023</span></p>
          </div>


          <div className="contact-info-card bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-amber-800 border-b border-amber-200 pb-4 mb-4">Información de contacto</h3>
            <p className="text-amber-700 mb-2 text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg><span>maria.gonzalez@gmail.com</span></p>
            <p className="text-amber-700 mb-2 text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg><span>España</span></p>
            <p className="text-amber-700 text-sm flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg><span>28 años</span></p>
          </div>


          <div className="quick-actions-card bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-amber-800 border-b border-amber-200 pb-4 mb-4">Acciones rápidas</h3>
            <div className="flex flex-col space-y-3">
              <button className="text-amber-600 hover:underline text-left text-sm">Ver mis reseñas</button>
              <button className="text-amber-600 hover:underline text-left text-sm">Mis destinos favoritos</button>
              <button className="text-amber-600 hover:underline text-left text-sm">Historial de viajes</button>
            </div>
          </div>


          <div className="security-card bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-amber-800 border-b border-amber-200 pb-4 mb-4">Seguridad</h3>
            <button className="text-amber-600 hover:underline text-left text-sm">Cambiar contraseña</button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 mb-8">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default UserProfile; 
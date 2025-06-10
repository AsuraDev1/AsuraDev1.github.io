import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import axios from 'axios';

function AuthForm({ onClose }) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Configurar Axios para Django CSRF y autenticación
  useEffect(() => {
    // Configurar el nombre de la cookie y el header para CSRF
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;
    
    // Configurar el formato de las credenciales
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';

    // Agregar interceptor para asegurar que el token CSRF se envíe
    axios.interceptors.request.use(function (config) {
      // Obtener el token CSRF de las cookies
      const csrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
      
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
      
      return config;
    });
  }, []);

  const handleTabChange = (tab) => {
    setIsLogin(tab === 'login');
    setError('');
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos requeridos');
      return false;
    }

    if (!isLogin) {
      if (!fullName || !country || !age) {
        setError('Por favor completa todos los campos requeridos');
        return false;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }

      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }

      if (isNaN(age) || age < 18) {
        setError('Debes ser mayor de 18 años');
        return false;
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Por favor ingresa un email válido');
        return false;
      }

      // Validación de nombre
      if (fullName.length < 3) {
        setError('El nombre debe tener al menos 3 caracteres');
        return false;
      }

      // Validación de país
      if (country.length < 2) {
        setError('Por favor ingresa un país válido');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // Formatear las credenciales para el login
        const loginData = {
          email: email.trim().toLowerCase(),
          password: password
        };

        const response = await userService.login(loginData);
        
        if (response.data && response.data.token) {
          login({
            token: response.data.token,
            user: response.data.user
          });
          onClose();
        }
      } else {
        const userData = {
          email: email.trim().toLowerCase(),
          password: password,
          nombre: fullName.trim(),
          pais: country.trim(),
          edad: parseInt(age),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName.trim())}&background=random`
        };

        const response = await userService.register(userData);

        if (response.data && response.data.token) {
          login({
            token: response.data.token,
            user: response.data.user
          });
          onClose();
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Error en la respuesta del servidor') {
        setError('Error al procesar la respuesta del servidor');
      } else {
        setError('Error al procesar la solicitud. Por favor intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-w-[280px] w-[95%] xs:w-full max-w-sm mx-auto p-3 xs:p-4 sm:p-6 font-sans bg-stone-200 rounded-lg shadow-sm">
      <h2 className="text-center text-lg xs:text-xl sm:text-2xl font-bold text-amber-800 mb-1 xs:mb-2">Bienvenido</h2>
      <p className="text-center text-amber-600 mb-3 xs:mb-4 sm:mb-6 text-xs xs:text-sm">Inicia sesión o crea una nueva cuenta</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-center mb-3 xs:mb-4 sm:mb-6">
        <button 
          className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-none bg-amber-700 text-white cursor-pointer text-xs xs:text-sm sm:text-base transition-all duration-300 mr-1 xs:mr-2 sm:mr-4 rounded-md ${isLogin ? 'font-bold' : 'opacity-80'}`}
          onClick={() => handleTabChange('login')}
          disabled={isLogin || loading}
        >
          Iniciar Sesión
        </button>
        <button 
          className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-none bg-amber-700 text-white cursor-pointer text-xs xs:text-sm sm:text-base transition-all duration-300 rounded-md ${!isLogin ? 'font-bold' : 'opacity-80'}`}
          onClick={() => handleTabChange('register')}
          disabled={!isLogin || loading}
        >
          Registrarse
        </button>
      </div>

      <form className="space-y-2 xs:space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <div className={`w-full transition-all duration-300 ease-out ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Contraseña *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                    disabled={loading}
                  />
                  <div 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-2 xs:pr-3 flex items-center text-xs xs:text-sm leading-5 cursor-pointer"
                  >
                    👁️
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Confirmar Contraseña *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                    disabled={loading}
                  />
                  <div 
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-2 xs:pr-3 flex items-center text-xs xs:text-sm leading-5 cursor-pointer"
                  >
                    👁️
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">País *</label>
                <input
                  type="text"
                  placeholder="Selecciona tu país"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Edad *</label>
                <input
                  type="number"
                  placeholder="Tu edad"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-amber-700 text-white py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base rounded-md mt-3 xs:mt-4 hover:bg-amber-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Crear Cuenta'}
              </button>
            </div>
          </div>

          <div className={`w-full transition-all duration-300 ease-out ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Contraseña *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                    disabled={loading}
                  />
                  <div 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-2 xs:pr-3 flex items-center text-xs xs:text-sm leading-5 cursor-pointer"
                  >
                    👁️
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base rounded-md mt-3 xs:mt-4 hover:bg-amber-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuthForm; 
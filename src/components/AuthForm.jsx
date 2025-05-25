import React, { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');

  const handleTabChange = (tab) => {
    setIsLogin(tab === 'login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log('Iniciar Sesión:', { email, password });
      // Lógica de inicio de sesión aquí
    } else {
      console.log('Registrarse:', { fullName, email, password, confirmPassword, country, age });
      // Lógica de registro aquí
    }
  };

  return (
    <div className="min-w-[320px] w-full max-w-sm mx-auto p-6 font-sans bg-white rounded-lg shadow-sm">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Bienvenido</h2>
      <p className="text-center text-gray-600 mb-6 text-sm">Inicia sesión o crea una nueva cuenta</p>
      <div className="flex justify-center mb-6">
        <button 
          className={`px-4 py-2 border-none bg-transparent cursor-pointer text-base transition-all duration-300 mr-4 ${isLogin ? 'border-b-2 border-black font-bold' : 'border-b-2 border-transparent'}`}
          onClick={() => handleTabChange('login')}
          disabled={isLogin}
        >
          Iniciar Sesión
        </button>
        <button 
          className={`px-4 py-2 border-none bg-transparent cursor-pointer text-base transition-all duration-300 ${!isLogin ? 'border-b-2 border-black font-bold' : 'border-b-2 border-transparent'}`}
          onClick={() => handleTabChange('register')}
          disabled={!isLogin}
        >
          Registrarse
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          {/* Formulario de Registro */}
          <div className={`w-full transition-all duration-300 ease-out ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md box-border pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    👁️
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md box-border pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    👁️
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">País</label>
                <input
                  type="text"
                  placeholder="Selecciona tu país"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Edad</label>
                <input
                  type="number"
                  placeholder="Tu edad"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition-colors duration-300">Crear Cuenta</button>
            </div>
          </div>

          {/* Formulario de Inicio de Sesión */}
          <div className={`w-full transition-all duration-300 ease-out ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-sm mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md box-border pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    👁️
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition-colors duration-300">Iniciar Sesión</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuthForm; 
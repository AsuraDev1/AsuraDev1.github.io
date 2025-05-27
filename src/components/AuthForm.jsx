import React, { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="flex justify-center mb-3 xs:mb-4 sm:mb-6">
        <button 
          className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-none bg-amber-700 text-white cursor-pointer text-xs xs:text-sm sm:text-base transition-all duration-300 mr-1 xs:mr-2 sm:mr-4 rounded-md ${isLogin ? 'font-bold' : 'opacity-80'}`}
          onClick={() => handleTabChange('login')}
          disabled={isLogin}
        >
          Iniciar Sesión
        </button>
        <button 
          className={`px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-none bg-amber-700 text-white cursor-pointer text-xs xs:text-sm sm:text-base transition-all duration-300 rounded-md ${!isLogin ? 'font-bold' : 'opacity-80'}`}
          onClick={() => handleTabChange('register')}
          disabled={!isLogin}
        >
          Registrarse
        </button>
      </div>

      <form className="space-y-2 xs:space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          {/* Formulario de Registro */}
          <div className={`w-full transition-all duration-300 ease-out ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
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
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
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
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">País</label>
                <input
                  type="text"
                  placeholder="Selecciona tu país"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Edad</label>
                <input
                  type="number"
                  placeholder="Tu edad"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                />
              </div>
              <button type="submit" className="w-full bg-amber-700 text-white py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base rounded-md mt-3 xs:mt-4 hover:bg-amber-800 transition-colors duration-300">Crear Cuenta</button>
            </div>
          </div>

          {/* Formulario de Inicio de Sesión */}
          <div className={`w-full transition-all duration-300 ease-out ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                />
              </div>
              <div className="form-group">
                <label className="block text-amber-600 text-xs xs:text-sm mb-0.5 xs:mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base border border-amber-700 rounded-md box-border pr-8 xs:pr-10 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-amber-800 text-amber-800"
                  />
                  <div 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-2 xs:pr-3 flex items-center text-xs xs:text-sm leading-5 cursor-pointer"
                  >
                    👁️
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-700 text-white py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base rounded-md mt-3 xs:mt-4 hover:bg-amber-800 transition-colors duration-300">Iniciar Sesión</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuthForm; 
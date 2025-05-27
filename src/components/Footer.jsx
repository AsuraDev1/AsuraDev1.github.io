import React from 'react';


function Footer() {
  return (
    <footer className="bg-amber-800 text-white p-8">
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-stone-200 mb-4">RumbaCuba</h3>
          <p className="text-sm">Tu portal para descubrir la belleza y la cultura de Cuba. Ofrecemos experiencias auténticas y memorables.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-stone-200 mb-4 text-center">Redes Sociales</h3>
          <div className="grid grid-cols-2 gap-4 place-items-center w-fit mx-auto">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968958.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://cdn-icons-png.flaticon.com/128/1384/1384031.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://cdn-icons-png.flaticon.com/128/4494/4494467.png" alt="Youtube" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-stone-200 mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-stone-200 transition-all duration-300">Política de Privacidad</a></li>
            <li><a href="#" className="text-sm hover:text-stone-200 transition-all duration-300">Términos y Condiciones</a></li>
            <li><a href="#" className="text-sm hover:text-stone-200 transition-all duration-300">FAQs</a></li>
            <li><a href="#" className="text-sm hover:text-stone-200 transition-all duration-300">Sobre Nosotros</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-stone-200 mb-4">Contáctenos</h3>
          <p className="text-sm mb-2">✉️ info@rumbacuba.com</p>
          <p className="text-sm">📞 +53 7 123 4567</p>
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-stone-200">
        RumbaCuba © 2025 Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer; 
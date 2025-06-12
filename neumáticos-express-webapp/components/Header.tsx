
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, PhoneIcon, EmailIcon, WhatsAppIcon, SearchIcon } from './IconComponents';
import { useQuote } from '../hooks/useQuote';

const Header: React.FC = () => {
  const { totalItems } = useQuote();

  return (
    <header className="bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-gray-800 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>¡Consulte con nuestros agentes para opciones de envío!</span>
          <div className="flex items-center space-x-3">
            <a href="mailto:info@neumaticosexpress.com" className="flex items-center hover:text-red-400">
              <EmailIcon className="w-4 h-4 mr-1" /> info@neumaticosexpress.com
            </a>
            <a href="tel:+1234567890" className="flex items-center hover:text-red-400">
              <PhoneIcon className="w-4 h-4 mr-1" /> +1234 567 890
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-red-400">
              <WhatsAppIcon className="w-4 h-4 mr-1" /> WhatsApp
            </a>
            <Link to="/contact" className="hover:text-red-400">Contacto</Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-red-600 mb-4 md:mb-0">
          Neumáticos<span className="text-gray-700">Express</span>
        </Link>
        <nav className="flex flex-wrap justify-center md:justify-start items-center space-x-3 sm:space-x-6 text-sm font-medium text-gray-600 mb-4 md:mb-0">
          <Link to="/catalog?category=Neumáticos" className="hover:text-red-600">Neumáticos</Link>
          <Link to="/catalog?category=Llantas" className="hover:text-red-600">Llantas</Link>
          <Link to="/catalog?category=Paquetes" className="hover:text-red-600">Paquetes</Link>
          <Link to="/services" className="hover:text-red-600">Servicios</Link>
          <Link to="/offers" className="hover:text-red-600">Ofertas</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input 
              type="search" 
              placeholder="Buscar productos..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-red-500 focus:border-red-500"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <Link to="/quote-request" className="relative text-gray-600 hover:text-red-600 p-2">
            <ShoppingCartIcon className="w-7 h-7" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="ml-1 hidden lg:inline text-sm">Mis Cotizaciones</span>
          </Link>
          {/* <button className="text-gray-600 hover:text-red-600 p-2">
            <UserIcon className="w-7 h-7" />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon, PhoneIcon, WhatsAppIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h5 className="text-xl font-bold text-white mb-4">Neumáticos Express</h5>
            <p className="text-sm mb-4">
              Explore nuestro catálogo y contacte a un agente para su compra. Le ofrecemos la mejor selección y asesoría experta.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-400">Inicio</Link></li>
              <li><Link to="/catalog" className="hover:text-red-400">Catálogo</Link></li>
              <li><Link to="/contact" className="hover:text-red-400">Contáctanos</Link></li>
              <li><Link to="/faq" className="hover:text-red-400">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Asistencia al Cliente</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact-agent" className="hover:text-red-400">Contactar a un Agente</Link></li>
              <li><Link to="/quote-process" className="hover:text-red-400">Proceso de Solicitud</Link></li>
              <li><Link to="/shipping-info" className="hover:text-red-400">Información de Envío</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contáctanos</h5>
            <address className="text-sm not-italic space-y-2">
              <p>Neumáticos Express 123, Ciudad Auto, EE. UU.</p>
              <p className="flex items-center"><EmailIcon className="w-4 h-4 mr-2 text-red-400" /> <a href="mailto:info@neumaticosexpress.com" className="hover:text-red-400">info@neumaticosexpress.com</a></p>
              <p className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-red-400" /> <a href="tel:+1234567890" className="hover:text-red-400">(123) 456-7890</a></p>
              <p className="flex items-center"><WhatsAppIcon className="w-4 h-4 mr-2 text-red-400" /> <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">Chatea con nosotros</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Neumáticos Express. Todos los derechos reservados.</p>
          <div className="mt-2">
            <Link to="/privacy-policy" className="hover:text-red-400 mx-2">Política de Privacidad</Link> | 
            <Link to="/terms-of-service" className="hover:text-red-400 mx-2">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import { QuoteProvider } from './hooks/useQuote';
import { ChatBubbleIcon } from './components/IconComponents';

const App: React.FC = () => {
  return (
    <QuoteProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/quote-request" element={<QuoteRequestPage />} />
              {/* Placeholder routes for links in header/footer */}
              <Route path="/contact" element={<StaticPage title="Contáctanos" content="Información de contacto y formulario." />} />
              <Route path="/services" element={<StaticPage title="Servicios" content="Detalles sobre nuestros servicios." />} />
              <Route path="/offers" element={<StaticPage title="Ofertas" content="Vea nuestras ofertas actuales." />} />
              <Route path="/faq" element={<StaticPage title="Preguntas Frecuentes" content="Respuestas a preguntas comunes." />} />
              <Route path="/contact-agent" element={<StaticPage title="Contactar Agente" content="Información para contactar un agente." />} />
              <Route path="/quote-process" element={<StaticPage title="Proceso de Solicitud" content="Cómo funciona nuestro proceso de solicitud." />} />
              <Route path="/shipping-info" element={<StaticPage title="Información de Envío" content="Detalles sobre envíos." />} />
              <Route path="/privacy-policy" element={<StaticPage title="Política de Privacidad" content="Nuestra política de privacidad." />} />
              <Route path="/terms-of-service" element={<StaticPage title="Términos de Servicio" content="Nuestros términos de servicio." />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          {/* Floating Chat Button */}
          <button
            title="Chatear con un agente"
            className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
            onClick={() => alert('Función de chat no implementada.')}
          >
            <ChatBubbleIcon className="w-8 h-8" />
          </button>
        </div>
      </HashRouter>
    </QuoteProvider>
  );
};

// Placeholder for static pages
const StaticPage: React.FC<{title: string, content: string}> = ({title, content}) => (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
            <p>{content}</p>
            <p className="mt-4 text-sm text-gray-500">Esta página es un marcador de posición. El contenido completo se agregaría aquí.</p>
        </div>
    </div>
);


export default App;

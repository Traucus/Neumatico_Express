import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuote } from '../hooks/useQuote';
import { ContactDetails, QuoteItem } from '../types';
import QuantityInput from '../components/QuantityInput';
import { XMarkIcon, ShoppingCartIcon } from '../components/IconComponents';

type QuoteStep = 'review' | 'contact' | 'confirmation';

const QuoteRequestPage: React.FC = () => {
  const { items, removeItem, updateItemQuantity, subtotal, totalItems, clearQuote } = useQuote();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<QuoteStep>('review');
  
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactDetails>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactDetails]) {
        setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ContactDetails> = {};
    if (!contactDetails.fullName.trim()) errors.fullName = 'El nombre completo es requerido.';
    if (!contactDetails.email.trim()) {
        errors.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
        errors.email = 'El formato del correo no es válido.';
    }
    if (!contactDetails.phone.trim()) {
        errors.phone = 'El número de teléfono es requerido.';
    } else if (!/^\+?[0-9\s-]{7,20}$/.test(contactDetails.phone)) { // Simple phone validation
        errors.phone = 'El formato del teléfono no es válido.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'contact' && validateForm()) {
      // Simulate submission
      console.log('Solicitud enviada:', { items, contactDetails });
      setCurrentStep('confirmation');
      // In a real app, clearQuote() might be called after successful backend confirmation.
      // For now, let's keep items for confirmation page and clear them when navigating away or starting new quote.
    }
  };

  const shippingCost = "A confirmar"; // Example
  const taxAmount = "A confirmar"; // Example
  const totalEstimated = subtotal; // For review step. Contact step has "Consultar con Agente"

  if (currentStep === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white shadow-lg rounded-lg my-10">
        <ShoppingCartIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Gracias, {contactDetails.fullName}. Hemos recibido su solicitud de cotización. Un agente se pondrá en contacto con usted pronto al correo {contactDetails.email} o al teléfono {contactDetails.phone}.
        </p>
        <div className="mb-8 border-t border-b py-4">
            <h3 className="text-lg font-semibold mb-2">Resumen de su solicitud:</h3>
            {items.map(item => (
                <div key={item.product.id} className="text-sm text-gray-500">
                    {item.product.name} (Cantidad: {item.quantity})
                </div>
            ))}
        </div>
        <div className="space-x-4">
          <Link to="/catalog" onClick={clearQuote} className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors">
            Seguir Explorando
          </Link>
          <Link to="/" onClick={clearQuote} className="text-red-600 border border-red-600 py-3 px-6 rounded-md hover:bg-red-50 transition-colors">
            Ir a Inicio
          </Link>
        </div>
      </div>
    );
  }


  if (totalItems === 0) { // Fixed: Removed redundant `&& currentStep !== 'confirmation'`
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">Su solicitud está vacía</h2>
        <p className="text-gray-500 mt-2 mb-6">Añada productos a su solicitud para continuar.</p>
        <Link to="/catalog" className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors">
          Explorar Catálogo
        </Link>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {currentStep === 'review' ? 'Revise su Solicitud' : 'Detalles de Contacto'}
      </h1>
      <p className="text-gray-600 mb-8">
        {currentStep === 'review' 
            ? 'Verifique los artículos y cantidades antes de continuar.' 
            : 'Por favor, complete sus datos para que un agente pueda contactarle.'}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Items or Form) */}
        <div className="lg:col-span-2">
          {currentStep === 'review' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Artículos Seleccionados ({totalItems})</h2>
              {items.map((item: QuoteItem) => (
                <div key={item.product.id} className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4" />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.specifications.size}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="my-4 sm:my-0 sm:mx-4">
                    <QuantityInput 
                      quantity={item.quantity}
                      onDecrease={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                      onIncrease={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                      onChange={(newQuantity) => updateItemQuantity(item.product.id, newQuantity)}
                    />
                  </div>
                  <div className="text-lg font-semibold text-gray-800 w-28 text-center sm:text-right">${(item.product.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.product.id)} className="ml-2 sm:ml-4 text-gray-400 hover:text-red-500 p-2" aria-label="Remover item">
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {currentStep === 'contact' && (
            <form onSubmit={handleSubmitRequest} id="contact-form-id" className="bg-white p-6 rounded-lg shadow-lg space-y-6"> {/* Added id to form for external button submission */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" name="fullName" id="fullName" value={contactDetails.fullName} onChange={handleInputChange} className={`w-full p-2 border rounded-md ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Introduzca su nombre completo" />
                {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input type="email" name="email" id="email" value={contactDetails.email} onChange={handleInputChange} className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="Introduzca su correo electrónico" />
                  {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
                  <input type="tel" name="phone" id="phone" value={contactDetails.phone} onChange={handleInputChange} className={`w-full p-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Introduzca su número de teléfono" />
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección (Opcional)</label>
                <textarea name="address" id="address" value={contactDetails.address} onChange={handleInputChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Introduzca su dirección si desea envío"></textarea>
              </div>
               {/* Reminder of items */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Items Seleccionados</h3>
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm py-1">
                    <span className="text-gray-600">{item.product.name} (x{item.quantity})</span>
                    <span className="text-gray-800 font-medium">Precio: Consultar</span>
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>

        {/* Summary Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Resumen de la Solicitud</h2>
            {currentStep === 'review' ? (
              <>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal Estimado:</span>
                    <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío Estimado:</span>
                    <span className="font-medium text-gray-800">{shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuesto Estimado:</span>
                    <span className="font-medium text-gray-800">{taxAmount}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-800">Total Estimado:</span>
                    <span className="text-red-600">${totalEstimated.toFixed(2)} (A confirmar)</span>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentStep('contact')}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold mt-8 text-lg"
                >
                  Continuar a Contacto
                </button>
              </>
            ) : ( // Contact Step Summary
              <>
                <div className="space-y-3 mb-6 text-sm">
                  <p className="text-gray-600">Un agente se pondrá en contacto con usted para confirmar los detalles de su solicitud y el precio final.</p>
                </div>
                 <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-800">Total Estimado:</span>
                    <span className="text-red-600">Consultar con Agente</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  form="contact-form-id" // Associate with the form by its ID
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold mt-8 text-lg"
                >
                  Enviar Solicitud a Agente
                </button>
                 <button 
                  onClick={() => setCurrentStep('review')}
                  className="w-full text-center text-red-600 py-2 px-4 rounded-md hover:bg-red-50 transition-colors duration-200 font-medium mt-3 text-sm"
                >
                  Volver a Revisar Artículos
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuoteRequestPage;

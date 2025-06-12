
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ReviewStars from './ReviewStars';
import { useQuote } from '../hooks/useQuote';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useQuote();

  const handleAddToQuote = () => {
    addItem(product);
    // Optionally: show a notification
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.tags.map(tag => (
                 <span key={tag} className={`px-2 py-1 text-xs font-semibold text-white rounded
                  ${tag === 'Más Popular' ? 'bg-red-500' : ''}
                  ${tag === 'Nuevo' ? 'bg-green-500' : ''}
                  ${tag === 'Oferta' ? 'bg-yellow-500' : ''}
                 `}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={product.name}>{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <div className="flex items-center mb-2">
            <ReviewStars rating={product.rating} starSize="w-4 h-4" />
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </p>
        </div>
        <button 
          onClick={handleAddToQuote}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold text-sm"
        >
          Añadir a Solicitud
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

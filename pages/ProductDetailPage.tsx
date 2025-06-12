
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Review } from '../types';
import { mockProducts, mockReviews } from '../data/mockData';
import ReviewStars from '../components/ReviewStars';
import { useQuote } from '../hooks/useQuote';
import LoadingSpinner from '../components/LoadingSpinner';
import { ShoppingCartIcon, ChatBubbleIcon, HeartIcon } from '../components/IconComponents';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useQuote();

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.imageUrl); // Main image first
        const productReviews = mockReviews.filter(r => r.productId === id);
        setReviews(productReviews);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAddToQuote = () => {
    if (product) {
      addItem(product, quantity);
      // Optionally show notification
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Cargando detalles del producto..." />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Producto no encontrado</h2>
        <p className="text-gray-500 mt-2">El producto que busca no existe o no está disponible.</p>
        <Link to="/catalog" className="mt-6 inline-block bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.images || [])];
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : product.rating;
  
  // Rating distribution calculation
  const ratingDistribution: { [key: number]: { count: number; percentage: number } } = { 5: {count:0, percentage:0}, 4: {count:0, percentage:0}, 3: {count:0, percentage:0}, 2: {count:0, percentage:0}, 1: {count:0, percentage:0} };
  reviews.forEach(review => {
    ratingDistribution[review.rating].count++;
  });
  if(reviews.length > 0) {
    for (let i = 1; i <= 5; i++) {
        ratingDistribution[i].percentage = (ratingDistribution[i].count / reviews.length) * 100;
    }
  }


  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6 text-gray-600">
          <Link to="/" className="hover:text-red-600">Inicio</Link> &gt; 
          <Link to="/catalog" className="hover:text-red-600"> Catálogo</Link> &gt; 
          <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-red-600"> {product.category}</Link> &gt; 
          <span className="font-semibold"> {product.name}</span>
        </nav>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden border">
                <img src={selectedImage} alt={product.name} className="w-full h-auto max-h-[500px] object-contain aspect-square" />
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(img)}
                      className={`border rounded-md overflow-hidden p-1 ${selectedImage === img ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-md text-gray-500 mb-3">Marca: <Link to={`/catalog?brand=${product.brand}`} className="text-red-600 hover:underline">{product.brand}</Link></p>
              
              <div className="flex items-center mb-4">
                <ReviewStars rating={averageRating} />
                <span className="ml-2 text-sm text-gray-600">({reviews.length > 0 ? reviews.length : product.reviewCount} reseñas)</span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{product.descriptionShort}</p>
              {product.descriptionLong && <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.descriptionLong}</p>}

              <div className="mb-6">
                <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <span className="mr-3 text-sm font-medium text-gray-700">Cantidad:</span>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300">-</button>
                  <input type="number" value={quantity} readOnly className="w-12 text-center border-t border-b border-gray-200 py-1" />
                  <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                <button 
                  onClick={handleAddToQuote}
                  className="w-full sm:w-auto flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold flex items-center justify-center"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" /> Añadir a Solicitud
                </button>
                <button className="w-full sm:w-auto flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-200 font-semibold flex items-center justify-center">
                  <ChatBubbleIcon className="w-5 h-5 mr-2" /> Contactar Agente
                </button>
                 <button className="p-3 border border-gray-300 rounded-md text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                 </button>
              </div>
              <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Especificaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => {
                if (value === undefined || value === null) return null;
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-600">{label}:</span>
                    <span className="text-gray-800">{typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value.toString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reseñas de Clientes</h2>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                    <p className="text-5xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
                    <ReviewStars rating={averageRating} starSize="w-7 h-7" />
                    <p className="text-sm text-gray-600 mt-2">Basado en {reviews.length} reseñas</p>
                </div>
                <div className="md:col-span-2">
                    {Object.entries(ratingDistribution).reverse().map(([star, data]) => (
                        <div key={star} className="flex items-center mb-1">
                            <span className="text-sm text-yellow-500 mr-1">{star} ★</span>
                            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                                <div className="bg-yellow-400 h-4 rounded-full" style={{ width: `${data.percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8 text-right">{data.percentage.toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Aún no hay reseñas para este producto.</p>
            )}

            <div className="mt-8 space-y-6">
              {reviews.slice(0, 3).map(review => ( // Show first 3 reviews
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <ReviewStars rating={review.rating} starSize="w-4 h-4"/>
                    <h4 className="ml-3 font-semibold text-gray-800">{review.customerName}</h4>
                    {review.verifiedPurchase && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Compra Verificada</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
              {reviews.length > 3 && (
                <button className="mt-6 text-red-600 hover:text-red-800 font-medium">
                  Cargar más reseñas ({reviews.length - 3} más)
                </button>
              )}
            </div>
            {/* Add Review Form (Placeholder) */}
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Escribir una reseña</h3>
                <p className="text-sm text-gray-600">Comparta su opinión con otros clientes.</p>
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Escribir reseña</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

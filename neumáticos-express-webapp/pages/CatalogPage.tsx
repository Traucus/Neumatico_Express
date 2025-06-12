
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { Product, TireCategory } from '../types';
import { mockProducts, mockBrands, tireSizes, vehicleTypes } from '../data/mockData';
import ReviewStars from '../components/ReviewStars';
import { ChevronDownIcon, SearchIcon } from '../components/IconComponents';
import LoadingSpinner from '../components/LoadingSpinner';


const PRODUCTS_PER_PAGE = 12;

const CatalogPage: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]); // Example range
  
  // Tire specific filters
  const [selectedWidth, setSelectedWidth] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [selectedDiameter, setSelectedDiameter] = useState<string>('');

  // Sorting
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSelectedBrand(queryParams.get('brand') || '');
    setSelectedCategory(queryParams.get('category') || '');
    setSearchTerm(queryParams.get('query') || '');
    setSelectedVehicleType(queryParams.get('vehicleType') || '');
    setSelectedWidth(queryParams.get('width') || '');
    setSelectedProfile(queryParams.get('profile') || '');
    setSelectedDiameter(queryParams.get('diameter') || '');
    setCurrentPage(1); // Reset to first page on filter change
  }, [location.search]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = mockProducts;

      if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (selectedBrand) {
        filtered = filtered.filter(p => p.brand === selectedBrand);
      }
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
      if (selectedVehicleType){
        // This is a placeholder. Real vehicle type filtering would be complex
        // and require mapping products to vehicle types.
        // For now, it won't filter much unless products have specific vehicle type data.
      }
      if (selectedWidth) {
         filtered = filtered.filter(p => p.specifications.width === parseInt(selectedWidth));
      }
      if (selectedProfile) {
          filtered = filtered.filter(p => p.specifications.profile === parseInt(selectedProfile));
      }
      if (selectedDiameter) {
          filtered = filtered.filter(p => p.specifications.diameter === parseInt(selectedDiameter));
      }
      
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // Sorting logic
      if (sortBy === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'popularity') {
        filtered.sort((a, b) => (b.reviewCount * b.rating) - (a.reviewCount * a.rating)); // Simple popularity metric
      }
      // 'relevance' (default) would typically be handled by backend search algorithm

      setProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchTerm, selectedBrand, selectedCategory, selectedVehicleType, selectedWidth, selectedProfile, selectedDiameter, priceRange, sortBy, location.search]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);


  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The useEffect listening to `searchTerm` will trigger filtering
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs (optional, simple example) */}
      <nav className="text-sm mb-4 text-gray-600">
        <Link to="/" className="hover:text-red-600">Inicio</Link> &gt; 
        <span className="font-semibold"> Catálogo</span>
        {selectedCategory && ` > ${selectedCategory}`}
        {selectedBrand && ` > ${selectedBrand}`}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Filtrar Por</h3>
          
          <div className="mb-6">
            <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <div className="relative">
              <select 
                id="brand-filter" 
                value={selectedBrand} 
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none"
              >
                <option value="">Todas las Marcas</option>
                {mockBrands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}
              </select>
              <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
             <div className="relative">
                <select 
                    id="category-filter" 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none"
                >
                    <option value="">Todas las Categorías</option>
                    {Object.values(TireCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
              Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input 
              type="range" 
              id="price-range-min"
              min="0" 
              max="500" // Example max price
              value={priceRange[0]}
              onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 mb-2" 
            />
            <input 
              type="range" 
              id="price-range-max"
              min="0" 
              max="500" // Example max price
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" 
            />
          </div>

          <h4 className="text-md font-semibold mb-2 text-gray-700 mt-6">Medida del Neumático</h4>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div>
              <label htmlFor="width-filter" className="block text-xs font-medium text-gray-600">Ancho</label>
              <select id="width-filter" value={selectedWidth} onChange={e => setSelectedWidth(e.target.value)} className="w-full text-xs p-1 border-gray-300 rounded-md"> <option value="">Todo</option> {tireSizes.widths.map(w=><option key={w} value={w}>{w}</option>)} </select>
            </div>
            <div>
              <label htmlFor="profile-filter" className="block text-xs font-medium text-gray-600">Perfil</label>
              <select id="profile-filter" value={selectedProfile} onChange={e => setSelectedProfile(e.target.value)} className="w-full text-xs p-1 border-gray-300 rounded-md"> <option value="">Todo</option> {tireSizes.profiles.map(p=><option key={p} value={p}>{p}</option>)} </select>
            </div>
            <div>
              <label htmlFor="diameter-filter" className="block text-xs font-medium text-gray-600">Rin</label>
              <select id="diameter-filter" value={selectedDiameter} onChange={e => setSelectedDiameter(e.target.value)} className="w-full text-xs p-1 border-gray-300 rounded-md"> <option value="">Todo</option> {tireSizes.diameters.map(d=><option key={d} value={d}>{d}"</option>)} </select>
            </div>
          </div>
          <button onClick={() => { setSelectedBrand(''); setSelectedCategory(''); setPriceRange([0,500]); setSelectedWidth(''); setSelectedProfile(''); setSelectedDiameter(''); setSearchTerm('');}} className="w-full mt-4 text-sm text-red-600 hover:text-red-800">Limpiar Filtros</button>


        </aside>

        {/* Products Grid and Controls */}
        <main className="md:col-span-3">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto flex-grow sm:max-w-md">
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre, marca..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-red-500 focus:border-red-500"
                  />
                  <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </form>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600 hidden sm:inline">Ordenar por:</span>
                <div className="relative flex-grow sm:flex-grow-0">
                    <select 
                        value={sortBy} 
                        onChange={e => setSortBy(e.target.value)}
                        className="w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md appearance-none"
                    >
                        <option value="relevance">Relevancia</option>
                        <option value="price_asc">Precio: Bajo a Alto</option>
                        <option value="price_desc">Precio: Alto a Bajo</option>
                        <option value="popularity">Más Populares</option>
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Mostrando {currentProducts.length} de {products.length} neumáticos</p>
          </div>

          {isLoading ? (
            <LoadingSpinner text="Cargando neumáticos..." />
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron neumáticos</h3>
              <p className="text-gray-500">Intente ajustar sus filtros o términos de búsqueda.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;

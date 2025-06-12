
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product, TireCategory } from '../types';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockBrands, tireSizes, vehicleTypes } from '../data/mockData';
import { SearchIcon, ChevronDownIcon } from '../components/IconComponents';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchVehicleType, setSearchVehicleType] = useState(vehicleTypes[0]);
  const [searchWidth, setSearchWidth] = useState(tireSizes.widths[2]);
  const [searchProfile, setSearchProfile] = useState(tireSizes.profiles[5]);
  const [searchDiameter, setSearchDiameter] = useState(tireSizes.diameters[2]);

  const popularProducts = mockProducts.filter(p => p.tags?.includes('Más Popular')).slice(0, 4);
  const newProducts = mockProducts.filter(p => p.tags?.includes('Nuevo')).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchVehicleType) queryParams.append('vehicleType', searchVehicleType);
    if (searchWidth) queryParams.append('width', searchWidth);
    if (searchProfile) queryParams.append('profile', searchProfile);
    if (searchDiameter) queryParams.append('diameter', searchDiameter);
    navigate(`/catalog?${queryParams.toString()}`);
  };
  
  const categoryLinks = [
    { name: TireCategory.SUMMER, image: 'https://picsum.photos/seed/summercat/400/300' },
    { name: TireCategory.ALL_SEASON, image: 'https://picsum.photos/seed/allseasoncat/400/300' },
    { name: TireCategory.WINTER, image: 'https://picsum.photos/seed/wintercat/400/300' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-800 text-white py-20 md:py-32" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1200/600')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Encuentre sus Neumáticos Ideales</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Explore nuestro extenso catálogo y solicite asistencia de nuestros agentes expertos para finalizar su compra.</p>
          <Link to="/catalog" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300">
            Explorar Catálogo
          </Link>
        </div>
      </section>

      {/* Tire Search Form */}
      <section className="bg-white py-12 -mt-10 relative z-20 mx-4 md:mx-auto max-w-5xl rounded-lg shadow-xl">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Busque Neumáticos Fácilmente</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo</label>
              <div className="relative">
                <select id="vehicleType" value={searchVehicleType} onChange={(e) => setSearchVehicleType(e.target.value)} className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none">
                  {vehicleTypes.map(vt => <option key={vt} value={vt}>{vt}</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Ancho</label>
              <div className="relative">
                <select id="width" value={searchWidth} onChange={(e) => setSearchWidth(e.target.value)} className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none">
                  {tireSizes.widths.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
              <div className="relative">
                <select id="profile" value={searchProfile} onChange={(e) => setSearchProfile(e.target.value)} className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none">
                  {tireSizes.profiles.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="diameter" className="block text-sm font-medium text-gray-700 mb-1">Rin</label>
              <div className="relative">
                <select id="diameter" value={searchDiameter} onChange={(e) => setSearchDiameter(e.target.value)} className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md appearance-none">
                  {tireSizes.diameters.map(d => <option key={d} value={d}>{d}"</option>)}
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center text-sm md:text-base">
              <SearchIcon className="w-5 h-5 mr-2" /> Buscar Neumáticos
            </button>
          </form>
           <p className="text-xs text-gray-500 mt-4 text-center md:text-left">También puede buscar por <Link to="/catalog?searchBy=vehicle" className="text-red-600 hover:underline">marca y modelo de vehículo</Link>.</p>
        </div>
      </section>

      {/* Quick Catalog Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Catálogo Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoryLinks.map((cat) => (
              <Link key={cat.name} to={`/catalog?category=${encodeURIComponent(cat.name)}`} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <img src={cat.image} alt={cat.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Populares en el Catálogo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center">
              <img src="https://picsum.photos/seed/deliverytruck/100/100" alt="Entrega Rápida" className="w-20 h-20 mr-6 rounded-full"/>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Entrega Rápida Garantizada</h3>
                <p className="text-gray-600">Una vez que su agente confirme su pedido, reciba sus neumáticos en tiempo récord. Vuelva a la carretera nunca fue tan fácil.</p>
                <button className="mt-4 bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition-colors text-sm font-medium">Consultar con Agente</button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center">
              <img src="https://picsum.photos/seed/agent/100/100" alt="Asistencia Experta" className="w-20 h-20 mr-6 rounded-full"/>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Asistencia de Agente Experto</h3>
                <p className="text-gray-600">Nuestros amables expertos están disponibles para ayudarle a seleccionar los neumáticos perfectos, coordinar la compra y resolver cualquier duda.</p>
                <button className="mt-4 bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition-colors text-sm font-medium">Contactar Agente</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Comprar por Marca</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mockBrands.map((brand) => (
              <Link key={brand.id} to={`/catalog?brand=${brand.name}`} className="group flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <img src={brand.logoUrl} alt={brand.name} className="h-12 mb-2 object-contain group-hover:scale-105 transition-transform" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">{brand.name}</span>
              </Link>
            ))}
             <Link to="/catalog/brands" className="group flex flex-col items-center justify-center p-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:shadow-lg transition-all duration-200">
                <SearchIcon className="h-10 w-10 mb-2"/>
                <span className="text-sm font-medium">Ver Todas</span>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

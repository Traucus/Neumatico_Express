
export enum TireCategory {
  SUMMER = "Neumáticos de Verano",
  ALL_SEASON = "Neumáticos Todo Tiempo",
  WINTER = "Neumáticos de Invierno",
  PERFORMANCE = "Neumáticos de Rendimiento",
  OFF_ROAD = "Neumáticos Todoterreno",
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku?: string;
  descriptionShort: string;
  descriptionLong?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  category: TireCategory;
  tags?: string[]; // e.g., "Más Popular", "Nuevo"
  rating: number;
  reviewCount: number;
  specifications: {
    size: string; // e.g., "245/40ZR18"
    loadIndex: string; // e.g., "97Y"
    speedIndex: string; // e.g., "Y"
    warranty?: string; // e.g., "50,000 millas"
    treadDepth?: string; // e.g., "10/32"
    construction?: string; // e.g., "Radial"
    runFlat?: boolean;
    width?: number;
    profile?: number;
    diameter?: number;
  };
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  date: string; 
  rating: number; 
  comment: string;
  verifiedPurchase?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface TireSearchFilters {
  vehicleType?: string;
  width?: string;
  profile?: string;
  diameter?: string;
  brand?: string;
  model?: string; // vehicle model
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}

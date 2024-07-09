export interface IProduct {
  id: number;
  category: number;
  title: string;
  images: string[];
  price: number;
}

export interface IProductDetails {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: SizeType[];
}

interface SizeType {
  size: string;
  available: boolean;
}

export interface IProductInCart {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
  totalCost: number;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface ISearchOptions {
  categoryId: number | null;
  offset: number;
  searchText: string;
}

export interface IOrder {
  owner: {
    phone: string;
    address: string;
  };
  items: IProductInCart[];
}

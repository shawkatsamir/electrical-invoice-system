export interface Company {
  id: number;
  name: string;
  logo: string;
  productsCount: number;
  accountBalance: number;
  lastDelivery: string;
  totalDelivered: number;
  deliveredPerMonth: number;
  phone: string;
  email: string;
  address: string;
  establishedYear: number;
}

export interface DeviceCategory {
  id: string;
  name: string;
  arabicName: string;
  productCount: number;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  companyId: number;
  lowStock: boolean;
  sku?: string;
  description?: string;
  specifications?: string;
  dateAdded: string;
  lastUpdated: string;
}

export interface PriceHistory {
  id: number;
  productId: number;
  purchasePrice: number;
  sellingPrice: number;
  effectiveDate: string;
  note: string;
  updatedBy?: string;
}
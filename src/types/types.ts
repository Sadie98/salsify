export interface propertyValue {
  property_id: number;
  value: string;
}

export interface column {
  id: number;
  name: string;
  type: string;
  values?: string[];
}

export interface columnsTitles {
  [key: number]: string;
}

export interface columnData {
  [key: string]: string;
}

export interface tableHeaders {
  key: string;
}

export interface operator {
  id: number;
  text: string;
}

export interface product {
  "Product Name": string;
  color: string;
  "weight (oz)": number;
  category: string;
  wireless?: boolean;
}

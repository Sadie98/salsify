export interface propertyValue {
  property_id: number;
  value: string | number | boolean;
}

export interface IColumn {
  id: number;
  name: productKeys;
  type: columnType;
  values?: string[];
}

export type columnType = 'number' | 'boolean' | 'string' | 'enumerated'

export interface columnsTitles {
  [key: number]: productKeys;
}

export interface columnData {
  [key: string]: string;
}

export interface tableHeaders {
  key: string;
}

export interface operator {
  id: string;
  text: string;
}

export interface product {
  "Product Name": string;
  color: string;
  "weight (oz)": number;
  category: string;
  wireless?: boolean;
}

export type productKeys = keyof product;

export interface productOriginal {
  id: number,
  property_values: Array<propertyValue>
}

export interface IPropertyToOperator {
  [key: string]: string[]
}

interface propertyOriginal {
  id: number,
  name: string,
  type: columnType
}


export interface filtersState {
  properties: propertyOriginal,
  propertySelected: string,
  operators: operator[],
  operatorSelected: operator,
  options: operator[],
  optionSelected: operator,
  isOptionsVisible: boolean,
}
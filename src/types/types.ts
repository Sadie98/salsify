export interface product {
    id: number;
    property_values: propertyValue[],
}

export interface propertyValue {
    property_id: number,
    value: string,
}

export interface column {
    id: number,
    name: string,
    type: columnType,
    values: string[]
}

export enum columnType {
    'enumerated',
    'number',
    'string'
}

export interface columnsTitles {
    [key: number]: string,
}

export interface columnData {
    [key: string]: string;
}

export interface tableHeaders {
    key: string,
    sortable: boolean,
}

export interface property {
    id: number,
    name: string,
    type: string,
}

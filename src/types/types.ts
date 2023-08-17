export interface propertyValue {
    property_id: number,
    value: string,
}

export interface column {
    id: number,
    name: string,
    type: string,
    values?: string[]
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

export interface operator {
    id: number,
    text: string,
}

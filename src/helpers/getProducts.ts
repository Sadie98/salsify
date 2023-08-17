import {column, columnData, columnsTitles, propertyValue} from "../types/types.ts";
import {propertiesMock} from "../mocks/properties.ts";
import {productsMock} from "../mocks/products.ts";
import { useFiltersStore } from "@/composables/filters.ts";


export function getProducts() {
    return productsMock.map(function(product){
        const columns:columnData = {};

        product.property_values.forEach(function(property: propertyValue): void{
            columns[getColumnTitles()[property.property_id]] = property.value;
        });

        return columns;
    });
};

function getColumnTitles():columnsTitles {
    const filtersStore = useFiltersStore();

    const columnsTitles: columnsTitles = {};

    filtersStore.getProperties.forEach((property: column) => {
        columnsTitles[property.id] = property.name;
    });

    return columnsTitles;
};
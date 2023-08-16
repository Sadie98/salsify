import { defineStore } from "pinia";
import { productsMock } from '@/mocks/products.ts';
import { operatorsMock } from '@/mocks/operators.ts';
import { propertiesMock } from '@/mocks/properties.ts';
import {column, columnData, columnsTitles, product, propertyValue, tableHeaders,} from "../types/types.ts";

export const useProductsStore = defineStore('Products', {
    state: () => ({
        products: productsMock,
        properties: propertiesMock,
        operators: operatorsMock,
    }),
    getters: {
        getColumnTitles: (state) => {
            const columnsTitles:columnsTitles = {};

            state.properties.forEach((property: column) => {
                columnsTitles[property.id] = property.name;
            });

            return columnsTitles;
        },
        getFields: function() {
          const res: tableHeaders[] = [];

          const columnNames = Object.values(this.getColumnTitles);
            columnNames.forEach(columnTitle => {
                    res.push({
                    key: columnTitle,
                    sortable: false,
                });
            })

          return res;
        },
        getProducts: function(state) {
            const store = this;

            return state.products.map(function(product: product){
                const columns:columnData = {};

                product.property_values.forEach(function(property: propertyValue){
                    columns[store.getColumnTitles[property.property_id]] = property.value;
                });

                return columns;
            });
        },
        getProperties: (state) => state.properties,
        getOperators: (state) => state.operators,
    }
})
import { defineStore } from "pinia";
import { operatorsMock } from '@/mocks/operators.ts';
import { propertiesMock } from '@/mocks/properties.ts';
import {column, columnData, columnsTitles, product, propertyValue, tableHeaders,} from "../types/types.ts";
import {getProducts} from "../helpers/getProducts.ts";

export const useProductsStore = defineStore('Products', {
    state: () => ({
        products: getProducts(), // I didn't like default mapping
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
        getProducts: (state) => state.products,
        getProperties: (state) => state.properties,
        getOperators: (state) => state.operators,
    },
    actions: {
        filterByEqual(value, propertyName){
            this.products = getProducts().filter((product) => product[propertyName] == value);
        },
        filterByGreater(value, propertyName){
            this.products = getProducts().filter((product) => product[propertyName] >= value);
        },
        filterByLess(value, propertyName){
            this.products = getProducts().filter((product) => product[propertyName] <= value);
        },
        filterByNone(value, propertyName){
            this.products = getProducts().filter((product) => product[propertyName] != value);
        },
        resetProducts(){
            this.products = getProducts();
        }
    }
})
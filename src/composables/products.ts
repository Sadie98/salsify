import { defineStore } from "pinia";
import { operatorsMock } from "@/mocks/operators.ts";
import { propertiesMock } from '@/mocks/properties.ts';
import {column, columnsTitles, tableHeaders,} from "../types/types.ts";
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
        filterByEqual(value: string, propertyName: string):void{
            this.products = getProducts().filter((product) => product[propertyName] == value);
        },
        filterByGreater(value: string, propertyName: string): void{
            this.products = getProducts().filter((product) => product[propertyName] >= value);
        },
        filterByLess(value: string, propertyName: string): void{
            this.products = getProducts().filter((product) => product[propertyName] <= value);
        },
        filterByNone(value: string, propertyName: string): void{
            this.products = getProducts().filter((product) => product[propertyName] != value);
        },
        filterByContains(value: string, propertyName: string): void{
            this.products = getProducts().filter((product) => product[propertyName].includes(value));
        },
        filterBySeveral(values: string[], propertyName: string): void{
            this.products = getProducts().filter((product) => values.includes(product[propertyName]));
        },
        resetProducts(){
            this.products = getProducts();
        }
    }
})
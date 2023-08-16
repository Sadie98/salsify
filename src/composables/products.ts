import { defineStore } from "pinia";
import { productsMock } from '@/mocks/products.ts';
import { operatorsMock } from '@/mocks/operators.ts';
import { propertiesMock } from '@/mocks/properties.ts';

export const useProductsStore = defineStore('Products', {
    state: () => ({
        products: productsMock,
        properties: propertiesMock,
        operators: operatorsMock,
    }),
    getters: {
        getProducts: (state) => state.products,
        getProperties: (state) => state.properties,
        getOperators: (state) => state.operators,
    }
})
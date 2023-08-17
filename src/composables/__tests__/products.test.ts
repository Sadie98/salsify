import { it, expect, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
    products,
    value1, propertyName1, res1,
    value2, propertyName2, res2,
    value3, propertyName3, res3,
    value4, propertyName4, res4,
    value5, propertyName5, res5,
    value6, propertyName6, res6,
} from "../mocks/products.ts";
import { useProductsStore } from '../products.ts';

describe('Products store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('filterByEqual', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterByEqual(value1, propertyName1)
        expect(productsStore.products).toEqual(res1)
    })

    it('filterByGreater', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterByGreater(value2, propertyName2)
        expect(productsStore.products).toEqual(res2)
    })

    it('filterByLess', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterByLess(value3, propertyName3)
        expect(productsStore.products).toEqual(res3)
    })

    it('filterByNone', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterByNone(value4, propertyName4)
        expect(productsStore.products).toEqual(res4)
    })

    it('filterByContains', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterByContains(value5, propertyName5)
        expect(productsStore.products).toEqual(res5)
    })

    it('filterBySeveral', () => {
        const productsStore = useProductsStore()
        expect(productsStore.products).toEqual(products)
        productsStore.filterBySeveral(value6, propertyName6)
        expect(productsStore.products).toEqual(res6)
    })
})
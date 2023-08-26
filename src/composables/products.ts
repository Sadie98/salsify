import { defineStore } from "pinia";
import { propertiesMock } from "../mocks/properties.ts";
import {columnsTitles, IColumn, product, productKeys, tableHeaders} from "../types/types.ts";
import { getProducts } from "../helpers/getProducts.ts";
import { useFiltersStore } from "./filters.ts";

export const useProductsStore = defineStore("Products", {
  state: () => ({
    products: getProducts(), // I didn't like default mapping
    properties: propertiesMock,
  }),
  getters: {
    getColumnTitles: () => {
      const filtersStore = useFiltersStore();

      const columnsTitles: columnsTitles = {};

      filtersStore.getProperties.forEach((property: IColumn) => {
        columnsTitles[property.id] = property.name;
      });

      return columnsTitles;
    },
    getFields: function () {
      const res: tableHeaders[] = [];

      const columnNames = Object.values(this.getColumnTitles);
      columnNames.forEach((columnTitle) => {
        res.push({ key: columnTitle });
      });

      return res;
    },
    getProducts: (state) => state.products,
    getProperties: (state) => state.properties,
  },
  actions: {
    filterByEqual(value: string, propertyName: productKeys): void {
      this.products = getProducts().filter(
        (product) => product[propertyName] == value,
      );
    },
    filterByGreater(value: number, propertyName: productKeys): void {
      this.products = getProducts().filter(
        (product) => Number.parseInt(<string>product[propertyName]) > value,
      );
    },
    filterByLess(value: number, propertyName: productKeys): void {
      if (!propertyName) throw Error();

      this.products = getProducts().filter(
        (product) => Number.parseInt(<string>product[propertyName]) < value,
      );
    },
    filterByNone(value: string, propertyName: productKeys): void {
      this.products = getProducts().filter(
        (product) => <string>product[propertyName] != value
      );
    },
    filterByContains(value: string, propertyName: productKeys): void {
      this.products = getProducts().filter((product) =>
          (<string>product[propertyName]).toLowerCase().includes(value.toLowerCase()),
      );
    },
    filterBySeveral: function (values: string[] | number[] | boolean[], propertyName: productKeys): void {
      this.products = getProducts().filter((product:product) => {
            let productPropertyValue:string = product[propertyName]?.toString() || '';
            return values.includes(productPropertyValue);
          }
      );
    },
    resetProducts() {
      this.products = getProducts();
    },
  },
});

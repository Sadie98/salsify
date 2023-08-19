import { defineStore } from "pinia";
import { propertiesMock } from "../mocks/properties.ts";
import { column, columnsTitles, tableHeaders } from "../types/types.ts";
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

      filtersStore.getProperties.forEach((property: column) => {
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
    filterByEqual(value: string, propertyName: string): void {
      this.products = getProducts().filter(
        (product) => product[propertyName] == value,
      );
    },
    filterByGreater(value: number, propertyName: string): void {
      this.products = getProducts().filter(
        (product) => product[propertyName] > value,
      );
    },
    filterByLess(value: number, propertyName: string): void {
      this.products = getProducts().filter(
        (product) => product[propertyName] < value,
      );
    },
    filterByNone(value: string, propertyName: string): void {
      this.products = getProducts().filter(
        (product) => product[propertyName] != value,
      );
    },
    filterByContains(value: string, propertyName: string): void {
      this.products = getProducts().filter((product) =>
        product[propertyName].toLowerCase().includes(value.toLowerCase()),
      );
    },
    filterBySeveral(values: string[], propertyName: string): void {
      this.products = getProducts().filter((product) =>
        values.includes(product[propertyName]),
      );
    },
    resetProducts() {
      this.products = getProducts();
    },
  },
});

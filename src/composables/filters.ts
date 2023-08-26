import { defineStore } from "pinia";
import {
  dropdownOperatorPlaceholder,
  dropdownPropertyPlaceholder,
  dropdownValuePlaceholder,
} from "@/consts/consts.ts";
import { propertiesMock } from "@/mocks/properties.ts";
import { operatorsMock } from "@/mocks/operators.ts";
import { propertyToOperator } from "@/mocks/propertyToOperator.ts";
import { useProductsStore } from "@/composables/products.ts";
import { getOperatorValuesEqual } from "@/helpers/getOperatorValues.ts";
import { IColumn, operator, productKeys} from "@/types/types.ts";

export const useFiltersStore = defineStore("Filters", {
  state: () => ({
    properties: propertiesMock,
    propertySelected: dropdownPropertyPlaceholder,
    operators: operatorsMock,
    operatorSelected: { id: '-1', text: dropdownOperatorPlaceholder } as operator,
    options: [] as string[],
    optionSelected: dropdownValuePlaceholder,
    isOptionsVisible: false,
  }),
  getters: {
    getProperties: (state) => {
      return <IColumn[]>state.properties;
    },
    getPropertySelected: (state) => {
      return state.propertySelected;
    },
    getOperators: (state) => {
      return state.operators;
    },
    getOperatorSelected: (state) => {
      return state.operatorSelected;
    },
    getOptions: (state) => {
      return state.options;
    },
    getOptionSelected: (state) => {
      return state.optionSelected;
    },
    getIsOptionsVisible: (state) => {
      return state.isOptionsVisible;
    },
  },
  actions: {
    setProperty(item: IColumn) {
      const productsStore = useProductsStore();

      productsStore.resetProducts();
      this.resetOptions();

      this.propertySelected = item.name;

      this.operators = operatorsMock.filter((operator: operator) => {
        return propertyToOperator[item.type].includes(operator.id);
      });
    },
    setOperator(operator: operator) {
      const productsStore = useProductsStore();

      productsStore.resetProducts();

      this.operatorSelected = operator;

      if (operator.id === "any") {
        this.isOptionsVisible = false;
      } else {
        this.options = getOperatorValuesEqual(
          productsStore.getProducts,
          <productKeys>this.propertySelected,
        );
        this.isOptionsVisible = true;
      }

      if (operator.id === "contains") {
        this.options = [];
      }
    },
    setOption(value: string) {
      const productsStore = useProductsStore();

      this.optionSelected = value;

      switch (this.operatorSelected.id) {
        case "equals":
          productsStore.filterByEqual(
            this.optionSelected,
            <productKeys>this.propertySelected,
          );

          break;
        case "greater_than":
          productsStore.filterByGreater(
            Number.parseInt(this.optionSelected),
              <productKeys>this.propertySelected,
          );

          break;
        case "less_than":
          productsStore.filterByLess(
            Number.parseInt(this.optionSelected),
            <productKeys>this.propertySelected,
          );

          break;
        case "none":
          productsStore.filterByNone(
            this.optionSelected,
            <productKeys>this.propertySelected,
          );

          break;
        case "contains":
          productsStore.filterByContains(
            this.optionSelected,
            <productKeys>this.propertySelected,
          );

          break;
      }
    },
    resetOperator() {
      this.operatorSelected = {
        text: dropdownOperatorPlaceholder,
        id: '-1',
      };
    },
    resetOptions() {
      // this may be private, but Pinia doesn't support it
      this.isOptionsVisible = false;
      this.options = [];
      this.optionSelected = dropdownValuePlaceholder;
    },
    resetProperties() {
      this.propertySelected = dropdownPropertyPlaceholder;
    },
    resetAllFilters() {
      this.resetProperties();
      this.resetOperator();
      this.resetOptions();
    },
  },
});

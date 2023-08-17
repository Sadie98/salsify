import { defineStore } from "pinia";
import {dropdownOperatorPlaceholder, dropdownPropertyPlaceholder, dropdownValuePlaceholder} from "../consts/consts.ts";
import {propertiesMock} from "../mocks/properties.ts";
import {operatorsMock} from "../mocks/operators.ts";
import {propertyToOperator} from "../mocks/propertyToOperator.ts";
import { useProductsStore } from "@/composables/products.ts";
import {getOperatorValuesEqual} from "../helpers/getOperatorValues.ts";

export const useFiltersStore = defineStore('Filters', {
    state: () => ({
        properties: propertiesMock,
        propertySelected: {
            id: -1,
            type: 'any',
            name: dropdownPropertyPlaceholder
        },
        operators: operatorsMock,
        operatorSelected: {
            text: dropdownOperatorPlaceholder,
            id: -1,
        },
        options: [],
        optionSelected: {
            text: dropdownValuePlaceholder,
        },
        isOptionsVisible: false,
    }),
    getters: {
        getProperties: (state) => { return state.properties },
        getPropertySelected: (state) => { return state.propertySelected },
        getOperators: (state) => { return state.operators },
        getOperatorSelected: (state) => { return state.operatorSelected },
        getOptions: (state) => { console.log(state.options); return state.options },
        getOptionSelected: (state) => { return state.optionSelected },
        getIsOptionsVisible: (state) => { console.log(state.isOptionsVisible); return state.isOptionsVisible },
    },
    actions: {
        setProperty(item){
            const productsStore = useProductsStore();

            productsStore.resetProducts();
            this.resetOptions();

            this.propertySelected = item;

            this.operators = this.getOperators.filter((operator) => {
                return propertyToOperator[item.type].includes(operator.id);
            });
        },
        setOperator(operator) {
            const productsStore = useProductsStore();

            productsStore.resetProducts();

            this.operatorSelected = operator;

            if (operator.id === 'any') {
                this.isOptionsVisible = false;
            } else {
                this.options = getOperatorValuesEqual(productsStore.getProducts, this.propertySelected.name);
                this.isOptionsVisible = true;
            }

            if (operator.id === 'in') {
                let options = this.options.map(value => {
                    return {
                        text: value,
                        value: value,
                    }
                });
                options.value = options;
            }
            if (operator.id === 'contains') { this.options.value = []}
        },
        setOption(value){
            const productsStore = useProductsStore();
            this.options = [];

            this.optionSelected.text = value;

            switch (this.operatorSelected.id){
                case 'equals':
                    productsStore.filterByEqual(this.optionSelected.text, this.propertySelected.name);

                    break;
                case 'greater_than':
                    productsStore.filterByGreater(this.optionSelected.text, this.propertySelected.name);

                    break;
                case 'less_than':
                    productsStore.filterByLess(this.optionSelected.text, this.propertySelected.name);

                    break;
                case 'none':
                    productsStore.filterByNone(this.optionSelected.text, this.propertySelected.name);

                    break;
                case 'contains':
                    productsStore.filterByContains(this.optionSelected.text, this.propertySelected.name);

                    break;

            }
        },
        resetOperator(){
            this.operatorSelected = {
                text: dropdownOperatorPlaceholder,
                id: -1,
            }
        },
        resetOptions(){
            this.isOptionsVisible = false;
            this.options = [];
            this.optionSelected.text = dropdownValuePlaceholder;
        },
        resetProperties(){
            this.propertySelected.id = -1;
            this.propertySelected.type = 'any';
            this.propertySelected.name = dropdownPropertyPlaceholder;
        }
    }
});

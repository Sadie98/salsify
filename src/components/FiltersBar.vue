<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";
import {ref} from "vue";
import {dropdownOperatorPlaceholder, dropdownPropertyPlaceholder, dropdownValuePlaceholder} from "../consts/consts.ts";
import {propertyToOperator} from "../mocks/propertyToOperator.ts";
import { getOperatorValuesEqual} from "../helpers/getOperatorValues.ts";

const productsStore = useProductsStore();

const propertySelected = ref({
  id: -1,
  type: 'any',
  name: dropdownPropertyPlaceholder
});

const operatorsAvailable = ref(productsStore.getOperators);
const operatorSelected = ref({
  text: dropdownOperatorPlaceholder,
  id: -1,
});

const valuesAvailable = ref([]);
const valueSelected = ref({
  text: dropdownValuePlaceholder,
});
const isValueOptionsVisible = ref(false);

function resetOperator(){
  operatorSelected.value.text = dropdownOperatorPlaceholder;
  operatorSelected.value.id = -1;
}

function resetValues(){
  isValueOptionsVisible.value = false;
  valuesAvailable.value = [];
  valueSelected.value.text = dropdownValuePlaceholder;
}

function setProperty(item){
  productsStore.resetProducts();

  propertySelected.value = item;
  if (operatorSelected.value.id !== -1) { setOperator(operatorSelected.value); };

  operatorsAvailable.value = productsStore.getOperators.filter((operator) => {
    return propertyToOperator[item.type].includes(operator.id);
  });
}

function setOperator(operator){
  productsStore.resetProducts();

  operatorSelected.value = operator;

  console.log(operator.id);
  if (operator.id === 'any') {
    isValueOptionsVisible.value = false;
  } else {
    valuesAvailable.value = getOperatorValuesEqual(productsStore.getProducts, propertySelected.value.name);
    isValueOptionsVisible.value = true;
  }

  if (operator.id === 'Is any of') {} // multiselect
  if (operator.id === 'Contains') {} // search
}

function setValue(value){
  valueSelected.value.text = value;

  switch (operatorSelected.value.id){
    case 'equals':
      productsStore.filterByEqual(valueSelected.value.text, propertySelected.value.name);

      break;
    case 'greater_than':
      productsStore.filterByGreater(valueSelected.value.text, propertySelected.value.name);

      break;
    case 'less_than':
      productsStore.filterByLess(valueSelected.value.text, propertySelected.value.name);

      break;
    case 'none':
      productsStore.filterByNone(valueSelected.value.text, propertySelected.value.name);

      break;

  }
}
</script>

<template lang="pug">
div
  b-dropdown(id="dropdown-property" :text="propertySelected.name" class="m-md-2")
    b-dropdown-item(v-for="item in productsStore.getProperties" @click="setProperty(item)") {{ item.name }}

  b-dropdown(id="dropdown-operator" :text="operatorSelected.text" class="m-md-2" v-if="propertySelected.id !== -1")
    b-dropdown-item(v-for="item in operatorsAvailable" @click="setOperator(item)") {{ item.text }}

  b-dropdown(id="dropdown-value" :text="valueSelected.text" class="m-md-2" v-if="isValueOptionsVisible")
    b-dropdown-item(v-for="value in valuesAvailable" @click="setValue(value)") {{ value }}



</template>

<style scoped>

</style>
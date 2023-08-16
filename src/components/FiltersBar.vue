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
  id: -1,
});
const isValueOptionsVisible = ref(false);

function setProperty(item){
  propertySelected.value = item;
  if (operatorSelected.value.id !== -1) { setOperator(operatorSelected.value); };

  operatorsAvailable.value = productsStore.getOperators.filter((operator) => {
    return propertyToOperator[item.type].includes(operator.id);
  });
}

function setOperator(operator){
  operatorSelected.value = operator;

  console.log(operator.id);
  if (operator.id === 'any') {
    isValueOptionsVisible.value = false;
  } else {
    valuesAvailable.value = getOperatorValuesEqual(productsStore.getProducts, propertySelected.value.name);
    isValueOptionsVisible.value = true;
  }

}

function setValue(value){

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
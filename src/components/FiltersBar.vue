<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";
import {ref} from "vue";
import {dropdownOperatorPlaceholder, dropdownPropertyPlaceholder} from "../consts/consts.ts";
import {propertyToOperator} from "../mocks/propertyToOperator.ts";
// import {property} from "../types/types.ts";

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

const setProperty = (item) => {
  propertySelected.value = item;

  operatorsAvailable.value = productsStore.getOperators.filter((operator) => {
    return propertyToOperator[item.type].includes(operator.id);
  });
}

const setOperator = (operator) => {
  console.log(operator);
}
</script>

<template lang="pug">
div
  b-dropdown(id="dropdown-property" :text="propertySelected.name" class="m-md-2")
    b-dropdown-item(v-for="item in productsStore.getProperties" @click="setProperty(item)") {{ item.name }}
  b-dropdown(id="dropdown-operator" :text="operatorSelected.text" class="m-md-2")
    b-dropdown-item(v-for="item in operatorsAvailable" @click="setOperator(item)") {{ item.text }}
  b-dropdown(id="dropdown-value" text="Left align" class="m-md-2")
</template>

<style scoped>

</style>
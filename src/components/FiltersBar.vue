<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";
import {ref, watch} from "vue";
import {dropdownOperatorPlaceholder, dropdownPropertyPlaceholder, dropdownValuePlaceholder} from "../consts/consts.ts";
import {propertyToOperator} from "../mocks/propertyToOperator.ts";
import { getOperatorValuesEqual} from "../helpers/getOperatorValues.ts";

const productsStore = useProductsStore();

const propertySelected = ref({
  id: -1,
  type: 'any',
  name: dropdownPropertyPlaceholder
});

const valuesSelectedTitle = ref('');

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
const valuesSelected = ref([]);

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

  if (operator.id === 'any') {
    isValueOptionsVisible.value = false;
  } else {
    valuesAvailable.value = getOperatorValuesEqual(productsStore.getProducts, propertySelected.value.name);
    isValueOptionsVisible.value = true;
  }

  if (operator.id === 'in') {
    let options = valuesAvailable.value.map(value => {
      console.log(value);
      return {
        text: value,
        value: value,
      }
    });
    valuesAvailable.value = options;
  } // multiselect
  if (operator.id === 'contains') { valuesAvailable.value = []} // search
}

watch(valuesSelected, (value) => {
  productsStore.filterBySeveral(value, propertySelected.value.name);
  valuesSelectedTitle.value = valuesSelected.value.join(',');
})

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
    case 'contains':
      productsStore.filterByContains(valueSelected.value.text, propertySelected.value.name);

      break;

  }
}
function clearAll(){
  productsStore.resetProducts();
  resetValues();
  resetOperator();
  propertySelected.value.id = -1;
}
</script>

<template lang="pug">
div(class="dropdown b-dropdown btn-group")
  b-dropdown(id="dropdown-property" :text="propertySelected.name" variant="primary" class="m-md-2")
    b-dropdown-item(v-for="item in productsStore.getProperties" @click="setProperty(item)") {{ item.name }}

  b-dropdown(id="dropdown-operator" variant="primary" :text="operatorSelected.text" class="m-md-2" v-if="propertySelected.id !== -1")
    b-dropdown-item(v-for="item in operatorsAvailable" @click="setOperator(item)") {{ item.text }}

  b-dropdown(id="dropdown-value" variant="primary" :text="valueSelected.text" class="m-md-2" v-if="isValueOptionsVisible")
    b-dropdown-item(v-for="value in valuesAvailable" @click="setValue(value)" v-if="operatorSelected.text !== 'Is any of'") {{ value }}
    b-form-input(id="dropdown-contains" size="sm" v-if="operatorSelected.text === 'Contains'" @input="setValue")
    b-form-checkbox-group(
      id="checkbox-group-1"
      v-if="operatorSelected.text === 'Is any of'"
      v-model="valuesSelected"
      :options="valuesAvailable"
      name="valuesCheckbox"
  ) {{ valuesSelectedTitle }}
  b-button(@click="clearAll" variant="success" class="m-md-2") Clear
</template>

<style lang="scss">
.btn-content {
  display: inline;
}
</style>
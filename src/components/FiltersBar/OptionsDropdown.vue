<script setup lang="ts">
import { useFiltersStore } from "@/composables/filters.ts";

const filtersStore = useFiltersStore();

// watch(valuesSelected, (value) => {
//   productsStore.filterBySeveral(value, propertySelected.value.name);
//   valuesSelectedTitle.value = valuesSelected.value.join(',');
// })
</script>

<template lang="pug">
b-dropdown(id="dropdown-value" variant="primary" :text="filtersStore.getOptionSelected.text" class="m-md-2" v-if="filtersStore.getIsOptionsVisible")
  b-dropdown-item(
    v-for="value in filtersStore.getOptions"
    @click="filtersStore.setOption(value)"
    v-if="filtersStore.getOperatorSelected.text !== 'Is any of' && filtersStore.getOperatorSelected.text !== 'Contains'"
  ) {{ value }}
  b-form-input(
    id="dropdown-contains"
    size="sm"
    v-if="filtersStore.getOperatorSelected.text === 'Contains'"
    @input="filtersStore.setOption"
  )
  //b-form-checkbox-group(
  //  id="checkbox-group-1"
  //  v-if="filtersStore.getOperatorSelected.text === 'Is any of'"
  //  v-model="valuesSelected"
  //  :options="valuesAvailable"
  //  name="valuesCheckbox"
  //) {{ valuesSelectedTitle }}
</template>

<style scoped lang="scss">

</style>
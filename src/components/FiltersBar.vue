<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";
import { useFiltersStore } from "@/composables/filters.ts";
import PropertyDropdown from "@/components/FiltersBar/PropertyDropdown.vue";
import OperatorDropdown from "@/components/FiltersBar/OperatorDropdown.vue";
import OptionsDropdown from "@/components/FiltersBar/OptionsDropdown.vue";

const filtersStore = useFiltersStore();
const productsStore = useProductsStore();

function clearAll(){
  filtersStore.resetAllFilters();
  productsStore.resetProducts();
}
</script>

<template lang="pug">
div(class="btn-group")
  PropertyDropdown
  OperatorDropdown
  OptionsDropdown
  b-button(@click="clearAll" variant="success" class="m-md-2") Clear
</template>

<style lang="scss">
.btn-content {
  display: inline;
}
</style>
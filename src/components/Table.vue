<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";
import { BTable } from "bootstrap-vue-3";

const productsStore = useProductsStore();
console.log(productsStore.getOperators)
</script>

<template lang="pug">
div
  BTable(striped hover :items="productsStore.getProducts")

</template>

<style scoped>

</style>

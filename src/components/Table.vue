<script setup lang="ts">
import { useProductsStore } from "@/composables/products.ts";

const productsStore = useProductsStore();
</script>

<template lang="pug">
div
  BTable(striped sortable hover bordered :items="productsStore.getProducts" :fields="productsStore.getFields")

</template>

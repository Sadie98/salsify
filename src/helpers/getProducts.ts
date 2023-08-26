import {
  columnsTitles, IColumn, product, productKeys, productOriginal,
  propertyValue,
} from "../types/types.ts";
import { productsMock } from "../mocks/products.ts";
import { useFiltersStore } from "../composables/filters.ts";

// I didn't like data format I've got, so I made mapping with caching.
// It depends on server side, but in my case session storage is ok for caching.
// I'll call this function a lot, so I don't want to calculate it a million times
export function getProducts(): product[] {
  const productsFromStorage = sessionStorage.getItem("products");

  if (productsFromStorage) return JSON.parse(productsFromStorage);

  let res:product[] = [];
  res = productsMock.map(function (product: productOriginal) {
    const columns: product = {"Product Name": "", "weight (oz)": 0, 'category': "", 'color': ""};

    product.property_values.forEach(function (property: propertyValue): void {
      const columnTitles: columnsTitles = getColumnTitles();
      const currentTitle: productKeys = columnTitles[property.property_id];
      columns[currentTitle] = property.value;
    });

    return columns;
  });

  sessionStorage.setItem("products", JSON.stringify(res));
  return res;
}

function getColumnTitles(): columnsTitles {
  const filtersStore = useFiltersStore();

  const columnsTitles: columnsTitles = {};

  filtersStore.getProperties.forEach((property: IColumn) => {
    columnsTitles[property.id] = property.name;
  });

  return columnsTitles;
}

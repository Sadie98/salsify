import {product} from "@/types/types.ts";

export const products: product[] = [
  {
    "Product Name": "Headphones",
    color: "black",
    "weight (oz)": 5,
    category: "electronics",
    wireless: false,
  },
  {
    "Product Name": "Cell Phone",
    color: "black",
    "weight (oz)": 3,
    category: "electronics",
    wireless: true,
  },
  {
    "Product Name": "Keyboard",
    color: "grey",
    "weight (oz)": 5,
    category: "electronics",
    wireless: false,
  },
  {
    "Product Name": "Cup",
    color: "white",
    "weight (oz)": 3,
    category: "kitchenware",
  },
  {
    "Product Name": "Key",
    color: "silver",
    "weight (oz)": 1,
    category: "tools",
  },
  {
    "Product Name": "Hammer",
    color: "brown",
    "weight (oz)": 19,
    category: "tools",
  },
];

export const property1 = "Product Name";
export const property2 = "color";
export const property3 = "weight (oz)";

export const res1 = [
  "Headphones",
  "Cell Phone",
  "Keyboard",
  "Cup",
  "Key",
  "Hammer",
];
export const res2 = ["black", "grey", "white", "silver", "brown"];
export const res3 = [1, 3, 5, 19];

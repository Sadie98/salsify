import {columnData} from "../types/types.ts";

export function getOperatorValuesEqual(products: columnData[], property: string): string[]{
    let res: Set<string> = new Set();

    products.forEach((product) => {
        if (product[property]) res.add(product[property.toString()]);
    })

    return Array.from(res);
}
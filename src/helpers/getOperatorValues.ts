import {columnData} from "../types/types.ts";

export function getOperatorValuesEqual(products: columnData[], property: string): string[]{
    let resUnique: Set<string> = new Set();

    products.forEach((product) => {
        if (product[property]) resUnique.add(product[property.toString()]);
    })

    const res = Array.from(resUnique);

    if (typeof(res[0]) === 'number') {
        return res.sort(function(a: number, b: number){return a-b});
    }

    return res;
}
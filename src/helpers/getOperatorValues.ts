import { product, productKeys} from "../types/types.ts";

export function getOperatorValuesEqual(
  products: product[],
  property: productKeys,
): string[] {
  let resUnique: Set<string> = new Set();

  products.forEach((product) => {
    if (product[property] && product[property] !== undefined) resUnique.add((product[property] || '').toString());
  });

  const res = Array.from(resUnique);

  if (typeof Number.parseInt(res[0]) === "number") {
    return res.sort(function (a, b) {
      return Number.parseInt(a) - Number.parseInt(b);
    });
  }

  return res;
}

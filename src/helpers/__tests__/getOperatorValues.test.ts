import { test, expect } from "vitest";
import { getOperatorValuesEqual } from "../getOperatorValues.ts";
import {
  products,
  property1,
  res1,
  property2,
  res2,
  property3,
  res3,
} from "../mocks/getOperatorValues.mocks.ts";

test("checking function getOperatorValuesEqual", () => {
  expect(getOperatorValuesEqual(products, property1)).toStrictEqual(res1);
  expect(getOperatorValuesEqual(products, property2)).toStrictEqual(res2);
  expect(getOperatorValuesEqual(products, property3)).toStrictEqual(res3);
});

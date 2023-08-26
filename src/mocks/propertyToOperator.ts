// I created this file using table property to valid operators

import {IPropertyToOperator} from "@/types/types.ts";

export const propertyToOperator: IPropertyToOperator = {
  string: ["equals", "any", "none", "in", "contains"],
  number: ["equals", "greater_than", "less_than", "any", "none", "in"],
  enumerated: ["equals", "any", "none", "in"],
};

import jsonLogic from 'json-logic-js';
import {NameLabelPair, RQBJsonLogic} from 'react-querybuilder';

// TODO: validate that the operators used in expressions match the variable types
// TODO: validate that all variables used in the expression are set
// Example expression: {"and":[{">=":[{"var":"age"},"18"]},{"==":[{"var":"gender"},"female"]}]}
export const evaluateExpression = (expression: RQBJsonLogic, variableMap: Record<string, number | string>) => {
  return jsonLogic.apply(expression, variableMap);
};

export const supportedOperators: NameLabelPair[] = [
  { name: '=', label: '=' },
  { name: '!=', label: '!=' },
  { name: '<', label: '<' },
  { name: '>', label: '>' },
  { name: '<=', label: '<=' },
  { name: '>=', label: '>=' },
];

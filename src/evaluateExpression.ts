import jsonLogic from 'json-logic-js';
import {NameLabelPair, RQBJsonLogic} from 'react-querybuilder';

// Example expression: {"and":[{">=":[{"var":"age"},"18"]},{"==":[{"var":"gender"},"female"]}]}
export const evaluateExpression = (expression: RQBJsonLogic, variableMap: Record<string, number | string>) => {
  // TODO: validate that the operators used in expressions match the variable types
  if (Object.values(variableMap).some((value) => value === undefined)) {
    throw new Error('ValidationError');
  }
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

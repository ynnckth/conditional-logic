import {RQBJsonLogic} from 'react-querybuilder';
import {evaluateExpression, expressionValidationErrorMessage} from './evaluateExpression';

describe('evaluateExpression', () => {
  it.each`
    age        | expectedResult
    ${18} | ${true}
    ${20} | ${true}
    ${1} | ${false}
    ${-1} | ${false}
  `('should evaluate single condition expression for age $age >= 18', ({age, expectedResult}) => {
    const expression: RQBJsonLogic = {">=": [{"var": "age"}, "18"]}
    expect(evaluateExpression(expression, {age})).toBe(expectedResult);
  });

  it('should throw validation error if a required variable in the expression is undefined', () => {
    const expression: RQBJsonLogic = {">=": [{"var": "age"}, "18"]}
    // Disabling type check, as we won't have control over the types at runtime
    // @ts-ignore
    expect(() => {evaluateExpression(expression, {age: undefined})}).toThrow(expressionValidationErrorMessage);
    // @ts-ignore
    expect(() => {evaluateExpression(expression, {age: null})}).toThrow(expressionValidationErrorMessage);
  });
});
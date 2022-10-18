import React, {useState} from 'react';
import QueryBuilder, {formatQuery, RuleGroupType} from 'react-querybuilder';
import jsonLogic from 'json-logic-js';

// This is our variable map including the stored values
const variableMap: Record<string, number | string> = {
  age: 20,
  gender: 'male',
};

// Example expression: {"and":[{">=":[{"var":"age"},"18"]},{"==":[{"var":"gender"},"female"]}]}
const getJsonLogicExpressionForRuleGroup = (ruleGroup: RuleGroupType) =>
  formatQuery(ruleGroup, 'jsonlogic');

export const App = () => {
  const [query, setQuery] = useState<RuleGroupType>();
  const [evaluationResult, setEvaluationResult] = useState<boolean>();

  const evaluateExpression = () => {
    if (!query) return;
    setEvaluationResult(
      jsonLogic.apply(getJsonLogicExpressionForRuleGroup(query), variableMap)
    );
  };

  return (
    <div>
      <QueryBuilder
        fields={Object.keys(variableMap).map(variableKey => ({
          name: variableKey,
          label: variableKey,
        }))}
        query={query}
        onQueryChange={q => setQuery(q)}
      />

      <h4>Query</h4>
      {query && (
        <div>
          <pre>{JSON.stringify(getJsonLogicExpressionForRuleGroup(query))}</pre>
          <button onClick={() => evaluateExpression()}>Evaluate</button>
          <br />
          <br />
          <div>{`Evaluation result: ${evaluationResult}`}</div>
        </div>
      )}
    </div>
  );
}

export default App;

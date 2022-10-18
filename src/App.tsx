import React, {useState} from 'react';
import QueryBuilder, {formatQuery, RuleGroupType} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';
import {evaluateExpression, supportedOperators} from './evaluateExpression';
import {variableMap} from './variableMap';

export const App = () => {
  const [query, setQuery] = useState<RuleGroupType>();
  const [evaluationResult, setEvaluationResult] = useState<boolean>();

  const evaluate = () => {
    if (!query) return;
    const result = evaluateExpression(formatQuery(query, 'jsonlogic'), variableMap);
    setEvaluationResult(result);
  }

  return (
    <div style={{margin: 50}}>
      <QueryBuilder
        fields={Object.keys(variableMap).map(variableKey => ({
          name: variableKey,
          label: variableKey,
        }))}
        defaultQuery={query}
        onQueryChange={(q) => setQuery(q)}
        operators={supportedOperators}
      />

      <h4>Query</h4>
      {query && (
        <div>
          <pre style={{whiteSpace: "pre-wrap"}}>{JSON.stringify(formatQuery(query, 'jsonlogic'))}</pre>
          <button onClick={() => evaluate()}>Evaluate</button>
          <div style={{marginTop: 25}}>{`Evaluation result: ${evaluationResult}`}</div>
        </div>
      )}
    </div>
  );
}

export default App;

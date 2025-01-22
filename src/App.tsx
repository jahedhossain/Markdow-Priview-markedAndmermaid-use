import { useState } from 'react';
import './App.css';
import MarkdownAndMermaid from './markdownAndMermaid';
import Textarea from './textarea';

const defaultMarkdown = `
# Key Elements in Product X

| Element     | Percentage (%) |
|-------------|----------------|
| Calcium     | 42.96          |
| Potassium   | 50.05          |
| Magnesium   | 10.01          |
| Iron        | 5.00           |



# Mermaid Diagram Examples
## Sequence Diagram
\`\`\`mermaid
%%{init: {"pie": {"textPosition": 0.5}, "themeVariables": {"pieOuterStrokeWidth": "5px"}} }%%
pie showData
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5

\`\`\`
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  return (
    <>
      <Textarea markdown={markdown} setMarkdown={setMarkdown} />
      <MarkdownAndMermaid markdown={markdown} />
    </>
  );
}

export default App;

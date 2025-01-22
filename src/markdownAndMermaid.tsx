import DOMPurify from 'dompurify';
import { marked } from 'marked';
import mermaid from 'mermaid';
import { useEffect, useState } from 'react';

// Configure mermaid with more specific settings
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
});

// Configure marked with custom renderer for mermaid
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
console.log(renderer, 'renderer');
renderer.code = (codeObj) => {
  console.log(codeObj, 'codeObj');
  if (codeObj?.lang === 'mermaid') {
    return `<div class="mermaid">${codeObj?.text}</div>`;
  }
  return originalCodeRenderer(codeObj);
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true,
});

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

type MarkdownAndMermaidType = {
  markdown: string;
};
function MarkdownAndMermaid({ markdown }: MarkdownAndMermaidType) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const rendered = marked(markdown);
        const sanitized = DOMPurify.sanitize(rendered);
        setPreview(sanitized);
        // Use a more robust way to render mermaid diagrams
        setTimeout(async () => {
          try {
            await mermaid.run({
              querySelector: '.mermaid',
              suppressErrors: true,
            });
          } catch (error) {
            console.error('Mermaid rendering error:', error);
          }
        }, 100);
      } catch (error) {
        console.error('Markdown rendering error:', error);
      }
    };

    renderMarkdown();
  }, [markdown]);
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: preview }}
    />
  );
}

export default MarkdownAndMermaid;

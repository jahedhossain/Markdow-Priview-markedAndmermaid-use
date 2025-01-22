import React, { ChangeEvent } from 'react';

type TextareaProps = {
  markdown: string;
  setMarkdown: (markdown: string) => void;
};
export default function Textarea({ markdown, setMarkdown }: TextareaProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea
        value={markdown}
        onChange={handleChange}
        style={{ width: '100%', height: '500px', marginBottom: '20px' }}
      />
    </div>
  );
}

import { type FC, useState, useCallback } from 'react';
import type { ParsedField } from '../types';
import { Panel } from './Panel';

interface CodeOutputProps {
  code: string;
  fields: ParsedField[];
}


export const CodeOutput: FC<CodeOutputProps> = ({ code,}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }, [code]);

  const footer =
 
      <>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Копировать
        </button>
        {copied && (
          <span className="text-xs text-green-600 font-medium">Скопировано!</span>
        )}
      </>

  return (
    <Panel title="Готовый массив" badge={undefined} footer={footer}>
      

        <pre className="min-h-72 p-4 font-mono text-xs leading-relaxed bg-gray-50 text-gray-900 overflow-auto whitespace-pre-wrap break-words">
          {code || '// Здесь появится сгенерированный код'}
        </pre>
  

     
    </Panel>
  );
};

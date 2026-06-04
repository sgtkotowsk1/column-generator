import { type FC, useState, useCallback } from 'react';
import type { ParsedField } from '../types';
import { generateMockRow } from '../generator';
import { Panel } from './Panel';

interface CodeOutputProps {
  code: string;
  fields: ParsedField[];
}

type Tab = 'code' | 'preview';

export const CodeOutput: FC<CodeOutputProps> = ({ code, fields }) => {
  const [tab, setTab] = useState<Tab>('code');
  const [copied, setCopied] = useState(false);

  const activeFields = fields.filter((f) => f.enabled);
  const mockRow = generateMockRow(activeFields);

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
    tab === 'code' ? (
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
    ) : undefined;

  return (
    <Panel title="" badge={undefined} footer={footer}>
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {(['code', 'preview'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-gray-800 text-gray-900 font-medium'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t === 'code' ? 'Код' : 'Превью таблицы'}
          </button>
        ))}
      </div>

      {/* Code view */}
      {tab === 'code' && (
        <pre className="min-h-72 p-4 font-mono text-xs leading-relaxed bg-gray-50 text-gray-900 overflow-auto whitespace-pre-wrap break-words">
          {code || '// Здесь появится сгенерированный код'}
        </pre>
      )}

      {/* Preview view */}
      {tab === 'preview' && (
        <div className="overflow-x-auto">
          {activeFields.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-400">Нет активных полей</div>
          ) : (
            <>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {activeFields.map((f) => (
                      <th
                        key={f.field}
                        style={{ maxWidth: f.width }}
                        className="px-3 py-2 text-left font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
                      >
                        {f.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {activeFields.map((f) => (
                      <td
                        key={f.field}
                        style={{ maxWidth: f.width }}
                        className="px-3 py-2 border-b border-gray-100 overflow-hidden text-ellipsis whitespace-nowrap text-gray-700"
                      >
                        {String(mockRow[f.field] ?? '')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <p className="px-4 py-2 text-xs text-gray-400">Пример данных (mock)</p>
            </>
          )}
        </div>
      )}
    </Panel>
  );
};

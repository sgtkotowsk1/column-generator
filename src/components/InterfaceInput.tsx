import type { FC } from 'react';
import { Panel } from './Panel';
import { Badge } from './Badge';
import { EXAMPLE_INTERFACE } from '../example';

interface ParseStatus {
  state: 'idle' | 'ok' | 'error';
  message: string;
}

interface InterfaceInputProps {
  value: string;
  onChange: (v: string) => void;
  onParse: () => void;
  status: ParseStatus;
}

export const InterfaceInput: FC<InterfaceInputProps> = ({ value, onChange, onParse, status }) => {
  const badgeVariant = status.state === 'ok' ? 'success' : status.state === 'error' ? 'error' : 'default';

  return (
    <Panel
      title="TypeScript интерфейс"
      badge={<Badge variant={badgeVariant}>{status.message}</Badge>}
      footer={
        <>
          <button
            onClick={onParse}
            className="px-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
          >
            Разобрать
          </button>
          <button
            onClick={() => onChange(EXAMPLE_INTERFACE)}
            className="px-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
          >
            Загрузить пример
          </button>
        </>
      }
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder={'Вставьте TypeScript интерфейс...\n\nexport interface MyDTO {\n  id?: number;\n  name?: string;\n}'}
        className="w-full min-h-72 resize-y p-4 font-mono text-xs leading-relaxed bg-gray-50 text-gray-900 border-none outline-none"
      />
    </Panel>
  );
};

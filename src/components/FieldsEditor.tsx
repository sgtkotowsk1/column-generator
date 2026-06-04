import type { FC, ChangeEvent } from 'react';
import type { ParsedField } from '../types';
import { Panel } from './Panel';
import { Badge } from './Badge';

interface FieldsEditorProps {
  fields: ParsedField[];
  onChange: (fields: ParsedField[]) => void;
}

export const FieldsEditor: FC<FieldsEditorProps> = ({ fields, onChange }) => {
  const update = <K extends keyof ParsedField>(
    index: number,
    key: K,
    value: ParsedField[K],
  ) => {
    const next = fields.map((f, i) => (i === index ? { ...f, [key]: value } : f));
    onChange(next);
  };

  return (
    <Panel
      title="Поля"
      badge={
        <Badge variant={fields.length ? 'success' : 'default'}>
          {fields.length} {fields.length === 1 ? 'поле' : fields.length >= 2 && fields.length <= 4 ? 'поля' : 'полей'}
        </Badge>
      }
    >
      {fields.length === 0 ? (
        <div className="px-4 py-6 text-sm text-gray-400">
          Введите интерфейс и нажмите «Разобрать»
        </div>
      ) : (
        <>
          {/* Header row */}
          <div className="grid grid-cols-[1.8fr_2fr_80px_80px_36px] gap-1.5 px-4 py-2 text-xs font-medium text-gray-400 border-b border-gray-100 bg-gray-50">
            <span>field</span>
            <span>header</span>
            <span>width</span>
            <span>тип</span>
            <span className="text-center">вкл</span>
          </div>

          {/* Scrollable field list */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {fields.map((f, i) => (
              <div
                key={f.field}
                className="grid grid-cols-[1.8fr_2fr_80px_80px_36px] gap-1.5 items-center px-4 py-1.5 text-xs"
              >
                {/* field name */}
                <span
                  className="text-gray-400 truncate"
                  title={f.field}
                >
                  {f.field}
                </span>

                {/* header editable */}
                <input
                  type="text"
                  value={f.header}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update(i, 'header', e.target.value)
                  }
                  className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-full"
                />

                {/* width */}
                <input
                  type="number"
                  value={f.width}
                  min={40}
                  max={800}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update(i, 'width', Math.max(40, parseInt(e.target.value) || 150))
                  }
                  className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-full"
                />

                {/* type badge */}
                <span className="text-gray-400 truncate">{f.type}</span>

                {/* enabled toggle */}
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={f.enabled}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      update(i, 'enabled', e.target.checked)
                    }
                    className="w-3.5 h-3.5 cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Panel>
  );
};

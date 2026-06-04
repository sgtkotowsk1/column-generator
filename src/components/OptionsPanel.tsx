import type { FC, ChangeEvent } from 'react';
import type { GeneratorOptions, OutputFormat } from '../types';
import { Panel } from './Panel';

interface OptionsPanelProps {
  options: GeneratorOptions;
  onChange: (opts: GeneratorOptions) => void;
}



export const OptionsPanel: FC<OptionsPanelProps> = ({ options, onChange }) => {
  const set = <K extends keyof GeneratorOptions>(key: K, value: GeneratorOptions[K]) =>
    onChange({ ...options, [key]: value });

  return (
    <Panel title="Настройки вывода">
      <div className="flex flex-wrap gap-5 items-center px-4 py-3">

        {/* Row type */}
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <span className="whitespace-nowrap">Тип строки:</span>
          <div className="flex items-center gap-1.5">
            <select
              //value={options.rowType === 'any' ? 'any' : '__custom__'}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                if (e.target.value === 'any') set('rowType', 'any');
                else set('rowType', '');
              }}
              className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-800 text-xs outline-none focus:border-blue-400"
              defaultValue={"custom type"}
            >
              <option value="any">any</option>
              <option value="__custom__">custom type</option>
            </select>
            {options.rowType !== 'any' && (
              <input
                type="text"
                placeholder="MyRowType"
                value={options.rowType}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('rowType', e.target.value)}
                className="w-32 px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-800 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              />
            )}
          </div>
        </label>

        {/* Format */}
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <span>Формат:</span>
          <select
            value={options.format}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              set('format', e.target.value as OutputFormat)
            }
            className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-800 text-xs outline-none focus:border-blue-400"
          >
            <option value="array">массив</option>
            <option value="usememo">useMemo</option>
          </select>
        </label>

        {/* Width toggle */}
        <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={options.showWidth}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set('showWidth', e.target.checked)}
            className="w-3.5 h-3.5 accent-blue-600"
          />
          width
        </label>
        
      </div>
    </Panel>
  );
};

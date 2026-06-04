import type { FC, ChangeEvent } from "react";
import type { GeneratorOptions, OutputFormat } from "../types";
import { Panel } from "./Panel";

interface OptionsPanelProps {
  options: GeneratorOptions;
  onChange: (opts: GeneratorOptions) => void;
}

export const OptionsPanel: FC<OptionsPanelProps> = ({
  options,
  onChange,
}) => {
  const set = <K extends keyof GeneratorOptions>(
    key: K,
    value: GeneratorOptions[K]
  ) => onChange({ ...options, [key]: value });

  return (
    <Panel title="Настройки вывода">
      <div className="flex flex-wrap gap-5 items-center px-4 py-3">

        <label className="flex items-center gap-2 text-xs text-gray-600">
          <span className="whitespace-nowrap">Тип строки:</span>

          <select
            value={options.rowType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              set(
                "rowType",
                e.target.value as GeneratorOptions["rowType"]
              )
            }
            className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-800 text-xs outline-none focus:border-blue-400"
          >
            <option value="custom">custom type</option>
            <option value="any">any</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-gray-600">
          <span>Формат:</span>

          <select
            value={options.format}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              set("format", e.target.value as OutputFormat)
            }
            className="px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-800 text-xs outline-none focus:border-blue-400"
          >
            <option value="array">массив</option>
            <option value="usememo">useMemo</option>
          </select>
        </label>

        <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={options.showWidth}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              set("showWidth", e.target.checked)
            }
            className="w-3.5 h-3.5 accent-blue-600"
          />
          width
        </label>

      </div>
    </Panel>
  );
};
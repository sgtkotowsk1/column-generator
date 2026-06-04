import { useState, useMemo, useCallback } from "react";
import type { ParsedField, GeneratorOptions } from "./types";
import { parseInterface } from "./parser";
import { generateCode } from "./generator";
import { EXAMPLE_INTERFACE } from "./example";
import { InterfaceInput } from "./components/InterfaceInput";
import { FieldsEditor } from "./components/FieldsEditor";
import { OptionsPanel } from "./components/OptionsPanel";
import { CodeOutput } from "./components/CodeOutput";

type ParseStatus = {
  state: "idle" | "ok" | "error";
  message: string;
};

function App() {
  const [source, setSource] = useState(EXAMPLE_INTERFACE);

  const [fields, setFields] = useState<ParsedField[]>(() => {
    const result = parseInterface(EXAMPLE_INTERFACE);
    return result.fields;
  });

  const [status, setStatus] = useState<ParseStatus>(() => {
    const result = parseInterface(EXAMPLE_INTERFACE);

    return result.error
      ? { state: "error", message: result.error }
      : { state: "ok", message: `${result.fields.length} полей` };
  });

  const dtoName = useMemo(
    () =>
      source.match(/export\s+(?:interface|type)\s+(\w+)/)?.[1] ?? "MyRowType",
    [source]
  );

  const [options, setOptions] = useState<GeneratorOptions>({
    rowType: "custom",
    showWidth: true,
    format: "array",
    dtoName: dtoName,
  });

  const effectiveOptions = useMemo(
    () => ({
      ...options,
      rowType: options.rowType === "any" ? "any" : dtoName,
    }),
    [options, dtoName]
  );

  const code = useMemo(
    () => generateCode(fields, effectiveOptions),
    [fields, effectiveOptions]
  );

  const handleParse = useCallback(() => {
    const result = parseInterface(source);

    if (result.error) {
      setStatus({
        state: "error",
        message: result.error,
      });

      setFields([]);
      return;
    }

    setStatus({
      state: "ok",
      message: `${result.fields.length} полей`,
    });

    setFields(result.fields);
  }, [source]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Генератор колонок
          </h1>

          <p className="text-sm text-gray-400 mt-0.5">
            TypeScript интерфейс →{" "}
            <code className="font-mono bg-gray-100 px-1 rounded text-gray-600">
              ColumnMetaType[]
            </code>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <InterfaceInput
            value={source}
            onChange={setSource}
            onParse={handleParse}
            status={status}
          />

          <FieldsEditor fields={fields} onChange={setFields} />
        </div>

        <OptionsPanel options={options} onChange={setOptions} />

        <CodeOutput code={code} fields={fields} />
      </div>
    </div>
  );
}

export default App;

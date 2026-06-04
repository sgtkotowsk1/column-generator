import type { ParsedField, GeneratorOptions } from './types';

export function generateCode(fields: ParsedField[], opts: GeneratorOptions): string {
  const active = fields.filter((f) => f.enabled);
  if (!active.length) return '// Нет выбранных полей';

  const { rowType, showWidth, trailingComma, format } = opts;

  const items = active.map((f, idx) => {
    const isLast = idx === active.length - 1;
    let line = `    { header: "${f.header}", field: "${f.field}"`;
    if (showWidth) line += `, width: ${f.width}`;
    line += ` }`;
    if (!isLast || trailingComma) line += ',';
    return line;
  });

  if (format === 'usememo') {
    return [
      `const columns = useMemo((): ColumnMetaType<${rowType}>[] => {`,
      `  return [`,
      ...items.map((l) => l.replace(/^  /, '')),
      `  ];`,
      `}, []);`,
    ].join('\n');
  }

  return [
    `const columns: ColumnMetaType<${rowType}>[] = [`,
    ...items,
    `];`,
  ].join('\n');
}

export function generateMockRow(fields: ParsedField[]): Record<string, string | number> {
  const row: Record<string, string | number> = {};
  for (const f of fields) {
    if (f.type === 'number') {
      row[f.field] = Math.floor(Math.random() * 1000);
    } else if (f.field.toLowerCase().includes('name')) {
      row[f.field] = 'Пример значения';
    } else {
      row[f.field] = `${f.field}_val`;
    }
  }
  return row;
}

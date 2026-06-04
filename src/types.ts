export type FieldType = 'number' | 'string' | 'boolean' | 'unknown';

export interface ParsedField {
  field: string;
  header: string;
  width: number;
  type: FieldType;
  enabled: boolean;
}

export type OutputFormat = 'array' | 'usememo';

export interface GeneratorOptions {
  rowType: string;
  showWidth: boolean;
  trailingComma: boolean;
  format: OutputFormat;
}

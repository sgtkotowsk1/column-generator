export type FieldType = 'number' | 'string' | 'boolean' | 'unknown';

export interface ParsedField {
  field: string;
  header: string;
  width: number;
  type: FieldType;
  hidden: boolean;
  enabled: boolean;
}

export type OutputFormat = 'array' | 'usememo';

export interface GeneratorOptions {
  rowType: string;
  showWidth: boolean;
  dtoName: string;
  format: OutputFormat;
}

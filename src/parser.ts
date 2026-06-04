import type { FieldType, ParsedField } from "./types";

const LABELS: Record<string, string> = {
  Id: "Ключ",
  Name: "Название",
  Code: "Код",
  Type: "Тип",
  Status: "Статус",
  Description: "Описание",
  Precision: "Точность",
  Value: "Значение",
  Key: "Ключ",
  Date: "Дата",
  Time: "Время",
  User: "Пользователь",
  Email: "Email",
  Phone: "Телефон",
  Address: "Адрес",
  "Created At": "Создан",
  "Updated At": "Обновлён",
  "Deleted At": "Удалён",
};

function toLabel(key: string): string {
  const lower = key.toLowerCase();

  if (lower.endsWith("id")) {
    return "Ключ";
  }

  if (lower.endsWith("name")) {
    return "Наименование";
  }

  if (lower.endsWith("code")) {
    return "Код";
  }

  if (lower.endsWith("description")) {
    return "Описание";
  }

  if (lower.endsWith("status")) {
    return "Статус";
  }

  if (lower.endsWith("type")) {
    return "Тип";
  }

  const spaced = key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();

  return LABELS[spaced] ?? spaced;
}

function normalizeType(raw: string): FieldType {
  const t = raw
    .trim()
    .split(/\s*\|\s*/)[0]
    .replace(/\?$/, "")
    .trim()
    .toLowerCase();
  if (t === "number") return "number";
  if (t === "string") return "string";
  if (t === "boolean") return "boolean";
  return "unknown";
}

function guessWidth(fieldName: string, type: FieldType): number {
  const n = fieldName.toLowerCase();
  if (n.endsWith("id")) return 80;
  if (n.includes("name") || n.includes("description") || n.includes("place"))
    return 200;
  if (n.includes("code") || n.includes("num") || n.includes("status"))
    return 120;
  if (type === "number") return 100;
  return 150;
}

export interface ParseResult {
  fields: ParsedField[];
  error?: string;
}

export function parseInterface(src: string): ParseResult {
  const bodyMatch = src.match(/\{([\s\S]*?)\}\s*;?\s*$/);
  if (!bodyMatch) return { fields: [], error: "Тело интерфейса не найдено" };

  const body = bodyMatch[1];
  const re = /(['"]?[\w$]+['"]?)\s*\??\s*:\s*([\w<>[\]|,\s]+?)(?:\s*;)/g;

  const fields: ParsedField[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(body)) !== null) {
    const rawKey = m[1].replace(/['"]/g, "");
    const type = normalizeType(m[2]);
    fields.push({
      field: rawKey,
      header: toLabel(rawKey),
      width: guessWidth(rawKey, type),
      type,
      enabled: true,
      hidden: false,
    });
  }

  if (!fields.length) return { fields: [], error: "Поля не найдены" };
  return { fields };
}

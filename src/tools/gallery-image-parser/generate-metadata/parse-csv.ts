import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { IMAGE_INPUT_ROOT } from '../config';
import path from 'path';

export type CsvRow = {
  'Image Name': string;
  Folder: string;
  'Additional Tags'?: string;
  Order?: string;
  'Description (Swedish)'?: string;
  'Description (English)'?: string;
};

export function readRawCsv(filePath: string): CsvRow[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.trim()) {
    return [];
  }
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];
}

function parseTags(rawTags: string | undefined, folders: Set<string>, imagePath: string): string[] {
  const tags: string[] = rawTags
    ? rawTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  for (const tag of tags) {
    if (!folders.has(tag)) {
      throw new Error(`CSV tag '${tag}' on '${imagePath}' does not match any folder under '${IMAGE_INPUT_ROOT}'`);
    }
  }

  return tags;
}

function parseOrder(rawOrder: string | undefined, imagePath: string): number | undefined {
  if (rawOrder === undefined || rawOrder === null || rawOrder === '') {
    return undefined;
  }

  const parsed = Number(rawOrder);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid Order value for key '${imagePath}': '${rawOrder}'`);
  }

  return parsed;
}

export type ImageMetadata = {
  folder: string;
  name: string;
  tags: string[];
  order?: number;
  swedishDescription?: string;
  englishDescription?: string;
};

export function parseCsv(folders: Set<string>, csvRows: CsvRow[]): ImageMetadata[] {
  const imageMetadata = [];

  for (const row of csvRows) {
    const folder = row.Folder?.trim();
    const fileName = row['Image Name']?.trim();
    const baseName = path.parse(fileName).name;

    const swedishDesc = row['Description (Swedish)']?.trim();
    const englishDesc = row['Description (English)']?.trim();

    if (!folder || !fileName) {
      throw new Error(`CSV row must have Image Name and Folder: ${JSON.stringify(row)}`);
    }

    if (!swedishDesc || !englishDesc) {
      console.warn(`Warning: Missing description for image '${folder}/${fileName}'`);
    }

    const imagePath = `${folder}/${fileName}`;
    const tags = parseTags(row['Additional Tags'], folders, imagePath);
    const order = parseOrder(row.Order, imagePath);

    imageMetadata.push({
      folder,
      name: baseName,
      tags,
      order,
      swedishDesc,
      englishDesc,
    });
  }

  return imageMetadata;
}

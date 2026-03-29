import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

// Mapping from folder names (and CSV tags) to app-specific tags.
const FOLDER_TO_APP_TAG: Record<string, 'dogs' | 'cats' | 'farm animals' | 'portraits' | 'details'> = {
  Dogs: 'dogs',
  Cats: 'cats',
  'Farm Animals': 'farm animals',
  Portraits: 'portraits',
  Details: 'details',
} as const;

export type AppTag = (typeof FOLDER_TO_APP_TAG)[keyof typeof FOLDER_TO_APP_TAG];

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

export function mapToAppTag(raw: string, imagePath: string): AppTag {
  const mapped = FOLDER_TO_APP_TAG[raw];
  if (!mapped) {
    throw new Error(
      `CSV tag or folder '${raw}' on '${imagePath}' is not a supported app tag. ` +
        `Allowed values are: ${Object.keys(FOLDER_TO_APP_TAG).join(', ')}`,
    );
  }
  return mapped;
}

function parseAdditionalTags(rawTags: string | undefined, imagePath: string): AppTag[] {
  const tags: string[] = rawTags
    ? rawTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return tags.map((t) => mapToAppTag(t, imagePath));
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
  folder: string; // raw folder name like 'Dogs'
  name: string; // base filename without extension
  tags: AppTag[]; // final app-level tags (folder + additional, deduped)
  order?: number;
  swedishDescription?: string;
  englishDescription?: string;
};

export function parseCsv(folders: Set<string>, csvRows: CsvRow[]): ImageMetadata[] {
  const imageMetadata: ImageMetadata[] = [];

  for (const row of csvRows) {
    const folder = row.Folder?.trim();
    const fileName = row['Image Name']?.trim();
    const baseName = path.parse(fileName).name;

    const swedishDesc = row['Description (Swedish)']?.trim();
    const englishDesc = row['Description (English)']?.trim();

    if (!folder || !fileName) {
      throw new Error(`CSV row must have Image Name and Folder: ${JSON.stringify(row)}`);
    }

    if (!folders.has(folder)) {
      throw new Error(`CSV folder does not exist in input-images: '${folder}'`);
    }

    if (!swedishDesc || !englishDesc) {
      console.warn(`Warning: Missing description for image '${folder}/${fileName}'`);
    }

    const imagePath = `${folder}/${fileName}`;

    // Map folder name to app tag; throws if folder isn’t supported.
    const folderTag = mapToAppTag(folder, imagePath);

    const additional = parseAdditionalTags(row['Additional Tags'], imagePath);

    // Build final tags list: folder tag + additional tags, deduped.
    const tags: AppTag[] = [folderTag];
    for (const t of additional) {
      if (!tags.includes(t)) {
        tags.push(t);
      }
    }

    const order = parseOrder(row.Order, imagePath);

    imageMetadata.push({
      folder,
      name: baseName,
      tags,
      order,
      swedishDescription: swedishDesc,
      englishDescription: englishDesc,
    });
  }

  return imageMetadata;
}

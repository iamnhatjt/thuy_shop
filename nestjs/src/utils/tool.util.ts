import { nanoid } from 'nanoid';

export function generateUUID(size: number = 21) {
  return nanoid(size);
}

/**
 * Convert a Vietnamese (or any Unicode) string to a URL-safe slug.
 * Example: "Chăn Ga Gối đệm" => "chan-ga-goi-dem"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD') // decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric
    .replace(/[\s_]+/g, '-') // spaces/underscores to hyphens
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-|-$/g, ''); // trim leading/trailing hyphens
}

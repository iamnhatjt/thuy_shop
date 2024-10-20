import { nanoid } from 'nanoid';

export function generateUUID(size: number = 21) {
  return nanoid(size);
}

import * as nanoid from 'nanoid';

export function generateUUID(size: number = 21) {
  return nanoid.nanoid(size);
}

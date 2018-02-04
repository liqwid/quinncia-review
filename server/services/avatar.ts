import { readFile, writeFile, writeFileSync } from 'fs'
import { resolve } from 'path'
import { assetsPath } from 'utils/paths'
import { promisify } from 'util'

export const AVATAR_PATH = resolve(assetsPath, 'avatar.txt')
writeFileSync(AVATAR_PATH, '')

export function readAvatarInfo(): Promise<string | null> {
  return promisify(readFile)(AVATAR_PATH, 'utf8')
  .then((avatarUrl: string): string | null => avatarUrl || null)
}

export function saveAvatarInfo(imageUrl: string): Promise<void> {
  return promisify(writeFile)(AVATAR_PATH, imageUrl)
}

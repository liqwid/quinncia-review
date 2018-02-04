/**
 * Image service
 *
 * Keeps current images info in memory and acts as a DB layer
 *
 * Could be detached as a separate node app for server to scale better
 * E.g. 1 image service - multiple server apps
 */

import { readdir, writeFile, unlink } from 'fs'
import { resolve } from 'path'
import { assetsPath } from 'utils/paths'
import { promisify } from 'util'

export const IMAGES_PATH = resolve(assetsPath, 'img')

// Returns image url paths
export function getImageUrls(): Promise<string[]> {
  return promisify(readdir)(IMAGES_PATH)
}

export function saveImage(file: Express.Multer.File): Promise<void> {
  return promisify(writeFile)(`${IMAGES_PATH}/${file.originalname}`, file.buffer)
}

export function deleteImage(name: string): Promise<void> {
  return promisify(unlink)(`${IMAGES_PATH}/${name}`)
}

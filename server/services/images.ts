/**
 * Image service
 *
 * Keeps current images info in memory and acts as a DB layer
 *
 * Could be detached as a separate node app for server to scale better
 * E.g. 1 image service - multiple server apps
 */

import { readdirSync } from 'fs'
import { resolve } from 'path'
import { assetsPath } from 'utils/paths'

export const IMAGES_PATH = resolve(assetsPath, 'img')

// Returns image url paths
export function getImageUrls(): string[] {
  return readdirSync(IMAGES_PATH)
}

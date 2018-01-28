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

const IMAGES_PATH = resolve(assetsPath, 'img')

// Load image urls upon startup
const imageUrls = readdirSync(IMAGES_PATH)

export function getImageUrls() {
  return imageUrls
}

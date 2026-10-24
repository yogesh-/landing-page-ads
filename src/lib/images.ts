import fs from 'node:fs'
import path from 'node:path'

// Returns a /images/<name> URL only if the file exists in public/images — so pages never ship broken image URLs.
export function img(name: string): string | undefined {
  return fs.existsSync(path.join(process.cwd(), 'public', 'images', name)) ? `/images/${name}` : undefined
}

import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'docs');
await mkdir(output, { recursive: true });
for (const entry of await readdir(output)) await rm(join(output, entry), { recursive: true, force: true });
await cp(join(root, 'dist'), output, { recursive: true });
await writeFile(join(output, '.nojekyll'), '');
console.log('GitHub Pages files prepared in docs/.');

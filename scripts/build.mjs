import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
writeFileSync(join(dist, '404.html'), indexHtml);

console.log('Built dist/ with SPA fallback 404.html');

// Fails if the page script does not parse, or a trace widget names an EMG pattern the engine does not define.
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const html = readFileSync(new URL('../atlas.html', import.meta.url), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
if (!js) throw new Error('no inline <script> found');
const f = join(mkdtempSync(join(tmpdir(), 'atlas-')), 'page.js');
writeFileSync(f, js);
execFileSync(process.execPath, ['--check', f], { stdio: 'inherit' });

const defined = new Set([...js.matchAll(/^\s(\w+):\{dur:/gm)].map(m => m[1]));
const used = [...html.matchAll(/data-p="(\w+)"/g), ...js.matchAll(/p:'(\w+)'/g)].map(m => m[1]);
const missing = used.filter(p => !defined.has(p));
if (missing.length) throw new Error(`undefined EMG patterns: ${[...new Set(missing)].join(', ')}`);
if (/prefers-color-scheme/.test(html)) throw new Error('page must stay light-only');
console.log(`ok · ${defined.size} patterns, ${used.length} uses`);

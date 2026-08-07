import { readFile, readdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const workspace = process.cwd();
const roots = process.argv.slice(2);
const forbidden = [
  ['krippen', 'dorf'].join(''),
  ['casus', 'bene'].join(''),
];

if (roots.length === 0) {
  throw new Error('Mindestens ein zu prüfender Pfad ist erforderlich.');
}

async function collect(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...await collect(entryPath));
    if (entry.isFile()) files.push(entryPath);
  }
  return files;
}

const files = (await Promise.all(roots.map((root) => collect(resolve(workspace, root))))).flat();
const findings = [];

for (const file of files) {
  const displayPath = relative(workspace, file);
  const normalizedPath = displayPath.toLocaleLowerCase('de');
  for (const term of forbidden) {
    if (normalizedPath.includes(term)) findings.push(`${displayPath}: verbotener Begriff im Dateinamen`);
  }

  const content = await readFile(file);
  const normalizedContent = content.toString('utf8').toLocaleLowerCase('de');
  for (const term of forbidden) {
    if (normalizedContent.includes(term)) findings.push(`${displayPath}: verbotener Begriff im Inhalt`);
  }
}

if (findings.length > 0) {
  console.error('Ausschluss-Guard fehlgeschlagen:');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exitCode = 1;
} else {
  console.log(`Ausschluss-Guard: ${files.length} Dateien geprüft, keine Treffer.`);
}

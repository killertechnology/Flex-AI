import { cpSync, rmSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const concepts = [
  ['concept-a', 'premium-ice'],
  ['concept-b', 'pro-shop'],
  ['concept-c', 'penguin-modern'],
  ['concept-d', 'penguin-classic']
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('npx', ['tsc', '-b']);

rmSync('/tmp/flex-build', { recursive: true, force: true });
rmSync('static-site/images/team-categories', { recursive: true, force: true });
rmSync('static-site/images/store', { recursive: true, force: true });
await mkdir('static-site/images', { recursive: true });
cpSync('public/images/team-categories', 'static-site/images/team-categories', { recursive: true });
cpSync('public/images/store', 'static-site/images/store', { recursive: true });

for (const [concept, theme] of concepts) {
  run('npx', ['vite', 'build', '--base', `/${concept}/`, '--outDir', `/tmp/flex-build/${concept}`, '--emptyOutDir'], {
    env: { ...process.env, VITE_THEME: theme }
  });

  rmSync(`static-site/${concept}`, { recursive: true, force: true });
  await mkdir('static-site', { recursive: true });
  cpSync(`/tmp/flex-build/${concept}`, `static-site/${concept}`, { recursive: true });

  rmSync(`static-site/${concept}/images/team-categories`, { recursive: true, force: true });
  rmSync(`static-site/${concept}/images/store`, { recursive: true, force: true });
}

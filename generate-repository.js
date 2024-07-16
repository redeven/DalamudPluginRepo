const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
try {
  const repositories = readdirSync(path.resolve(__dirname), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => path.resolve(__dirname, d.name, 'repository.json'))
    .map((repoPath) => readFileSync(repoPath, 'utf-8'))
    .map((repoString) => JSON.parse(repoString));

  const combinedRepository = [].concat(...repositories);
  writeFileSync('repository.json', JSON.stringify(combinedRepository, null, 4), 'utf-8');
} catch (e) {}

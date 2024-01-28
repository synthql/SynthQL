const packageJson = require('../package.json');
const { execSync } = require('child_process');

function bumpMinorVersion(version) {
    const [major, minor, patch] = version.split('.');
    return `${major}.${parseInt(minor) + 1}.${patch}`;
}

const currentVersion = packageJson.version;
const nextVersion = bumpMinorVersion(currentVersion);

console.log("Current version", currentVersion);
console.log("Bumping minor version to", nextVersion);

const packagesToUpdate = [
    "@synthql/queries",
    "@synthql/backend",
    "@synthql/react",
]

packagesToUpdate.forEach(packageName => {
    const packageDir = packageName.replace('@synthql/', '');
    const dir = `./packages/${packageDir}`;

    console.log(`Updating ${packageName} to ${nextVersion}`);

    execSync(`yarn publish:minor --new-version ${nextVersion}`, { cwd: dir, stdio: 'inherit'});
})

execSync(`yarn version --new-version ${nextVersion}`, {
    stdio: 'inherit'
})
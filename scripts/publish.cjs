const packageJson = require('../package.json');
const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Bumps the minor version of a given version string
 *
 * @param {string} version
 * @returns string
 */
function bumpMinorVersion(version) {
    const [major, minor, patch] = version.split('.');
    return `${major}.${parseInt(minor) + 1}.${patch}`;
}

const currentVersion = packageJson.version;
const nextVersion = bumpMinorVersion(currentVersion);

console.log('Current version', currentVersion);
console.log('Bumping minor version to', nextVersion);

const packagesToUpdate = [
    '@synthql/backend',
    '@synthql/cli',
    '@synthql/introspect',
    '@synthql/queries',
    '@synthql/react',
];

packagesToUpdate.forEach((packageName) => {
    const packageDir = packageName.replace('@synthql/', '');
    const dir = `./packages/${packageDir}`;

    console.log(`🚀 Updating ${packageName} to ${nextVersion}`);
    updateSynthqlDependencyVersions(dir, nextVersion);

    execSync(`yarn publish:minor --new-version ${nextVersion}`, {
        cwd: dir,
        stdio: 'inherit',
    });
});

execSync(`yarn version --new-version ${nextVersion}`, {
    stdio: 'inherit',
});

execSync(`yarn format:root`, {
    stdio: 'inherit',
});

execSync(`git add .`, {
    stdio: 'inherit',
});

execSync(`git commit -m "release: v${nextVersion}"`, {
    stdio: 'inherit',
});

/**
 * Updates the version of all @synthql dependencies in the package.json file
 */
function updateSynthqlDependencyVersions(packagePath, version) {
    const packageJsonPath = `${packagePath}/package.json`;
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
        if (dependency.startsWith('@synthql')) {
            packageJson.dependencies[dependency] = version;
        }
    }
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
}

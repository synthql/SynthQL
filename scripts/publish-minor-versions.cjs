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

// Names of packages to update
const packagesToUpdate = [
    '@synthql/backend',
    '@synthql/cli',
    '@synthql/introspect',
    '@synthql/queries',
    '@synthql/react',
];

// First update the root package.json
execSync(`yarn version --new-version ${nextVersion}`, {
    stdio: 'inherit',
});

// Then update the packages' package.json
packagesToUpdate.forEach((packageName, index, packages) => {
    const packageDir = packageName.replace('@synthql/', '');
    const dir = `./packages/${packageDir}`;

    console.log(`🚀 Updating ${packageName} to ${nextVersion}`);
    updateSynthqlDependencyVersions(dir, nextVersion);

    try {
        execSync(`yarn publish:minor --new-version ${nextVersion}`, {
            cwd: dir,
            stdio: 'inherit',
        });
    } catch (error) {
        for (let i = index; i >= 0; i--) {
            try {
                const pkgName = packages[i];
                const pkgDir = pkgName.replace('@synthql/', '');
                const pkgPath = `./packages/${pkgDir}`;

                execSync(`npm unpublish ${pkgName}@${nextVersion}`, {
                    cwd: pkgPath,
                    stdio: 'inherit',
                });
            } catch (error) {
                continue;
            }
        }

        process.exit(1);
    }
});

// Format the results using Prettier
execSync(`yarn format:root`, {
    stdio: 'inherit',
});

// Stage the changes
execSync(`git add .`, {
    stdio: 'inherit',
});

// Commit the changes
execSync(`git commit -m "[skip actions]-release: v${nextVersion}"`, {
    stdio: 'inherit',
});

// Push the changes
execSync(`git push`, {
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

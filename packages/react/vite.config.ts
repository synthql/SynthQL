import { defineConfig } from 'vitest/config';
import packageJson from './package.json';
import path from 'path';
import { nodeExternals } from 'rollup-plugin-node-externals';

const resolveXqlAliases = Object.keys(packageJson.dependencies)
    .filter((dep) => dep.startsWith('@synthql/'))
    .reduce((resolveAlias: Record<string, string>, dep) => {
        const packageName = dep.replace('@synthql/', '');
        resolveAlias[dep] = path.resolve(
            __dirname,
            `../${packageName}/src/index.ts`,
        );
        return resolveAlias;
    }, {});

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'build/src'),
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            plugins: [
                nodeExternals({
                    deps: true,
                    devDeps: true,
                    optDeps: true,
                    peerDeps: true,
                }),
            ],
        },
        minify: false,
    },
    resolve: {
        alias: resolveXqlAliases,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            all: true,
            clean: true,
            enabled: true,
            reportsDirectory: 'coverage',
            reportOnFailure: true,
            reporter: ['html'],
            include: ['src/**/*'],
        },
    },
});

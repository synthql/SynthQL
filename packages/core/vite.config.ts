import { defineConfig } from "vitest/config"
import packageJson from "../../package.json"
import path from "path"

function pathToPackage(packageName: string) {
    return path.resolve(__dirname, `../${packageName}/src/index.ts`)
}

const resolveXqlAliases =
    ['@synthql/queries', '@synthql/react', '@synthql/backend']
        .reduce((resolveAlias: Record<string, string>, dep) => {
            const packageName = dep.replace("@synthql/", "")
            resolveAlias[dep] = pathToPackage(packageName)
            return resolveAlias
        }, {})

export default defineConfig({

    build: {

        outDir: path.resolve(__dirname, "build"),
        lib: {
            entry: {
                react: pathToPackage("react"),
                backend: pathToPackage("backend"),
                queries: pathToPackage("queries"),
            },
            fileName: (format, entryName) => {
                if (format === "es") {
                    return `${entryName}.js`
                }
                if (format === "cjs") {
                    return `${entryName}.cjs`
                }
                throw new Error(`Unknown format: ${format}`)
            },
            formats: ["es", "cjs"],
        },
        minify: false,
        rollupOptions: {
            external: ["pg", "kysely", "react", "react-dom", "@tanstack/react-query"]
        }
    },

    resolve: {
        alias: resolveXqlAliases,
    },
    test: {
        globals: true,
    },
})
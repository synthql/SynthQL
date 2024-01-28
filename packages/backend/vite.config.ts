import { defineConfig } from "vitest/config"
import packageJson from "./package.json"
import path from "path"

const resolveXqlAliases =
    Object.keys(packageJson.dependencies)
        .filter(dep => dep.startsWith("@xql/"))
        .reduce((resolveAlias: Record<string, string>, dep) => {
            const packageName = dep.replace("@xql/", "")
            resolveAlias[dep] = path.resolve(__dirname, `../${packageName}/src/index.ts`)
            return resolveAlias
        }, {})

console.log(resolveXqlAliases)

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, "build"),
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            fileName: "index",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["pg", "kysely"]
        },
        minify: false,
    },
    resolve: {
        alias: resolveXqlAliases,
    },
    test: {
        globals: true,
    },
})
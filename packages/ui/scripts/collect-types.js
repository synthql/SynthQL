const path = require("path")
const fs = require('fs');

function main() {
    const modules = ["backend", "queries"].map(module => {
        return {
            module,
            types: readTypes(module),
            fileName: `@synthql/${module}/index.d.ts`
        }
    })

    fs.writeFileSync(path.join(__dirname,"../src/components/Editor/types.json"), JSON.stringify(modules,null,2))
}

/**
 * @param {string} module 
 * @returns string
 */
function readTypes(module) {
    const contents = fs.readFileSync(path.join(__dirname, `../../${module}/build/types.d.ts`))
        .toString()
        .replace(/"src\//g, `"@synthql/${module}/src/`);

    
    const out = `${contents}\n declare module "@synthql/${module}" { export * from "@synthql/${module}/src/index"; }`;

    console.log(out)

    return out
}


main()
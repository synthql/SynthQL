'use client';

import { default as MonacoEditor, useMonaco } from '@monaco-editor/react';
import { PanelContainer } from "../Panel";
import { useEffect } from 'react';
import types from "./types.json"

const initialTemplate = [
    `import { query } from "@synthql/queries"`,
    ``,
    `interface DB { film: { film_id:number, title:string } }`,
    ``,
    `const from = query<DB>().from;`,
    ``,
    `export default from('film')`,
    `    .columns('id', 'title')`,
    `    .many()`
].join("\n");


export function Editor() {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            const model = monaco.editor.getModels()[0];

            for (const type of types) {
                monaco
                    .languages
                    .typescript
                    .typescriptDefaults
                    .addExtraLib(`${type.types}\n declare module "@synthql/${type.module}" { export * from "src/index" }`, `node_modules/@synthql/${type.module}/index.d.ts`);
            }



            model.setValue(initialTemplate);

        }
    }, [monaco]);

    return <PanelContainer>
        <MonacoEditor
            height={"100%"}
            defaultLanguage="typescript"
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "off",
                // light theme
                theme: "vs",
                autoIndent: "advanced",

            }}
        />
    </PanelContainer>
}
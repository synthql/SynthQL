import fs from 'fs';
import c from 'child_process';

export function executeProgram(program: string) {
    fs.writeFileSync('./public/tmp.ts', program);
    fs.writeFileSync(
        './public/execute-entrypoint.ts',
        `import query from "./tmp";\n\nconsole.log(JSON.stringify(query))`,
    );

    // execute the tsx binary over the execute-entrypoint.ts file
    const query = c
        .execFileSync('tsx', ['./public/execute-entrypoint.ts'])
        .toString();

    console.log('execute-entrypoint.ts output', query);

    try {
        return JSON.parse(query);
    } catch (e) {
        throw new Error(
            ['Failed to parse JSON:', '', query, '', 'Original error:', e].join(
                '\n',
            ),
        );
    }
}

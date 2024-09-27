const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Command line arguments
const [, , testFilePath] = process.argv;

// Check if the test file path is provided
if (!testFilePath) {
    console.error('Please provide a path to the test file.');
    process.exit(1);
}

// Function to parse the test file and extract examples
/**
 *
 * @param {string} filePath
 * @returns {Array<{ title: string, description: string, code: string }>
 */
function parseTestFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const examples = [];
    let currentExample = null;
    let collectingDescription = false;

    for (const line of lines) {
        if (line.includes('@@start-example@@')) {
            currentExample = {
                title: line.split('@@start-example@@')[1].trim(),
                description: '',
                code: '',
            };
            collectingDescription = true;
        } else if (line.includes('@@end-example@@')) {
            examples.push(currentExample);
            currentExample = null;
            collectingDescription = false;
        } else if (collectingDescription && line.includes('@@desc@@')) {
            currentExample.description +=
                line.split('@@desc@@')[1].trim() + '\n';
        } else if (currentExample) {
            currentExample.code += line + '\n';
        }
    }

    for (const example of examples) {
        example.code = fixIdentation(example.code);
    }

    return examples;
}

/**
 * Takes a string of code and fixes the indentation by removing the common leading whitespace
 *
 * @param {string} code
 * @returns {string}
 */
function fixIdentation(code) {
    const lines = code.split('\n');
    const leadingWhitespace = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^\s*/)[0])
        .reduce((acc, whitespace) => {
            if (acc === null) {
                return whitespace;
            }
            let i = 0;
            while (
                i < acc.length &&
                i < whitespace.length &&
                acc[i] === whitespace[i]
            ) {
                i++;
            }
            return acc.slice(0, i);
        }, null);
    return lines.map((line) => line.replace(leadingWhitespace, '')).join('\n');
}

/**
 *
 * @param {Array<{ title: string, description: string, code: string }>} examples
 * @returns {string}
 */
function generateMarkdown(examples) {
    return examples
        .map((example) => {
            return [
                `## ${example.title}`,
                `${example.description}`,
                '```ts\n' + example.code + '\n```',
            ]
                .filter((x) => x.length > 0)
                .join('\n\n');
        })
        .join('\n\n');
}

// Main function to process the test file and generate markdown
async function main() {
    const examples = parseTestFile(testFilePath);
    const prettierConfig = await prettier.resolveConfig(
        path.join(__dirname, '../..prettierrc.js'),
    );

    if (!prettierConfig) {
        console.error('Prettier config not found');
        process.exit(1);
    }

    const markdown = await prettier.format(
        `# Examples\n\n${generateMarkdown(examples)}`,
        { ...prettierConfig, parser: 'markdown' },
    );
    const outputFilePath = path.join(
        __dirname,
        '../packages/docs/docs',
        '350-examples.md',
    );
    fs.writeFileSync(outputFilePath, markdown);
    console.log(`Markdown generated at ${outputFilePath}`);
}

main();

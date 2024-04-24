import {
    describe,
    beforeEach,
    vitest,
    expect,
    it,
    afterEach,
    test,
} from 'vitest';

describe('index', () => {
    test('1', () => {});
});

// describe('cli', () => {
//     let originalArgv: string[];

//     beforeEach(() => {
//         // Remove all cached modules. The cache needs to be cleared before running
//         // each command, otherwise you will see the same results from the command
//         // run in your first test in subsequent tests.
//         vitest.resetModules();

//         // Each test overwrites process arguments so store the original arguments
//         originalArgv = process.argv;
//     });

//     afterEach(() => {
//         vitest.resetAllMocks();

//         // Set process arguments back to the original value
//         process.argv = originalArgv;
//     });

//     it('should run install command', async () => {
//         const consoleSpy = vitest.spyOn(console, 'log');

//         const a = await runCommand('install', 'some-package', '--save');

//         console.log(a);

//         expect(consoleSpy).toBeCalledWith('Installing');
//     });

//     it('should run uninstall command', async () => {
//         const consoleSpy = vitest.spyOn(console, 'log');

//         await runCommand('uninstall', 'some-package');

//         expect(consoleSpy).toBeCalledWith('Uninstalling');
//     });
// });

// /**
//  * Programmatically set arguments and execute the CLI script
//  *
//  * @param {...string} args - positional and option arguments for the command to run
//  */
// async function runCommand(...args: string[]) {
//     process.argv = [
//         'node', // Not used but a value is required at this index in the array
//         'index.cjs', // Not used but a value is required at this index in the array
//         ...args,
//     ];

//     // Require the yargs CLI script
//     return require('./index');
// }

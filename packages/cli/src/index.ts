#!/usr/bin/env node

import { cli } from './cli';

cli(process.argv).help().demandCommand(1).parse();

setTimeout(() => {
    process.exit(0);
}, 10000);

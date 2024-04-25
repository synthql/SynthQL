#!/usr/bin/env node

import { cli } from './cli';

cli({ argv: process.argv, exit: process.exit }).help().demandCommand(1).parse();

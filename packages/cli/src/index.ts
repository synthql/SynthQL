#!/usr/bin/env node

import { cli } from './cli';

cli(process.argv).help().demandCommand(1).parseSync();

process.exit(0);

import Ajv from 'ajv';
import { cliArgvSchema, configFileSchema } from './schemas';

const ajv = new Ajv({ allErrors: true });

const validateConfigFile = ajv.compile(configFileSchema);
const validateCliArgv = ajv.compile(cliArgvSchema);

export { validateConfigFile, validateCliArgv };

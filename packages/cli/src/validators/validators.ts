import Ajv from 'ajv';
import { schemaDefOverridesSchema, configFileSchema } from './schemas';

const ajv = new Ajv({ allErrors: true });

const validateConfigFile = ajv.compile(configFileSchema);
const validateSchemaDefOverrides = ajv.compile(schemaDefOverridesSchema);

export { validateConfigFile, validateSchemaDefOverrides };

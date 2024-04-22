'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generate = void 0;
const backend_1 = require('@synthql/backend');
const pg_1 = require('pg');
const generate = (_a) =>
    __awaiter(
        void 0,
        [_a],
        void 0,
        function* ({ connectionString, out, defaultSchema, schemas = [] }) {
            const pool = new pg_1.Pool({
                connectionString,
            });
            const queryEngine = new backend_1.QueryEngine({
                pool,
                schema: defaultSchema,
            });
            const result = yield queryEngine.generateSchema({
                out,
                defaultSchema,
                schemas,
            });
            return result;
        },
    );
exports.generate = generate;
//# sourceMappingURL=index.js.map

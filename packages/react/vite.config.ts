import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        outDir: path.resolve(__dirname, 'build'),
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
});

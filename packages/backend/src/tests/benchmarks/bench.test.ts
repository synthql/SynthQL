import Benchmark from 'benchmark';
import fs from 'fs';
import path from 'path';
import { describe, test } from 'vitest';
import { collectLast } from '../..';
import { col, from } from '../generated';
import { queryEngine } from '../queryEngine';

describe('Benchmark tests', () => {
    test(`Find matching rows`, async () => {
        const suite = new Benchmark.Suite();
        const lines: Array<string> = [];

        suite
            .add('Find one matching row', async () => {
                const q = from('actor').where({ actor_id: 1 }).one();

                await collectLast(
                    queryEngine.execute(q, {
                        returnLastOnly: true,
                    }),
                );
            })
            .add(
                'Find one matching row with three-level-deep nested include',
                async () => {
                    const city = from('city')
                        .columns('city_id', 'city')
                        .where({
                            city_id: col('address.city_id'),
                        })
                        .one();

                    const address = from('address')
                        .columns('address_id', 'city_id', 'address', 'district')
                        .where({
                            address_id: col('store.address_id'),
                        })
                        .include({ city })
                        .one();

                    const store = from('store')
                        .columns('store_id', 'address_id', 'manager_staff_id')
                        .where({
                            store_id: col('customer.store_id'),
                        })
                        .include({ address })
                        .one();

                    const q = from('customer')
                        .columns(
                            'customer_id',
                            'store_id',
                            'first_name',
                            'last_name',
                            'email',
                        )
                        .where({ customer_id: { in: [4] } })
                        .include({ store })
                        .one();

                    await collectLast(
                        queryEngine.execute(q, {
                            returnLastOnly: true,
                        }),
                    );
                },
            )
            .on('cycle', (event: any) => {
                // Output benchmark result by converting benchmark result to string
                lines.push(String(event.target));
            })
            .run();

        // Write to output file
        const dir = path.resolve(__dirname, 'generated');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(path.join(dir, 'output.txt'), lines.join('\n'));
    });
});

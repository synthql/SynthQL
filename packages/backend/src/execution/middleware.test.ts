import { test, describe, expect } from 'vitest';
import { DB, from } from '../tests/generated';
import { Query } from '@synthql/queries';
import { middleware } from './middleware';
import { createQueryEngine } from '../tests/queryEngine';

// Create type/interface for context
type UserRole = 'user' | 'admin' | 'super';
interface Session {
    id: number;
    email: string;
    roles: UserRole[];
    isActive: boolean;
}

// Create middleware
const restrictPaymentsByCustomer = middleware<Query<DB, 'payment'>, Session>({
    predicate: ({ query, context }) =>
        query?.from === 'payment' &&
        context?.roles?.includes('user') &&
        context?.isActive,
    transformQuery: ({ query, context }) => ({
        ...query,
        where: {
            ...query.where,
            customer_id: context.id,
        },
    }),
});

describe('createExpressSynthqlHandler', async () => {
    test('1', async () => {
        const queryEngine = createQueryEngine([restrictPaymentsByCustomer]);

        // Create context
        // This would be an object generated from a server
        // request handler (e.g a parsed cookie/token)
        const context: Session = {
            id: 1,
            email: 'user@example.com',
            roles: ['user', 'admin', 'super'],
            isActive: true,
        };

        // Create base query
        const q = from('payment').one();

        const queryWithContextManuallyAdded = from('payment')
            .where({
                customer_id: context.id,
            })
            .one();

        const result = await queryEngine.executeAndWait(q, context);

        const resultFromQueryWithContextManuallyAdded =
            await queryEngine.executeAndWait(queryWithContextManuallyAdded);

        expect(result).toEqual(resultFromQueryWithContextManuallyAdded);
    });
});

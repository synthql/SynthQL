import { test, describe, expect } from 'vitest';
import { DB, from } from '../tests/generated';
import { col, Query } from '@synthql/queries';
import { middleware } from './middleware';
import { createQueryEngine } from '../tests/queryEngine';

// Create type/interface for context
type UserRole = 'user' | 'admin' | 'super';
type UserPermission = 'user:read' | 'admin:read' | 'super:read';

interface Session {
    id: number;
    email: string;
    isActive: boolean;
    roles: UserRole[];
    permissions: UserPermission[];
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

describe('middleware', async () => {
    test('Query middleware is correctly executed', async () => {
        const queryEngine = createQueryEngine({
            middlewares: [restrictPaymentsByCustomer],
            dangerouslyAllowNoPermissions: false,
        });

        // Create context
        // This would usually be an object generated from a server
        // request handler (e.g a parsed cookie/token)
        const context: Session = {
            id: 1,
            email: 'user@example.com',
            isActive: true,
            roles: ['user', 'admin', 'super'],
            permissions: ['user:read', 'admin:read', 'super:read'],
        };

        // Create base query
        const q = createPaymentQuery().one();

        const queryWithContextManuallyAdded = createPaymentQuery()
            .where({
                customer_id: context.id,
            })
            .one();

        const result = await queryEngine.executeAndWait(q, { context });

        const resultFromQueryWithContextManuallyAdded =
            await queryEngine.executeAndWait(queryWithContextManuallyAdded, {
                context: { permissions: context.permissions },
            });

        expect(result).toEqual(resultFromQueryWithContextManuallyAdded);
    });
});

function createPaymentQuery() {
    return from('payment')
        .permissions('user:read')
        .include({
            customer: from('customer')
                .permissions('admin:read')
                .where({
                    customer_id: col('payment.customer_id'),
                })
                .one(),
        })
        .groupBy(
            'amount',
            'customer_id',
            'payment_date',
            'payment_id',
            'rental_id',
            'staff_id',
        );
}

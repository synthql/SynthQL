import { describe, expect } from 'vitest';
import { test } from '@fast-check/vitest';
import { AnyQuery, Query } from '@synthql/queries';
import { ArbitraryQueryBuilder } from '../arbitraries/ArbitraryQueryBuilder';
import { createQueryEngine } from '../../queryEngine';
import { DB } from '../../generated';

const queryBuilder = ArbitraryQueryBuilder.fromPagila();
const queryEngine = createQueryEngine({
    dangerouslyIgnorePermissions: false,
});

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

describe('Property based tests for permissions', () => {
    const numRuns = 100;
    const timeout = numRuns * 1000;
    const endOnFailure = true;

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        {
            verbose: true,
            numRuns,
            endOnFailure,
        },
    )(
        [
            'A query with permissions will fail unless all permissions are met',
        ].join(''),
        async (query) => {
            const permissionedQuery: Query<DB> = {
                ...query,
                permissions: context.permissions,
                name: defaultName(query),
            };

            expect(
                async () => await queryEngine.executeAndWait(permissionedQuery),
            ).rejects.toThrow(
                `The query '${permissionedQuery.name}' with a permissions list (ACL) included:`,
            );

            // Here we check if it errors when some,
            // but not all the permissions, are met
            expect(
                async () =>
                    await queryEngine.executeAndWait(permissionedQuery, {
                        context: { permissions: [context.permissions[0]] },
                    }),
            ).rejects.toThrow(
                `The query '${permissionedQuery.name}' with a permissions list (ACL) included:`,
            );
        },
        timeout,
    );

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        {
            verbose: true,
            numRuns,
            endOnFailure,
        },
    )(
        [
            'A query with no permissions will never fail for permission issues',
        ].join(''),
        async (query) => {
            expect(
                async () => await queryEngine.executeAndWait(query),
            ).not.toThrow();
        },
        timeout,
    );
});

function defaultName(query: AnyQuery) {
    const whereName = Object.keys(query.where).join('-and-');

    if (whereName === '') {
        return `${query.from}-all`;
    }

    return `${query.from}-by-${whereName}`;
}

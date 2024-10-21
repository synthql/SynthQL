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
    const testConfig = {
        verbose: true,
        numRuns,
        endOnFailure,
    };

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        testConfig,
    )(
        ['A query with permissions will fail when no permissions are met'].join(
            '',
        ),
        async (query) => {
            const permissionedQuery: Query<DB> = {
                ...query,
                permissions: context.permissions,
                name: defaultName(query),
            };

            // Here we check if it errors when
            // none of the permissions are met
            expect(
                async () => await queryEngine.executeAndWait(permissionedQuery),
            ).rejects.toThrow(
                `The query ${permissionedQuery?.name} is missing the following permissions: ${context.permissions.join(', ')}`,
            );
        },
        timeout,
    );

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        testConfig,
    )(
        [
            'A query with permissions will fail when not all permissions are met',
        ].join(''),
        async (query) => {
            const permissionedQuery: Query<DB> = {
                ...query,
                permissions: context.permissions,
                name: defaultName(query),
            };

            const [permission, ...rest] = context.permissions;

            // Here we check if it errors when some,
            // but not all the permissions, are met
            expect(
                async () =>
                    await queryEngine.executeAndWait(permissionedQuery, {
                        context: { permissions: [permission] },
                    }),
            ).rejects.toThrow(
                `The query ${permissionedQuery?.name} is missing the following permissions: ${rest.join(', ')}`,
            );
        },
        timeout,
    );

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        testConfig,
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

    test.prop(
        [queryBuilder.withCardinality('many').withSomeResults().build()],
        testConfig,
    )(
        [
            'A query with all permissions will never fail for permission issues',
        ].join(''),
        async (query) => {
            const permissionedQuery: Query<DB> = {
                ...query,
                permissions: context.permissions,
                name: defaultName(query),
            };

            await expect(
                queryEngine.executeAndWait(permissionedQuery, {
                    context: { permissions: context.permissions },
                }),
            ).resolves.not.toThrow();
        },
        timeout,
    );
});

function defaultName(query: AnyQuery) {
    const whereName = Object.keys(query.where ?? {}).join('-and-');

    if (whereName === '') {
        return `${query.from}-all`;
    }

    return `${query.from}-by-${whereName}`;
}

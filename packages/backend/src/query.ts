import { Column, Query } from '@synthql/queries';
import { DB, from } from './tests/generated';
import { AnyDb, AnyQuery } from './types';

const q = from('actor').many();
const q2: Query<DB, 'actor'> = q;

const q3: typeof q = q2;

const q4: AnyQuery = q;

const q5: AnyQuery = q2;

const a = q2.where;

const b: typeof q4.where = q2.where;

const a1: Column<DB, 'actor'> = 'actor_id';

const a2: Column<AnyDb, ''> = '';

const b1: Table<DB>;
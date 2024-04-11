import { Table } from './Table';
import { JoinOp } from './JoinOp';

export type RefOp<DB> = {
    $ref: {
        table: Table<DB>;
        column: string;
        op?: JoinOp;
    };
};

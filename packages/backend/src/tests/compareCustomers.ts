import { DB } from './generated';
import { TableTypes } from './getTableTypes';

type C = DB['customer']['columns'];

type Customer = Pick<TableTypes<C>, 'customer_id'>;

export const compareCustomers = (a: Customer, b: Customer) => {
    return a.customer_id - b.customer_id;
};

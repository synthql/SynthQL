import { DB } from './generated';
import { TableTypes } from './getTableTypes';

type C = DB['customer']['columns'];

type Customer = TableTypes<C>;

export const compareCustomers = (a: Customer, b: Customer) => {
    return a.customer_id - b.customer_id;
};

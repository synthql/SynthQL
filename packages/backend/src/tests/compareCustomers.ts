import { DB } from './generated.schema';

type Customers = Pick<DB['public.customer'], 'customer_id'>;

export const compareCustomers = (a: Customers, b: Customers) => {
    return a.customer_id - b.customer_id;
};

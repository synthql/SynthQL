import { DB } from './generated';
import { ColumnDataTypes } from './getColumnDataTypes';

type SelectedCustomerColumnDataTypes = Pick<
    ColumnDataTypes<DB['customer']['columns']>,
    'customer_id'
>;

export const compareCustomers = (
    a: SelectedCustomerColumnDataTypes,
    b: SelectedCustomerColumnDataTypes,
) => {
    return a.customer_id - b.customer_id;
};

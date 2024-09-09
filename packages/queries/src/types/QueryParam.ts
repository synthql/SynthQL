export type QueryParam<TValue = unknown> = {
    type: 'synthql::param';
    id: string | number;
    value: TValue;
};

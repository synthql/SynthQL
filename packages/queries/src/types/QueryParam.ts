export type QueryParam<T = unknown> = {
    type: 'synthql::param';
    id: string;
    value: T;
};

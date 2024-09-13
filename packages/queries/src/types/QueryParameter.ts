export type QueryParameter<TValue = unknown> = {
    type: 'synthql::parameter';
    id: string | number;
    value: TValue;
};

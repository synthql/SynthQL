export type QueryParameter<TValue = unknown> = {
    type: 'synthql::parameter';
    id: string;
    value: TValue | undefined;
};

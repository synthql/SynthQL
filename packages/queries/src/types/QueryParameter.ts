export const SynthqlParameter = 'synthql::parameter';

export type QueryParameter<TValue = unknown> = {
    type: typeof SynthqlParameter;
    value: TValue | undefined;
    id: string;
};

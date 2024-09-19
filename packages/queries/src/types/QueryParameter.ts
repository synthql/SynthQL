export const SynthqlParameter = 'synthql::parameter';

export type QueryParameter<TValue = unknown> = {
    type: typeof SynthqlParameter;
    id: string;
    value: TValue | undefined;
};

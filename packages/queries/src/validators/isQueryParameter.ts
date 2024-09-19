import { QueryParameter, SynthqlParameter } from '../types/QueryParameter';

export function isQueryParameter(x: any): x is QueryParameter {
    return x !== null && x !== undefined && x?.type === SynthqlParameter;
}

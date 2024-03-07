/**
 * A simple tree node used for testing.
 */
export type NumNode = {
    value: number;
    children: NumNode[];
}

export type StrNode = {
    value: string;
    children: StrNode[];
}

/**
 * Tiny DSL for creating NumNodes.
 */
export function n(value: number, ...children: NumNode[]): NumNode {
    return { value, children }
}

export function s(value: string, ...children: StrNode[]): StrNode {
    return { value, children }
}
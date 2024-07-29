import { BinaryOperator } from '../types/BinaryOp';
import { FilterByValue } from '../types/FilterByValue';

export type BooleanExpressions<Scope> =
    | { type: 'const'; value: boolean; $returnType?: boolean }
    | {
          type: 'op';
          op: BinaryOperator;
          args: Exp<Scope>[];
          $returnType?: boolean;
      }
    | { type: 'op'; op: 'not'; arg: Exp<Scope>; $returnType?: boolean }
    | FilterByValue<Scope, boolean>;

export type NumberExpressions<Scope> =
    | number
    | { type: 'const'; value: number; $returnType?: number }
    | { type: 'op'; op: '+'; args: Exp<Scope>[]; $returnType?: number }
    | { type: 'fn'; fn: 'count'; args: Exp<Scope>[]; $returnType?: number }
    | FilterByValue<Scope, number>;

export type StringExpressions<Scope> =
    | FilterByValue<Scope, string>
    | { type: 'const'; value: string; $returnType?: string };

export type Exp<Scope = {}, ReturnType = unknown> =
    // Case: boolean
    ReturnType extends boolean
        ? BooleanExpressions<Scope>
        : // Case: number
          ReturnType extends number
          ? NumberExpressions<Scope>
          : ReturnType extends string
            ? StringExpressions<Scope>
            : // Case: no match
              | BooleanExpressions<Scope>
                  | NumberExpressions<Scope>
                  | StringExpressions<Scope>;

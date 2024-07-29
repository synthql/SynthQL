export type Simplify<T> =
    T extends Array<infer U>
        ? Simplify<U>[]
        : T extends Date
          ? T
          : T extends object
            ? {
                  [K in keyof T]: Simplify<T[K]>;
              }
            : T;

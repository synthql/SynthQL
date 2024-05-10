export type TableTypes<Table> = {
    [TTable in keyof Table]: Table[TTable] extends object
        ? Table[TTable] extends {
              type: infer C;
          }
            ? C
            : never
        : never;
};

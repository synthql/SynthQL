# Planning

The first phase of query execution. A query is given as input and a `ExecPlanTree` is given as output.

There are two important tasks during planning:

1. Assigning executors.
2. Autoselecting referenced columns.

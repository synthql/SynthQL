export interface QueryPlan {
    "Execution Time"?: number,
    "Planning Time"?: number,
    "Settings": {},
    "Triggers": [],
    "Planning": Planning,
    "Plan": PlanNode
}

interface Planning {
    "Local Dirtied Blocks": number;
    "Local Hit Blocks": number;
    "Local Read Blocks": number;
    "Local Written Blocks": number;
    "Shared Dirtied Blocks": number;
    "Shared Hit Blocks": number;
    "Shared Read Blocks": number;
    "Shared Written Blocks": number;
    "Temp Read Blocks": number;
    "Temp Written Blocks": number;
}

type PlanNode = PlanLimit | PlanAggregate | PlanNestedLoop | PlanSeqScan | PlanIndexScan

interface BasePlan {
    "Actual Loops": number
    "Actual Rows": number
    "Actual Startup Time"?: number
    "Actual Total Time"?: number
    "Local Dirtied Blocks": number
    "Local Hit Blocks": number
    "Local Read Blocks": number
    "Alias"?: string
    "Local Written Blocks": number
    "Output": string[]
    "Parallel Aware": boolean,
    "Plan Rows": number
    "Plan Width": number
    Plans?: PlanNode[]

    "Shared Dirtied Blocks": number
    "Shared Hit Blocks": number
    "Shared Read Blocks": number
    "Shared Written Blocks": number
    "Startup Cost": number
    "Total Cost": number
    "Temp Read Blocks": number
    "Temp Written Blocks": number
}

interface PlanLimit extends BasePlan {
    "Node Type": "Limit"
}

interface PlanAggregate extends BasePlan {
    "Node Type": "Aggregate"
    "Group Key": string[]
    "Parent Relationship": "Outer" | "Inner"
    "Partial Mode": "Simple" | "Hashed" | "Mixed"
    "Strategy": "Plain" | "Sorted"


}

interface PlanNestedLoop extends BasePlan {
    "Node Type": "Nested Loop"
    "Inner Unique": boolean
    "Join Type": "Left" | "Inner"
    "Parent Relationship": "Outer" | "Inner"
    "Shared Dirtied Blocks": number
    "Shared Hit Blocks": number
    "Shared Read Blocks": number
    "Shared Written Blocks": number
    "Startup Cost": number
    "Total Cost": number
    "Temp Read Blocks": number
    "Temp Written Blocks": number
}

interface PlanSeqScan extends BasePlan {
    "Node Type": "Seq Scan"
    "Relation Name": string
}

interface PlanIndexScan extends BasePlan {
    "Node Type": "Index Scan"
    "Index Name": string
    "Scan Direction": "Forward" | "Backward"
    "Relation Name": string
    "Schema": string
    "Index Cond"?: string
    "Parent Relationship": "Outer" | "Inner"
    "Rows Removed by Index Recheck"?: number
}
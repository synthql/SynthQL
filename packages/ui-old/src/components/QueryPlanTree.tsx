import { Box, Collapse, Typography, colors } from '@mui/material';
import { createQueryTree } from '../model/createQueryTree';
import { AnyQuery, QueryNode } from '../types';
import { Flex } from './Flex';
import { Grid } from './Grid';
import { grey } from '@mui/material/colors';
import { countQueries } from '../model/countQueries';
import React from 'react';
import { QueryPlan } from 'xql';

export function QueryPlanTree({
    title,
    query,
}: {
    query: QueryPlan;
    title?: string;
}) {
    return (
        <Flex flexDirection={'column'} gap={1} padding={1}>
            <Typography variant="h5">{title}</Typography>
            <QueryTreeNode node={query.Plan} depth={0} />
        </Flex>
    );
}

function QueryTreeNode({
    node,
    depth,
}: {
    node: QueryPlan['Plan'];
    depth: number;
}) {
    const [isExpanded, setExpanded] = React.useState(false);
    const nodeType = node['Node Type'];
    return (
        <>
            <Box
                onClick={() => setExpanded(!isExpanded)}
                sx={{
                    cursor: 'pointer',
                    marginLeft: depth * 4,
                    border: `1px solid ${grey[300]}`,
                    borderRadius: 2,
                    width: 'fit-content',
                    paddingY: 0.5,
                    paddingX: 1,
                }}
            >
                <span style={{ color: colors.indigo[800] }}>{nodeType}</span>
                <Collapse collapsedSize={0} in={isExpanded}>
                    <Grid gridTemplateColumns={'auto 1fr'} gap={1}>
                        <span style={{ color: colors.grey[600] }}>select:</span>
                        <span>{Object.keys(select).join(', ')}</span>
                    </Grid>
                </Collapse>
            </Box>
            {node.Plans?.map((child, i) => {
                return (
                    <QueryTreeNode
                        key={`${depth}.${i}`}
                        node={child}
                        depth={depth + 1}
                    />
                );
            })}
        </>
    );
}

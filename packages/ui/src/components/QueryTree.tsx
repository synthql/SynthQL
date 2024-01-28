import { Box, Collapse, Typography, colors } from '@mui/material';
import { createQueryTree } from '../model/createQueryTree';
import { AnyQuery, QueryNode } from '../types';
import { Flex } from './Flex';
import { Grid } from './Grid';
import { grey } from '@mui/material/colors';
import { countQueries } from '../model/countQueries';
import React from 'react';

export function QueryTree({
    title,
    query,
}: {
    query: AnyQuery;
    title?: string;
}) {
    const node = createQueryTree(query);
    const count = countQueries(node);
    return (
        <Flex flexDirection={'column'} gap={1} padding={1}>
            <Typography variant="h5">{title}</Typography>
            Queries: {count}
            <QueryTreeNode node={node} />
        </Flex>
    );
}

function QueryTreeNode({ node }: { node: QueryNode }) {
    const [isExpanded, setExpanded] = React.useState(false);
    const { from, select } = node.query;
    return (
        <>
            <Box
                onClick={() => setExpanded(!isExpanded)}
                sx={{
                    cursor: 'pointer',
                    marginLeft: node.depth * 4,
                    border: `1px solid ${grey[300]}`,
                    borderRadius: 2,
                    width: 'fit-content',
                    paddingY: 0.5,
                    paddingX: 1,
                }}
            >
                <span style={{ color: colors.indigo[800] }}>{from}</span>
                <Collapse collapsedSize={0} in={isExpanded}>
                    <Grid gridTemplateColumns={'auto 1fr'} gap={1}>
                        <span style={{ color: colors.grey[600] }}>select:</span>
                        <span>{Object.keys(select).join(', ')}</span>
                    </Grid>
                </Collapse>
            </Box>
            {node.children.map((child) => {
                return <QueryTreeNode key={child.id} node={child} />;
            })}
        </>
    );
}

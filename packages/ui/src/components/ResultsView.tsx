'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { PanelContainer } from './Panel';
import { useQueryResults } from '@/hooks/useQueryResults';
import { useGlobalShortcut } from '@/hooks/useGlobalShortcut';
import { format } from 'sql-formatter';

export function ResultsView() {
    useGlobalShortcut('1', () => {
        setTab(0);
    });
    useGlobalShortcut('2', () => {
        setTab(1);
    });
    useGlobalShortcut('3', () => {
        setTab(2);
    });
    const { data: queryResults } = useQueryResults();

    const [tab, setTab] = useState<0 | 1 | 2>(0);
    return (
        <PanelContainer>
            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
                <Tab id={'results'} label="Results" />
                <Tab id={'query'} label="Query" />
                <Tab id={'sql'} label="SQL" />
            </Tabs>

            <Box padding={1} height={'100%'} overflow={'auto'}>
                {tab === 0 && <JsonView data={queryResults.results} />}
                {tab === 1 && <JsonView data={queryResults.query} />}
                {tab === 2 && (
                    <pre>
                        {format(queryResults.sql, { language: 'postgresql' })}
                    </pre>
                )}
            </Box>
        </PanelContainer>
    );
}

function JsonView({ data }: { data: any }) {
    const wrapped = wrapInObject(data);
    return (
        <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            src={wrapped}
        />
    );
}

function wrapInObject(obj: any) {
    if (typeof obj === 'string') {
        return { message: obj };
    }
    if (typeof obj === 'object') {
        return obj;
    }
    return { value: obj };
}

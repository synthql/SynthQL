'use client';

import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import { HorizontalSplit, VerticalSplit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ButtonExecuteQuery } from "./ButtonExecuteQuery";
import { InputDatabaseUrl } from "./InputDatabaseUrl";

export function Toolbar() {
    return <Box padding={1} display={"flex"} gap={1}>
        <InputDatabaseUrl />
        <ButtonSwitchLayout />
        <ButtonExecuteQuery />
    </Box>
}

function ButtonSwitchLayout() {
    const { data: layout, setData: setLayout } = useLayoutDirection();
    return <Tooltip title="Switch layout">
        <IconButton onClick={() => {
            if (layout === 'vertical') {
                setLayout('horizontal')
            } else {
                setLayout('vertical')
            }

        }} >
            {layout === 'vertical' ? <VerticalSplit /> : <HorizontalSplit />}
        </IconButton>
    </Tooltip>
}


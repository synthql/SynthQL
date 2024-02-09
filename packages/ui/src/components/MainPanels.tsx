'use client';

import { Box, useTheme } from "@mui/material";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Toolbar } from "./Toolbar";
import { Editor } from "./Editor/Editor";
import { ResultsView } from "./ResultsView";
import { useLayoutDirection } from "@/hooks/useLayoutDirection";
import { useConnection } from "@/hooks/useConnection";
import { ConnectionView } from "./ConnectionView";
import { useIsConnected } from "@/hooks/useIsConnected";

export function MainPanels() {
    const divider = useTheme().palette.divider
    const { data: direction } = useLayoutDirection()

    const { data: conn } = useIsConnected()

    if (!conn.isConnected) {
        return <ConnectionView />
    }

    return <Box flexDirection={"column"} height={"100vh"} overflow={'hidden'}>
        <Toolbar />
        <PanelGroup autoSaveId={"main-panels"} direction={direction} >
            <Panel defaultSize={50}>
                <Editor />
            </Panel>
            <PanelResizeHandle />
            <Panel style={{
                borderLeft: `1px solid ${divider}`
            }}
                defaultSize={50}>
                <ResultsView />
            </Panel>
        </PanelGroup>
    </Box>
}